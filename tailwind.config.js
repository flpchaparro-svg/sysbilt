/** @type {import('tailwindcss').Config} */
export default {
  // Scan only app UI sources — exclude Sanity studio, API routes, and tooling (smaller CSS, fewer false safelists)
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./constants/**/*.{js,ts,jsx,tsx}",
    "!./studio/**",
    "!./api/**",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter', 
          'ui-sans-serif', 
          'system-ui', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'sans-serif'
        ],
        serif: [
          'Lora', 
          'ui-serif', 
          'Georgia', 
          'Cambria', 
          'Times New Roman', 
          'Times', 
          'serif'
        ],
        mono: [
          'ui-monospace', 
          'SFMono-Regular', 
          'Menlo', 
          'Monaco', 
          'Consolas', 
          'Liberation Mono', 
          'Courier New', 
          'monospace'
        ]
      },
      colors: {
        cream: '#FFF2EC',
        'cream-light': '#FFF8F5',
        'cream-warm': '#FFF9F0',
        dark: '#1a1a1a',
        'off-white': '#FAFAFA',
        white: '#FFFFFF',
        red: '#9A1730',
        'red-solid': '#E21E3F',
        'red-text': '#9A1730', // Accessible red for text on cream (4.5:1 contrast)
        'red-on-dark': '#FF6B6B',
        gold: '#C5A059',
        'gold-on-cream': '#8B6914',
        'gold-on-dark': '#D4A84B',
        'gold-muted': '#7A5D12',
        teal: '#0F766E',
      },
      transitionDuration: {
        snap: '200ms',
        flow: '600ms',
        reveal: '1000ms',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}