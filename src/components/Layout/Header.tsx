import { HeaderTool } from '@/components/HeaderTool'
import { Logo } from '@/components/Logo'

export function Header() {
  return (
    <div className="h-full flex-between border border-b-gray-200 bg-white px-4 py-3">
      <Logo />
      <HeaderTool />
    </div>
  )
}
