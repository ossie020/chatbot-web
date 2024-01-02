import { Button, Modal, message } from 'antd'
import { createRef, useRef, useState } from 'react'
import Cropper, { ReactCropperElement } from 'react-cropper'
import { FaFileImage } from 'react-icons/fa'

import { upload } from '@/api/user'
import { dataURLtoBlob } from '@/utils'
import { CharCard, importCharacter } from '@/utils/char-card'

export type Props = {
  setAvatar: (value: string) => void
  setBotName: (value: string) => void
  setBotIntro: (value: string) => void
}

export function CardImport({ setAvatar, setBotName, setBotIntro }: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null)
  const fileNameRef = useRef('')
  const cropperRef = createRef<ReactCropperElement>()

  const [image, setImage] = useState('')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleFileChange(event: any) {
    const [file] = event.target.files
    fileNameRef.current = file.name

    const ext = file.name.match(/\.(\w+)$/)
    if (
      !ext ||
      !['json', 'png', 'yaml', 'yml'].includes(ext[1].toLowerCase())
    ) {
      message.error('Please import your JSON file / PNG file / character card.')
      return
    }

    const format = ext[1].toLowerCase()

    handleCharCard(file, format)

    if (file.type.includes('image')) {
      handleImageFileChange(event)
    }
  }

  const handleImageFileChange = (event: any) => {
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

  const handleCharCard = async (filedata: File, format: string) => {
    const charCard: CharCard | undefined = await importCharacter(
      filedata,
      format,
    )
    if (!charCard) {
      message.error('Failed to read character file')
      return
    }

    setBotName(charCard.name)
    setBotIntro(charCard.intro)
  }

  const getCropData = async () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      const dataURL = cropperRef.current.cropper.getCroppedCanvas().toDataURL()
      const file = dataURLtoBlob(dataURL, fileNameRef.current)

      setLoading(true)
      try {
        const { url } = await upload(file)
        setAvatar(url)
        setOpen(false)
      } finally {
        setLoading(false)
      }
    }
  }

  function renderImportButton() {
    return (
      <Button
        onClick={() => fileRef.current?.click()}
        className="h-34px flex-center text-12px mt-2 text-pink-500"
      >
        <FaFileImage className="mr-2 h-4 w-4" /> Import file
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
      {renderImportButton()}

      <Modal open={open} footer={null} onCancel={() => setOpen(false)}>
        <div className="flex grid flex-col items-center gap-6">
          <div className="text-20px font-500">Crop your image</div>
          <Cropper
            ref={cropperRef}
            zoomTo={0.5}
            initialAspectRatio={0.75}
            aspectRatio={0.75}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={16}
            minCropBoxWidth={12}
            background={false}
            responsive={true}
            autoCropArea={1.2}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            guides={true}
            style={{ height: '400px' }}
          />
          <Button
            loading={loading}
            onClick={getCropData}
            className="h-48px text-16px font-500 w-full"
          >
            Import file
          </Button>
        </div>
      </Modal>
    </>
  )
}
