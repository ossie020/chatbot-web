import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno()],
  theme: {
    breakpoints: {
      sm: '350px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
  },
})
