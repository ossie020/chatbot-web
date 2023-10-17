import { Input, Button, Modal, Space, Form } from 'antd'
import { useState } from 'react'
import { HiUserCircle, HiSearch, HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi'

import Google from '@/assets/svg/google.svg'
import Discord from '@/assets/svg/discord.svg'
import Apple from '@/assets/svg/apple.svg'

export function AppHeader() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky left-0 top-0 z-20 h-20 w-full border-b border-gray-200 bg-white">
      <div className="h-full flex items-center justify-between p-4">
        <div>logo</div>
        <div className="flex">
          <div className="h-45px w-360px">
            <Input
              prefix={<HiSearch className="h-20px w-20px" />}
              className="h-full rounded-full"
            />
          </div>
          <Button
            shape="circle"
            className="ml-3 h-12 w-12 border border-pink-500 from-pink-300 to-yellow-100 bg-gradient-to-r font-bold text-pink-500"
          >
            Pro
          </Button>
          <Button
            icon={<HiUserCircle className="h-6 w-6" />}
            shape="round"
            className="ml-3 h-12 w-30 flex items-center justify-center border border-pink-500 font-bold text-pink-500 hover:bg-pink-100"
            onClick={() => setOpen(true)}
          >
            Login
          </Button>
        </div>
      </div>

      <Modal width={420} footer={null} open={open} onCancel={() => setOpen(false)}>
        <div className="mx-auto w-324px flex flex-col justify-center">
          <div className="mb-6 text-center">logo</div>

          <Space direction="vertical" size={8}>
            <Button className="h-12 w-full flex items-center justify-center">
              <img src={Google} />
              <p className="ml-2 font-medium">Continue with Google</p>
            </Button>
            <Button className="h-12 w-full flex items-center justify-center">
              <img src={Discord} />
              <p className="ml-2 font-medium">Continue with Discord</p>
            </Button>
            <Button className="h-12 w-full flex items-center justify-center">
              <img src={Apple} />
              <p className="ml-2 font-medium">Continue with Apple</p>
            </Button>

            <div className="h-12 w-full flex flex-col items-center justify-center">
              <div className="relative top-13px h-1px w-full bg-black/20"></div>
              <div className="z-20 w-12 bg-white text-center text-black/40">OR</div>
            </div>

            <Form>
              <Form.Item>
                <Input prefix={<HiOutlineMail />} placeholder="email address" className="h-13" />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={<HiOutlineLockClosed />}
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
          </Space>
        </div>
      </Modal>
    </nav>
  )
}
