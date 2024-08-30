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
        'min-47px': '50px',
        'min-100px': '100px',
        'min-180px': '150px'

      },
      screens: {
        'sm': '400px',
        'md': '700px',
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
      },
      transformOrigin: {
        'center': 'center center',
      },
    },
  },
  plugins: [
    function ({ addComponents, theme }) {
      addComponents({
        '.card': {
          display: 'flex',
          'flex-direction': 'column',
          'justify-content': 'center',
          'align-items': 'center',
          listStyle: 'none',
          position: 'relative',
        },
        '.card__front-card': {
          transform: 'rotateY(90deg)',
          transition: `transform ${theme('transitionDuration.300')} ease-in`,
          position: 'absolute',
          'object-fit': 'cover',
          'border-radius': theme('borderRadius.10px'),
          border: '2px solid #fff',
          width: theme('spacing.min-47px'),
          height: theme('spacing.min-47px'),
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
          width: theme('spacing.min-47px'),
          height: theme('spacing.min-47px'),
        },
        '@screen sm': {
          '.card__front-card, .card__back-card': {
            width: theme('spacing.min-100px'),
            height: theme('spacing.min-100px'),
          },
        },
        '@screen md': {
          '.card__front-card, .card__back-card': {
            width: theme('spacing.min-180px'),
            height: theme('spacing.min-180px'),
          },
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
          '@apply bg-green-500 hover:bg-green-600': {}, 
        },
        '.login-form__button--secondary': {
          '@apply bg-red-500 hover:bg-red-600': {}, 
        },

        '.game-board': {
          '@apply max-w-screen-lg mx-auto my-10 p-4': {},
        },
        '.game-board__button': {
          '@apply bg-none border-2 border-white px-3 py-1 rounded text-white font-bold cursor-pointer text-base hover:bg-[#c23866] hover:text-white': {},
        },
        '.game-board__list': {
          '@apply mt-12 grid gap-2.5': {},
          'grid-template-columns': 'repeat(5, minmax(0, 1fr))', 
          'grid-template-rows': 'repeat(5, minmax(0, 1fr))', 
        },
        '.game-board__card': {
          '@apply relative': {},
        },
      });
    },
  ],
}
