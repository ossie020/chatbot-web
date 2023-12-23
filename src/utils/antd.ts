import { theme as defaultTheme } from 'antd'
import type { ThemeConfig } from 'antd'

export const theme: ThemeConfig = {
  token: {
    colorPrimary: '#ec4899',
    colorBgContainer: '#f9fafb',
    fontFamily: 'Inter',
  },
}

export const darkTheme: ThemeConfig = {
  algorithm: defaultTheme.darkAlgorithm,
  token: {
    ...theme.token,
    colorBgContainer: '#374151',
  },
  components: {
    Modal: {
      contentBg: '#1F2A37',
    },
  },
}
