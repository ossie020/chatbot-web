import { Button, Modal, message } from 'antd'
import { createRef, useRef, useState } from 'react'
import Cropper, { ReactCropperElement } from 'react-cropper'
import { FaUpload } from 'react-icons/fa'

import { upload } from '@/api/user'
import { dataURLtoBlob } from '@/utils'

export type Props = {
  avatar: string
  setAvatar: (value: string) => void
  width?: string
  height?: string
}

export function AvatarUpload({
  avatar,
  setAvatar,
  width = '120px',
  height = '160px',
}: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null)
  const fileNameRef = useRef('')
  const cropperRef = createRef<ReactCropperElement>()

  const [image, setImage] = useState('')
  const [cropperImage, setCropperImage] = useState(avatar)
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleFileChange(event: any) {
    const [file] = event.target.files
    fileNameRef.current = file.name

    if (!file.type.includes('image')) {
      message.error('Please upload image file')
      return
    }

    if (file.size > 1024 * 1024 * 3) {
      message.error('File size can not exceed 3MB')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result as any)
      setOpen(true)
      file.value = ''
    }
    reader.readAsDataURL(file)

    // 清空文件
    event.target.value = ''
  }

  const getCropData = async () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      const dataURL = cropperRef.current.cropper.getCroppedCanvas().toDataURL()
      const file = dataURLtoBlob(dataURL, fileNameRef.current)

      setLoading(true)
      try {
        const { url } = await upload(file)
        setCropperImage(dataURL)
        setAvatar(url)
        setOpen(false)
      } finally {
        setLoading(false)
      }
    }
  }

  function renderUploadButton() {
    return (
      <Button
        onClick={() => fileRef.current?.click()}
        className="h-34px flex-center text-12px mt-2 text-pink-500"
      >
        <FaUpload className="mr-2 h-4 w-4" /> Upload
      </Button>
    )
  }

  return (
    <>
      <input
        ref={fileRef}
        type="file"
        onChange={handleFileChange}
        className="hidden!"
      />
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ width, height }}
        className="border-1 flex-center relative border-dashed border-gray-300 bg-gray-50 dark:bg-gray-800"
      >
        {avatar ? (
          <>
            <img
              src={cropperImage}
              className="absolute bottom-0 left-0 right-0 top-0 h-full"
            />
            {hover && (
              <>
                <div className="absolute bottom-0 left-0 right-0 top-0 h-full bg-black/60"></div>
                {renderUploadButton()}
              </>
            )}
          </>
        ) : (
          renderUploadButton()
        )}
      </div>

      <Modal open={open} footer={null} onCancel={() => setOpen(false)}>
        <div className="flex grid flex-col items-center gap-6">
          <div className="text-20px font-500">Crop your image</div>
          <Cropper
            ref={cropperRef}
            zoomTo={0.5}
            initialAspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            guides={true}
            style={{ height: '400px' }}
          />
          <Button
            loading={loading}
            onClick={getCropData}
            className="h-48px text-16px font-500 w-full"
          >
            Upload
          </Button>
        </div>
      </Modal>
    </>
  )
}
