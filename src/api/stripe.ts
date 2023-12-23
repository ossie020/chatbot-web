import { get } from '@/utils/request'

export async function getCheckoutUrl(plan: number) {
  return get<{ url: string }>('/stripe/get_checkout_url/', { plan })
}

export async function getManagementUrl() {
  return get<{ url: string }>('/stripe/management/')
}
