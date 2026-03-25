/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: { primary: '#0F0E17', card: '#1A1A2E', hover: '#16213E', input: '#12111C' },
        accent: { DEFAULT: '#6B21A8', mid: '#7C3AED', light: '#A78BFA' },
        brand: { success: '#10B981', warning: '#F59E0B', danger: '#EF4444', 'danger-dark': '#991B1B' },
      },
      fontFamily: { sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'] },
      fontSize: { 'hero': ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '900' }] },
      borderRadius: { card: '16px', inner: '12px' },
      boxShadow: { purple: '0 0 20px #A78BFA33', danger: '0 0 20px #EF444433', focus: '0 0 0 3px #7C3AED33' },
      animation: { shimmer: 'shimmer 1.5s ease-in-out infinite', gentlePulse: 'gentlePulse 2s ease-in-out infinite', spin: 'spin 700ms linear infinite', reactBounce: 'reactBounce 300ms ease' },
      keyframes: {
        shimmer: { '0%, 100%': { opacity: '0.4' }, '50%': { opacity: '0.8' } },
        gentlePulse: { '0%, 100%': { boxShadow: '0 0 8px #A78BFA33' }, '50%': { boxShadow: '0 0 16px #A78BFA66' } },
        reactBounce: { '0%, 100%': { transform: 'scale(1)' }, '40%': { transform: 'scale(1.3)' }, '70%': { transform: 'scale(0.9)' } },
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
      },
      maxWidth: { content: '1200px', card: '720px', result: '800px' },
    },
  },
  plugins: [],
};
