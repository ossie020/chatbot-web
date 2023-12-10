import { Button } from 'antd'

export function SiteInfo() {
  return (
    <div className="mt-48px">
      <div className="text-12px flex items-center gap-x-2 text-gray-500">
        <Button type="link" className="text-12px px-0 text-gray-500">
          Contact Us
        </Button>
        <div>|</div>
        <Button type="link" className="text-12px px-0 text-gray-500">
          Privacy Policy
        </Button>
        <div>|</div>
        <Button type="link" className="text-12px px-0 text-gray-500">
          Terms of Use
        </Button>
      </div>
      <div className="text-10px text-gray-500">
        <Button type="link" className="text-10px px-0 text-gray-400 dark:text-gray-600">
          © 2023 airpg
        </Button>
      </div>
    </div>
  )
}
