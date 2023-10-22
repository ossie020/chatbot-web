import { defineConfig, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Inter',
      },
    }),
  ],
  theme: {
    breakpoints: {
      sm: '390px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
  },
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
  },
})
