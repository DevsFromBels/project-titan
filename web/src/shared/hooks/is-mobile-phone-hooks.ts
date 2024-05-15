import { useState, useEffect } from 'react';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const deviceMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /iBlackberry/i,
      /Windows Phone/i,
      /Mobile/i,
    ];

    const handleResize = () => {
      setIsMobile(deviceMatch.some((regExp) => navigator.userAgent.match(regExp)));
      setIsLoading(false);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isMobile, isLoading };
};

export default useIsMobile;