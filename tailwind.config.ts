import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B2447',
        secondary: '#19376D',
        accent: '#576CBC',
        background: '#F5F7F9',
        text: '#1B1B1B',
      },
      fontFamily: {
        sans: ['Pretendard Variable', 'sans-serif'],
        mono: ['var(--font-roboto-mono)'],
      },
      screens: {
        mobile: '640px',
        tablet: '768px',
        laptop: '1024px',
        desktop: '1280px',
      },
    },
  },
  plugins: [],
}

export default config 