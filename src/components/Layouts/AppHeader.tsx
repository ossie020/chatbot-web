import { Input, Button, Modal, Space, Form } from 'antd'
import { useState } from 'react'
import { HiUserCircle, HiSearch, HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi'

import Google from '@/assets/svg/google.svg'
import Discord from '@/assets/svg/discord.svg'
import Apple from '@/assets/svg/apple.svg'

export function AppHeader() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky w-full h-20 top-0 left-0 z-20 bg-white border-b border-gray-200">
      <div className="p-4 h-full flex items-center justify-between">
        <div>logo</div>
        <div className="flex">
          <div className="w-360px h-45px">
            <Input
              prefix={<HiSearch className="w-20px h-20px" />}
              className="h-full rounded-full"
            />
          </div>
          <Button
            shape="circle"
            className="w-12 h-12 ml-3 font-bold text-pink-500 bg-gradient-to-r from-pink-300 to-yellow-100 border border-pink-500"
          >
            Pro
          </Button>
          <Button
            icon={<HiUserCircle className="w-6 h-6" />}
            shape="round"
            className="ml-3 w-30 h-12 font-bold text-pink-500 flex items-center justify-center border border-pink-500 hover:bg-pink-100"
            onClick={() => setOpen(true)}
          >
            Login
          </Button>
        </div>
      </div>

      <Modal width={420} footer={null} open={open} onCancel={() => setOpen(false)}>
        <div className="w-324px mx-auto flex flex-col justify-center">
          <div className="text-center mb-6">logo</div>

          <Space direction="vertical" size={8}>
            <Button className="w-full h-12 flex items-center justify-center">
              <img src={Google} />
              <p className="ml-2 font-medium">Continue with Google</p>
            </Button>
            <Button className="w-full h-12 flex items-center justify-center">
              <img src={Discord} />
              <p className="ml-2 font-medium">Continue with Discord</p>
            </Button>
            <Button className="w-full h-12 flex items-center justify-center">
              <img src={Apple} />
              <p className="ml-2 font-medium">Continue with Apple</p>
            </Button>

            <div className="w-full h-12 flex flex-col items-center justify-center">
              <div className="relative top-13px w-full h-1px bg-black/20"></div>
              <div className="w-12 text-center text-black/40 bg-white z-20">OR</div>
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
              <Button type="primary" className="w-full h-13">
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
