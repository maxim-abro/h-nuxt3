/** @type {import('tailwindcss').Config} */
// @ts-ignore
const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      inherit: colors.inherit,
      current: colors.current,
      black: colors.black,
      white: colors.white,
      slate: colors.slate,
      gray: colors.gray,
      zinc: colors.zinc,
      neutral: colors.neutral,
      stone: colors.stone,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
      second: "#262632",
      primary: {
        DEFAULT: "#fdb13c",
        50: "#FFFCF8",
        100: "#FEEACB",
        200: "#FEDAA2",
        300: "#FDCB7D",
        400: "#FDBD5B",
        500: "#FDB13C",
        600: "#FDA51D",
        700: "#FC9A02",
        800: "#E38B02",
        900: "#CC7D02",
      },
    },
    extend: {
      animation: {
        "spin-slow": "spin 4s linear infinite",
      },
      fontFamily: {
        sans: ["Roboto", "normal"],
        display: ["Roboto", "normal"],
        body: ["Roboto", "normal"],
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              background: "#fdb13c60",
              "&:hover": {
                background: "#fdb13c",
              },
            },
          },
        },
      },
    },
    screens: {
      sm: "540px",
      md: "720px",
      lg: "960px",
      xl: "1140px",
      "2xl": "1320px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        lg: "1rem",
        xl: "1rem",
        "2xl": "1rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
