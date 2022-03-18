const {colors} = require('@app/assets/colors.config')

module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pink200: colors.secondaryLight,
        pink500: colors.secondary,
        purple500: colors.primary,
        purple200: colors.primaryLight,
        gray500: colors.textPrimary,
        gray200: colors.textGray,
      },
      borderRadius: {
        xl: '1rem',
      },
    },
    fontFamily: {
      mono: ['NicoMoji+'],
    },
  },
}
