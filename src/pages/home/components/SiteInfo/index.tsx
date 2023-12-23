import { Button } from 'antd'

export function SiteInfo() {
  return (
    <div className="mt-48px">
      <div className="text-12px flex items-center gap-x-2 text-gray-500">
        <Button type="link" className="text-12px px-0 text-gray-500">
          Contact Us
        </Button>
        <div>|</div>
        <Button
          type="link"
          href="https://crystal-quasar-9e8.notion.site/JuicyAI-Privacy-620db643eaf247d9882084e30c493d45"
          target="_blank"
          className="text-12px flex items-center px-0 text-gray-500"
        >
          Privacy Policy
        </Button>
        <div>|</div>
        <Button
          type="link"
          href="https://crystal-quasar-9e8.notion.site/JuicyAI-Terms-of-Service-c421898a2eb6474bbf8c95bc327d6661"
          target="_blank"
          className="text-12px flex items-center px-0 text-gray-500"
        >
          Terms of Service
        </Button>
      </div>
      <div className="text-10px text-gray-500">
        <Button
          type="link"
          className="text-10px px-0 text-gray-400 dark:text-gray-600"
        >
          © 2023 Juicy AI
        </Button>
      </div>
    </div>
  )
}
