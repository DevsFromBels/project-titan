'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import Cookies from 'js-cookie'

export default function Page() {
  const [file, setFile] = useState<File | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [showCropper, setShowCropper] = useState(false)

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles: File[]) => {
      setFile(acceptedFiles[0])
      setShowCropper(true)
    },
  })

  const cropImage = () => {
    if (typeof cropper?.getCroppedCanvas() === 'undefined') {
      return
    }
    setCroppedImage(cropper.getCroppedCanvas().toDataURL())
    setShowCropper(false)
  }

  const [cropper, setCropper] = useState<Cropper>()

  const uploadImage = async () => {
    if (!croppedImage) return

    const formData = new FormData()
    const response = await fetch(croppedImage)
    const blob = await response.blob()
    formData.append('photo', blob, 'avatar.jpg')

    try {
      const response = await fetch('https://avatars-api.titanproject.top/upload', {
        method: 'POST',
        body: formData,
        headers: new Headers({
          'accessToken': Cookies.get('access_token') || '',
          'refreshToken': Cookies.get('refresh_token') || ''
        })
      })

      if (response.ok) {
        console.log('Avatar uploaded successfully')
      } else {
        console.error('Failed to upload avatar')
      }
    } catch (error) {
      console.error('Error uploading avatar:', error)
    }
  }

  return (
    <div className='w-[95%] m-auto flex flex-col justify-center items-center'>
      {showCropper && (
        <div {...getRootProps()} className="dropzone">
          <Input {...getInputProps()} />
          {file ? (
            <Cropper
              src={URL.createObjectURL(file)}
              style={{ height: 400, width: '400px' }}
              initialAspectRatio={1}
              guides={true}
              viewMode={2}
              autoCropArea={0.8}
              dragMode="move"
              onInitialized={(instance) => {
                setCropper(instance)
              }}
            />
          ) : (
            <Button className='mb-2'>Drop an image here or click to select one</Button>
          )}
        </div>
      )}

      {croppedImage && (
        <div>
          <Image src={croppedImage} className='rounded' alt="Cropped Avatar" width={200} height={200} />
          <h2 className='my-2 text-center'>Ваш аватар</h2>
        </div>
      )}

      <div className='flex gap-3'>
        {showCropper ? (
          <Button onClick={cropImage} disabled={!file}>
            Кадрировать аватар
          </Button>
        ) : (
          <Button onClick={() => setShowCropper(true)}>
            Изменить аватар
          </Button>
        )}
        <Button onClick={uploadImage} disabled={!croppedImage}>
          Загрузить аватар
        </Button>
      </div>
    </div>
  )
}