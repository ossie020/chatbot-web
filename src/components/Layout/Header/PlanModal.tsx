import { Button, Modal } from 'antd'
import { HiCheckCircle } from 'react-icons/hi'

import { getCheckoutUrl, getManagementUrl } from '@/api/stripe'
import { useAppStore } from '@/stores/app'
import { Plan } from '@/utils/enums'

type Props = {
  open: boolean
  close: () => void
}

export function PlanModal({ open, close }: Props) {
  const { plan, planName, planRemainDays } = useAppStore()

  const remains = planRemainDays > 0 ? `Remains ${planRemainDays} days` : ''

  async function toStripeCheck(planId: number) {
    const { url } = await getCheckoutUrl(planId)
    window.location.href = url
  }

  async function toStripeManagement() {
    const { url } = await getManagementUrl()
    window.location.href = url
  }

  function SubscribingButton(onClick: () => void) {
    return (
      <Button
        ghost
        block
        type="primary"
        size="large"
        className="bg-white!"
        onClick={onClick}
      >
        Subscribing
      </Button>
    )
  }

  function UpgradeButton(onClick: () => void, disabled?: boolean) {
    return (
      <Button
        block
        type="primary"
        size="large"
        disabled={disabled}
        onClick={onClick}
      >
        Upgrade Now
      </Button>
    )
  }

  function renderStandardButton() {
    if (plan?.plan_id === Plan.PREMIUM) {
      return UpgradeButton(() => null, true)
    }

    if (plan?.plan_id === Plan.STANDARD) {
      return SubscribingButton(toStripeManagement)
    }

    return UpgradeButton(() => toStripeCheck(Plan.STANDARD))
  }

  function renderPremiumButton() {
    if (plan?.plan_id === Plan.PREMIUM) {
      return SubscribingButton(toStripeManagement)
    }

    if (plan?.plan_id === Plan.STANDARD) {
      return UpgradeButton(toStripeManagement)
    }

    return UpgradeButton(() => toStripeCheck(Plan.STANDARD))
  }

  return (
    <Modal open={open} footer={null} width={1050} onCancel={close}>
      <div className="mx-24px mt-12px mb-24px ">
        <div>
          {!!planRemainDays && (
            <Button type="primary" ghost onClick={toStripeManagement}>
              Manage Subscriptions
            </Button>
          )}
          <span className="font-700 text-12px mx-3">My Plan:</span>
          <span className="text-12px font-500 text-pink-500">
            {planName} Plan {remains}
          </span>
        </div>
        <div className="mt-3 flex gap-x-3">
          {/* Free */}
          <div className="w-310px rounded-xl bg-gray-100">
            <div className="h-40px text-24px font-italic font-700 flex w-full items-center px-6 text-gray-700">
              Free
            </div>
            <div className="h-360px border-2px w-full rounded-xl border-gray-300 bg-white p-6">
              <span className="text-32px font-italic font-400 border-b-2px border-gray-700 text-gray-700">
                0.00$
              </span>
              <div className="mt-4 grid gap-2">
                <div className="h-24px flex items-center">
                  <HiCheckCircle className="h-6 w-6 text-gray-700" />
                  <span className="ml-10px text-12px font-500 text-gray-900">
                    50 messages per day
                  </span>
                </div>
                <div className="h-24px flex items-center">
                  <HiCheckCircle className="h-6 w-6 text-gray-700" />
                  <span className="ml-10px text-12px font-500 text-gray-900">
                    Create custom characters
                  </span>
                </div>
                <div className="h-24px flex items-center">
                  <HiCheckCircle className="h-6 w-6 text-gray-700" />
                  <span className="ml-10px text-12px font-500 text-gray-900">
                    Explore community-shared characters
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Standard */}
          <div className="w-310px bg-gradient-light rounded-xl">
            <div className="h-40px text-24px font-italic font-700 flex w-full items-center px-6 text-pink-500">
              Standard
            </div>
            <div className="h-360px border-2px bg-gradient-lighter flex w-full flex-col justify-between rounded-xl border-pink-500 p-6">
              <div>
                <div className="flex-between">
                  <div>
                    <span className="text-32px font-italic font-700 border-b-2px border-pink-500 text-pink-500">
                      4.99$
                    </span>
                    <span className="text-16px font-italic ml-2 align-bottom text-gray-500 line-through">
                      9.99$
                    </span>
                  </div>
                  <div className="w-86px flex flex-col justify-center">
                    <div
                      style={{
                        background:
                          'linear-gradient(101deg, #E74694 19.44%, #FFCD83 100.17%)',
                      }}
                      className="rounded-8px flex-center text-20px font-700 font-italic text-white"
                    >
                      -50%
                    </div>
                    <div
                      style={{
                        background:
                          'linear-gradient(101deg, #E74694 19.44%, #FFCD83 100.17%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                      className="text-12px font-900 font-italic mt-1"
                    >
                      Ending soon...
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid gap-2">
                  <div className="h-24px flex items-center">
                    <HiCheckCircle className="h-6 w-6 text-pink-500" />
                    <span className="ml-10px text-12px font-500 text-gray-900">
                      250 messages per day
                    </span>
                  </div>
                  <div className="h-24px flex items-center">
                    <HiCheckCircle className="h-6 w-6 text-pink-500" />
                    <span className="ml-10px text-12px font-500 text-gray-900">
                      Create custom characters
                    </span>
                  </div>
                  <div className="h-24px flex items-center">
                    <HiCheckCircle className="h-6 w-6 text-pink-500" />
                    <span className="ml-10px text-12px font-500 text-gray-900">
                      Explore community-shared characters
                    </span>
                  </div>
                  <div className="h-24px flex items-center">
                    <HiCheckCircle className="h-6 w-6 text-pink-500" />
                    <span className="ml-10px text-12px font-500 text-gray-900">
                      <b>Faster</b> response time
                    </span>
                  </div>
                  <div className="h-24px flex items-center">
                    <HiCheckCircle className="h-6 w-6 text-pink-500" />
                    <span className="ml-10px text-12px font-500 text-gray-900">
                      Increased memory limit
                    </span>
                  </div>
                </div>
              </div>
              {renderStandardButton()}
            </div>
          </div>

          {/* Premium */}
          <div className="w-310px rounded-xl bg-gray-100">
            <div className="h-40px text-24px font-italic font-700 flex w-full items-center px-6 text-pink-500">
              Premium
            </div>
            <div className="h-360px border-2px flex w-full flex-col justify-between gap-4 rounded-xl border-gray-300 bg-white p-6">
              <div>
                <span className="text-32px font-italic font-700 border-b-2px border-pink-500 text-pink-500">
                  19.99$
                </span>
                <div className="mt-4 grid gap-2">
                  <div className="h-24px flex items-center">
                    <HiCheckCircle className="h-6 w-6 text-pink-500" />
                    <span className="ml-10px text-12px font-500 text-gray-900">
                      <b>Unlimited</b> number of chat messages
                    </span>
                  </div>
                  <div className="h-24px flex items-center">
                    <HiCheckCircle className="h-6 w-6 text-pink-500" />
                    <span className="ml-10px text-12px font-500 text-gray-900">
                      Create custom characters
                    </span>
                  </div>
                  <div className="h-24px flex items-center">
                    <HiCheckCircle className="h-6 w-6 text-pink-500" />
                    <span className="ml-10px text-12px font-500 text-gray-900">
                      Explore community-shared characters
                    </span>
                  </div>
                  <div className="h-24px flex items-center">
                    <HiCheckCircle className="h-6 w-6 text-pink-500" />
                    <span className="ml-10px text-12px font-500 text-gray-900">
                      <b>Faster</b> response time
                    </span>
                  </div>
                  <div className="h-24px flex items-center">
                    <HiCheckCircle className="h-6 w-6 text-pink-500" />
                    <span className="ml-10px text-12px font-500 text-gray-900">
                      Priority access to new features
                    </span>
                  </div>
                  <div className="h-24px flex items-center">
                    <HiCheckCircle className="h-6 w-6 text-pink-500" />
                    <span className="ml-10px text-12px font-500 text-gray-900">
                      Increased memory limit
                    </span>
                  </div>
                </div>
              </div>
              {renderPremiumButton()}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
