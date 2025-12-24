/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0D4F4F',
          light: '#1A6B6B',
          dark: '#083838',
          5: 'rgba(13, 79, 79, 0.05)',
          10: 'rgba(13, 79, 79, 0.1)',
          20: 'rgba(13, 79, 79, 0.2)',
          30: 'rgba(13, 79, 79, 0.3)',
          50: 'rgba(13, 79, 79, 0.5)',
          80: 'rgba(13, 79, 79, 0.8)',
        },
        secondary: {
          DEFAULT: '#C9A962',
          light: '#D4BC7F',
          dark: '#B89A4A',
          10: 'rgba(201, 169, 98, 0.1)',
          20: 'rgba(201, 169, 98, 0.2)',
          30: 'rgba(201, 169, 98, 0.3)',
        },
        accent: {
          DEFAULT: '#FF6B6B',
          light: '#FF8A8A',
        },
        background: {
          DEFAULT: '#FAFAFA',
          alt: '#F5F5F7',
        },
        surface: '#FFFFFF',
        'text-primary': '#1A1A2E',
        'text-secondary': '#4A4A5A',
        'text-muted': '#8A8A9A',
        border: {
          DEFAULT: '#E5E5E7',
          light: '#F0F0F2',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        display: ['DM Serif Display', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'elevated': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}

