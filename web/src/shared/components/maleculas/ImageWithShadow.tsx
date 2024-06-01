'use client'
import React, { useEffect, useRef, useState } from 'react';

interface ImageBackgroundDetectorProps {
  imageUrl: string;
}

const ImageBackgroundDetector: React.FC<ImageBackgroundDetectorProps> = ({ imageUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageWithGlow, setImageWithGlow] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = imageUrl;

    image.onload = () => {
      // Resize the canvas to match the image dimensions
      canvas.width = image.width;
      canvas.height = image.height;

      // Draw the image onto the canvas
      ctx.drawImage(image, 0, 0);

      // Get the pixel data of the top-left corner (position: 0,0)
      const pixelData = ctx.getImageData(0, 0, 1, 1).data;

      // Extract RGB values from the pixel data
      const [red, green, blue] = pixelData;

      // Convert RGB values to hex code
      const hexCode = rgbToHex(red, green, blue);

      // Determine the glowing effect color
      const isBackgroundWhite = hexCode === '#FFFFFF';
      const glowColor = isBackgroundWhite ? '#808080' : '#C0C0C0';

      // Apply the glowing effect
      applyGlowEffect(ctx, image.width, image.height, glowColor);

      // Convert the canvas to a data URL (image)
      setImageWithGlow(canvas.toDataURL('image/png'));
    };
  }, [imageUrl]);

  // Helper function to convert RGB values to hex code
  const rgbToHex = (r: number, g: number, b: number): string =>
    `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;

  // Helper function to apply the glowing effect
  const applyGlowEffect = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    glowColor: string
  ) => {
    const offset = 10; // Adjust this value to control the size of the glowing effect

    ctx.globalCompositeOperation = 'source-out';
    ctx.fillStyle = glowColor;
    ctx.fillRect(0, 0, width + offset * 2, height + offset * 2);

    ctx.globalCompositeOperation = 'source-in';
    ctx.fillStyle = 'white';
    ctx.fillRect(offset, offset, width, height);
  };

  if (!imageWithGlow) return null;

  return <img src={imageWithGlow} alt="Image with Glow Effect" />;
};

export default ImageBackgroundDetector;
