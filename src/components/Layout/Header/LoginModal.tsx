import { Button, Form, Input, Modal, Spin, message } from 'antd'
import { HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi'
import { useSearchParams } from 'react-router-dom'

import Google from '@/assets/svg/google.svg'
import { Logo } from '@/components/Logo'
import { useAppStore } from '@/stores/app'
import { REGS } from '@/utils/constants'
import { LoginModalState } from '@/utils/enums'

const { Item: FormItem, useForm } = Form

export function LoginModal() {
  const [searchParams] = useSearchParams()
  const callbackMessage = searchParams.get('message') || ''

  const {
    user,
    loginModalState,
    setLoginModalState,
    loading,
    signInWithGoogle,
    signInWithApple,
    signInWithEmail,
    resetPassword,
  } = useAppStore()
  const [form] = useForm()

  async function submit() {
    const { email, password } = await form.validateFields()
    signInWithEmail(email, password)
  }

  async function reset() {
    const email = await form.getFieldValue('email')
    if (!REGS.EMAIL.test(email)) {
      message.error('Invalid email address')
      return
    }

    resetPassword(email)
  }

  function renderLogin() {
    return (
      <Spin spinning={loading}>
        <div className="px-6 pb-4">
          <div className="flex-center py-3">
            <Logo />
          </div>

          <div className="gap-36px mt-48px grid">
            <Button
              className="flex-center h-12 w-full dark:border-gray-300 dark:bg-gray-800"
              onClick={() => signInWithGoogle()}
            >
              <img src={Google} />
              <p className="ml-2 font-medium">Continue with Google</p>
            </Button>
            {/* <Button
              className="flex-center h-12 w-full dark:border-gray-300 dark:bg-gray-800"
              onClick={() => signInWithApple()}
            >
              <FaApple className="h-6 w-6 dark:text-white" />
              <p className="ml-2 font-medium">Continue with Apple</p>
            </Button> */}
          </div>

          <div className="flex-center h-108px w-full flex-col">
            <div className="top-13px h-1px relative w-full bg-black/20 dark:bg-white/20"></div>
            <div className="z-1 w-12 bg-white text-center text-black/40 dark:bg-gray-800 dark:text-white/40">
              OR
            </div>
          </div>

          <Form form={form}>
            <FormItem
              name="email"
              rules={[
                { required: true, message: 'Please input email' },
                { pattern: REGS.EMAIL, message: 'Invalid email address' },
              ]}
            >
              <Input
                prefix={<HiOutlineMail className="text-gray-500" />}
                type="email"
                placeholder="email address"
                className="h-13"
              />
            </FormItem>
            <FormItem
              name="password"
              rules={[
                { required: true, message: 'Please input password' },
                { min: 6, message: 'Password should be at least 6 characters' },
              ]}
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
            <Button type="link" className="text-12px w-full" onClick={reset}>
              I forgot my password
            </Button>
          </Form>

          <div className="flex-center text-12px mt-6 w-full flex-col text-gray-400">
            <span>Use of this product is bound by our</span>
            <div className="flex items-center">
              <Button
                type="link"
                href="https://crystal-quasar-9e8.notion.site/JuicyAI-Terms-of-Service-c421898a2eb6474bbf8c95bc327d6661"
                target="_blank"
                className="h-unset text-12px font-600 flex items-center p-0 text-gray-400 underline"
              >
                Terms of Service
              </Button>
              <span className="mx-1">and</span>
              <Button
                type="link"
                href="https://crystal-quasar-9e8.notion.site/JuicyAI-Privacy-620db643eaf247d9882084e30c493d45"
                target="_blank"
                className="h-unset text-12px font-600 flex items-center p-0 text-gray-400 underline"
              >
                Privacy Policy
              </Button>
            </div>
          </div>
        </div>
      </Spin>
    )
  }

  function renderText(type: LoginModalState) {
    const title =
      type === LoginModalState.CHECKOUT ? callbackMessage : 'Check your email'
    const desc =
      type === LoginModalState.REGISTER
        ? 'A sign in link has been sent to your email address.'
        : type === LoginModalState.RESET
          ? 'A reset password link has been sent to your email address.'
          : ''
    const backState = LoginModalState.CHECKOUT
      ? LoginModalState.CLOSED
      : LoginModalState.LOGIN

    return (
      <div className="h-560px flex w-full flex-col items-center px-6 py-4 text-center">
        <div className="h-36px flex-center py-3">
          <Logo />
        </div>
        <div className="flex-center flex-1 flex-col">
          <div className="text-24px font-700">{title}</div>
          <div className="w-240px mt-12px text-16px">{desc}</div>
        </div>

        <Button
          type="primary"
          ghost
          className="h-13 w-full"
          onClick={() => setLoginModalState(backState)}
        >
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <Modal
      width={420}
      footer={null}
      open={!user.uid && loginModalState !== LoginModalState.CLOSED}
      onCancel={() => setLoginModalState(LoginModalState.CLOSED)}
    >
      {loginModalState === LoginModalState.LOGIN
        ? renderLogin()
        : renderText(loginModalState)}
    </Modal>
  )
}
