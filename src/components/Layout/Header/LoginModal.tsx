import { Button, Form, Input, Modal } from 'antd'
import { HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi'

import { Logo } from '@/components/Logo'
import Google from '@/assets/svg/google.svg'
import Discord from '@/assets/svg/discord.svg'
import Apple from '@/assets/svg/apple.svg'

import { useAppStore } from '@/stores/app'

function AuthButton({ icon, text }: { icon: string; text: string }) {
  return (
    <Button className="h-12 w-full flex-center">
      <img src={icon} />
      <p className="ml-2 font-medium">{text}</p>
    </Button>
  )
}

export function LoginModal() {
  const { loginModalOpen, setLoginModalOpen } = useAppStore()

  return (
    <Modal width={420} footer={null} open={loginModalOpen} onCancel={() => setLoginModalOpen(false)}>
      <div className="px-6 pb-4">
        <div className="py-3 text-center"><Logo /></div>

        <div className="grid mt-6 gap-2">
          <AuthButton icon={Google} text="Continue with Google" />
          <AuthButton icon={Discord} text="Continue with Discord" />
          <AuthButton icon={Apple} text="Continue with Apple" />
        </div>

        <div className="mt-6 h-12 w-full flex-center flex-col">
          <div className="relative top-13px h-1px w-full bg-black/20"></div>
          <div className="z-20 w-12 bg-white text-center text-black/40">OR</div>
        </div>

        <Form className="mt-6">
          <Form.Item>
            <Input
              prefix={<HiOutlineMail className="text-gray-500" />}
              placeholder="email address"
              className="h-13"
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<HiOutlineLockClosed className="text-gray-500" />}
              type="password"
              placeholder="password"
              className="h-13"
            />
          </Form.Item>
          <Button type="primary" className="h-13 w-full">
            Log in / Sign up
          </Button>
          <Button type="link" className="w-full text-12px">
            I forgot my password
          </Button>
        </Form>
      </div>
    </Modal>
  )
}
