import { type Config } from 'tailwindcss';

const config = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#e84945',
          accent: '#ffd740',
          ink: '#0f0f0f',
          muted: '#464646',
          surface: '#f6f6f6',
          border: '#ebebeb',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Roboto', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      letterSpacing: {
        extra: '0.32em',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      boxShadow: {
        soft: '0 24px 60px rgba(10, 12, 16, 0.12)',
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
