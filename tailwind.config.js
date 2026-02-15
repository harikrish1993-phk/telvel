/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── Primary: Deep navy (from logo text) ──────
        navy: {
          50:  '#f0f5fa',
          100: '#dae6f1',
          200: '#b8cfe3',
          300: '#8db3d1',
          400: '#6896ba',
          500: '#4a7ca3',
          600: '#376389',
          700: '#2c4f6e',
          800: '#1e3a54',
          900: '#122a3f',
          950: '#0a1a2a',
        },
        // ── Accent: Steel blue (extracted from logo waves) ─
        accent: {
          DEFAULT: '#1C619C',
          light:   '#3B82B8',
          dark:    '#154D7E',
          50:      '#EFF6FF',
          100:     '#DBEAFE',
          500:     '#1C619C',
          600:     '#154D7E',
          700:     '#0F3D66',
        },
        // ── Success green for status ─────────────────
        success: { DEFAULT: '#16a34a', light: '#dcfce7' },
      },
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        body:    ['Source Sans 3', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
