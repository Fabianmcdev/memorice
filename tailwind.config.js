/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '2.5': '18px',
      },
      borderRadius: {
        '10px': '10px',
        '4xl': '2rem',
      },
      transitionDuration: {
        '300': '300ms',
      },
      transitionDelay: {
        '300': '300ms',
        '0': '0ms',
      },
      colors: {
        aliceblue: '#f0f8ff',
        surface: '#251d31',
        'surface-2': '#2f2540',
        track: '#3a2f4d',
        ink: '#f4f1f8',
        muted: '#b7aec6',
        accent: '#c23866',
        'accent-strong': '#a82e57',
        hit: '#7cc8ff',
        miss: '#ffa05c',
      },
      fontFamily: {
        display: ['Fredoka', 'sans-serif'],
      },
      transformOrigin: {
        'center': 'center center',
      },
    },
  },
  plugins: [
    function ({ addComponents, theme }) {
      addComponents({
        // Card size comes from the board grid (--card-size); both faces fill the card.
        '.card': {
          display: 'flex',
          'flex-direction': 'column',
          'justify-content': 'center',
          'align-items': 'center',
          listStyle: 'none',
          position: 'relative',
          width: '100%',
          height: '100%',
        },
        '.card__front-card': {
          transform: 'rotateY(90deg)',
          transition: `transform ${theme('transitionDuration.300')} ease-in`,
          position: 'absolute',
          inset: '0',
          'object-fit': 'cover',
          'border-radius': theme('borderRadius.10px'),
          border: '2px solid #fff',
          width: '100%',
          height: '100%',
        },
        '.card--flipped .card__front-card': {
          transform: 'rotateY(0deg)',
          'transition-delay': theme('transitionDelay.300'),
        },
        '.card__back-card': {
          transition: `transform ${theme('transitionDuration.300')} ease-in`,
          'transition-delay': theme('transitionDelay.300'),
          'object-fit': 'cover',
          'background-color': theme('colors.aliceblue'),
          'border-radius': theme('borderRadius.10px'),
          padding: '2px',
          width: '100%',
          height: '100%',
        },
        '.card--flipped .card__back-card': {
          transform: 'rotateY(90deg)',
          'transition-delay': theme('transitionDelay.0'),
        },
        '.login-form': {
          '@apply w-full max-w-md p-4 bg-white shadow-md rounded-md': {},
        },
        '.login-form--centered': {
          '@apply h-screen flex justify-center items-center': {},
        },
        '.login-form__container': {
          '@apply bg-white p-6 rounded-lg shadow-lg text-center': {}, 
        },
        '.login-form__input': {
          '@apply text-black border border-gray-300 p-2 mb-4 w-full rounded-md': {},
        },
        '.login-form__button': {
          '@apply mt-4 text-white px-4 py-2 rounded-md w-full': {},
        },
        '.login-form__button--primary': {
          '@apply bg-green-500 hover:bg-green-700 focus:bg-purple-600': {}, 
        },
        '.login-form__button--secondary': {
          '@apply bg-red-500 hover:bg-red-600': {}, 
        },

        // Full-height column: header on top, the board area takes the rest and is measured
        // to size the cards (see src/game/boardLayout.ts). From 1024px it becomes a row: the header is a
        // fixed-width sidebar (ScoreBoard) and the board area fills the rest; gap-6 (24px) separates them.
        // 100vh is the fallback for 100dvh.
        '.game-board': {
          // Wide enough for the card grid; the top header keeps its own narrower max width (ScoreBoard).
          '@apply mx-auto flex w-full max-w-screen-xl flex-col gap-4 p-4 min-[640px]:gap-6 min-[1024px]:max-w-screen-2xl min-[1024px]:flex-row': {},
          height: ['100vh', '100dvh'],
        },
        '.game-board__area': {
          '@apply flex min-h-0 min-w-0 flex-1': {},
        },
        // Auto margins center the grid but collapse to 0 when it overflows, so scrolling never clips it.
        '.game-board__list': {
          '@apply m-auto grid': {},
          'grid-template-columns': 'repeat(var(--cols), var(--card-size))',
          'grid-auto-rows': 'var(--card-size)',
          'justify-content': 'center',
          'align-content': 'center',
        },
        '.game-board__card': {
          '@apply relative': {},
          width: 'var(--card-size)',
          height: 'var(--card-size)',
        },
        '.game-board__banner': {
          '@apply pointer-events-none fixed inset-0 z-10 flex items-center justify-center p-4': {},
        },
      });
    },
  ],
}
