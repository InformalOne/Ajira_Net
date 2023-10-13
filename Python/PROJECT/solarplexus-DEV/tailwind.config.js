import colors from './colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,jsx,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['serif'],
        heading: [
          'var(--font-family-heading)',
          'Inter',
          'SF Pro Text',
          'system-ui',
        ],
        sans: ['var(--font-family-sans)'],
        monospace: [`SF Mono`, `ui-monospace`, `Monaco`, 'Monospace'],
      },
      backgroundSize: {
        'chevron': '13px',
        '70%': '70%',
      },
      backgroundPosition: {
        'chevron-p': 'calc(100% - 16px) 12px',
      },
      boxShadow: {
        card: '0px 6px 56px #90909029',
      },
      colors: {
        primary: {
          ...colors.tango,
          100: '#F8E6DA',
          DEFAULT: colors.tango['500'],
          contrast: '#fff',
        },
        info: {
          DEFAULT: '#0581FB',
          dark: '#3A6DCE',
        },
        success: {
          100: '#E9F8EE',
          600: '#85AA59',
          800: '#52694E',
        },
        grey: {
          10: '#F0F0F0',
          50: '#F8F8F8',
          100: '#EDEDED',
          150: '#E2E2E2',
          200: '#D3D3D3',
          300: '#CBCBCB',
          350: '#A0A0A0',
          400: '#AFAFAF',
          450: '#888888',
          500: '#707070',
          800: '#3F3F3F',
        },
        dark: colors.gray,
        ...colors
      },
    },
  },
};
