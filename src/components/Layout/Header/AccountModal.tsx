import { Button, Form, Input, Modal, message } from 'antd'
import { useEffect, useState } from 'react'
import { FaUpload } from 'react-icons/fa'
import { HiArrowLeft } from 'react-icons/hi'

import { updateUser } from '@/api/user'
import { AvatarUpload } from '@/components/AvatarUpload'
import { useAppStore } from '@/stores/app'

type Props = {
  open: boolean
  close: () => void
}

const { Item: FormItem, useForm } = Form
const { TextArea } = Input

export function AccountModal({ open, close }: Props) {
  const { user, setUser } = useAppStore()
  const [form] = useForm()

  const [avatar, setAvatar] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    form.setFieldsValue(user)

    if (user.avatar) {
      setAvatar(user.avatar)
    }
  }, [user])

  async function submit() {
    if (!avatar) {
      message.error('Please upload avatar')
      throw new Error()
    }

    const data = await form.validateFields()
    data.avatar = avatar

    setLoading(true)
    try {
      await updateUser(data)
      message.success('success')
      close()

      if (data.nickname !== user.nickname) {
        setUser({ ...user, nickname: data.nickname })
      }

      if (data.avatar !== user.avatar) {
        setUser({ ...user, avatar: data.avatar })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} footer={null} closable={false} width={560}>
      <div className="my-2">
        <Form form={form} layout="vertical">
          <FormItem
            label="Nick name"
            name="nickname"
            rules={[{ required: true, message: 'Please input nick name' }]}
          >
            <Input />
          </FormItem>

          <FormItem label="Your Avatar">
            <AvatarUpload
              avatar={avatar}
              setAvatar={setAvatar}
              height="120px"
            />
          </FormItem>

          <FormItem label="Bio">
            <TextArea rows={3} />
          </FormItem>

          <Button
            type="primary"
            block
            onClick={submit}
            loading={loading}
            className="flex-center h-10"
          >
            <FaUpload className="mr-2 h-5 w-5" />
            Save
          </Button>
          <Button block onClick={close} className="flex-center mt-3 h-10">
            <HiArrowLeft className="mr-2 h-5 w-5" />
            Back
          </Button>
        </Form>
      </div>
    </Modal>
  )
}
