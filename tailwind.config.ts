import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-prompt)', 'Prompt', 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', 'sans-serif'],
      },
      colors: {
        // สีหลักเดียวกับ lawslane.com (#003654 / #002f4b)
        brand: {
          DEFAULT: '#003654',
          dark: '#002f4b',
          50: '#eef6fb',
          100: '#d6e9f5',
          400: '#4a9fd1',
          500: '#1f7fb8',
        },
        gold: '#c9a227',
      },
    },
  },
  plugins: [typography],
} satisfies Config;
