import { Button, Form, Input, Modal, Spin } from 'antd'
import { FaApple } from 'react-icons/fa'
import { HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi'

import Google from '@/assets/svg/google.svg'
import { Logo } from '@/components/Logo'
import { useAppStore } from '@/stores/app'

const { Item: FormItem, useForm } = Form

export function LoginModal() {
  const { user, open, setOpen, loading, signInByGoogle, signInByPassword } = useAppStore()
  const [form] = useForm()

  async function submit() {
    const { email, password } = await form.validateFields()
    signInByPassword(email, password)
  }

  return (
    <Modal width={420} footer={null} open={!user.uid && open} onCancel={() => setOpen(false)}>
      <Spin spinning={loading}>
        <div className="px-6 pb-4">
          <div className="flex-center py-3">
            <Logo />
          </div>

          <div className="mt-6 grid gap-2">
            <Button
              className="flex-center h-12 w-full dark:border-gray-300 dark:bg-gray-800"
              onClick={() => signInByGoogle()}
            >
              <img src={Google} />
              <p className="ml-2 font-medium">Continue with Google</p>
            </Button>
            <Button className="flex-center h-12 w-full dark:border-gray-300 dark:bg-gray-800">
              <FaApple className="h-6 w-6 dark:text-white" />
              <p className="ml-2 font-medium">Continue with Apple</p>
            </Button>
          </div>

          <div className="flex-center mt-6 h-12 w-full flex-col">
            <div className="top-13px h-1px relative w-full bg-black/20 dark:bg-white/20"></div>
            <div className="z-1 w-12 bg-white text-center text-black/40 dark:bg-gray-800 dark:text-white/40">
              OR
            </div>
          </div>

          <Form form={form} className="mt-6">
            <FormItem name="email" rules={[{ required: true, message: 'Please input email' }]}>
              <Input
                prefix={<HiOutlineMail className="text-gray-500" />}
                type="email"
                placeholder="email address"
                className="h-13"
              />
            </FormItem>
            <FormItem
              name="password"
              rules={[{ required: true, message: 'Please input password' }]}
            >
              <Input
                prefix={<HiOutlineLockClosed className="text-gray-500" />}
                type="password"
                placeholder="password"
                className="h-13"
              />
            </FormItem>
            <Button type="primary" className="h-13 w-full" onClick={submit}>
              Log in / Sign up
            </Button>
            <Button type="link" className="text-12px w-full">
              I forgot my password
            </Button>
          </Form>
        </div>
      </Spin>
    </Modal>
  )
}
