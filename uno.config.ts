import { defineConfig, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: {
          name: 'Inter',
          weights: ['100', '200', '300', '400', '500', '600', '700', '800'],
          italic: true,
        },
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
  rules: [
    [
      'bg-gradient-light',
      {
        background:
          'linear-gradient(101deg, rgba(231, 70, 148, 0.20) 19.44%, rgba(255, 205, 131, 0.20) 100.17%)',
      },
    ],
    [
      'bg-gradient-lighter',
      {
        background:
          'linear-gradient(101deg, rgba(231, 70, 148, 0.10) 19.44%, rgba(255, 205, 131, 0.10) 100.17%), var(--white, #FFF)',
      },
    ],
  ],
})
