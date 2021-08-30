module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Poppins"],
    },
    extend: {
      animation: {
        "shadow-drop-center": "shadow-drop-center 0.7s ease-out   both",
        "slide-bottom":
          "slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        "slide-top":
          "slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 1s  both",
        "fade-in":
          "fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) 0.5s  both",
        "tracking-in-expand":
          "tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000)   both",
        "color-change-2x":
          "color-change-2x 2s linear  infinite alternate-reverse both",
      },
      keyframes: {
        "shadow-drop-center": {
          "0%": {
            "box-shadow": "0 0 0 0 transparent",
          },
          to: {
            "box-shadow": "0 0 20px 0 rgba(0, 0, 0, .35)",
          },
        },
        "slide-bottom": {
          "0%": {
            transform: "translateY(0)",
            opacity: "0%",
          },
          to: {
            transform: "translateY(100px)",
            opacity: "100%",
          },
        },
        "slide-top": {
          "0%": {
            transform: "translateY(0)",
            opacity: "0%",
          },
          to: {
            transform: "translateY(-100px)",
            opacity: "100%",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
        "tracking-in-expand": {
          "0%": {
            "letter-spacing": "-.5em",
            opacity: "0",
          },
          "40%": {
            opacity: ".6",
          },
          to: {
            opacity: "1",
          },
        },
        "color-change-2x": {
          "0%": {
            background: "#19dcea",
          },
          to: {
            background: "#b22cff",
          },
        },
      },
      colors: {
        dateBubble: "#e1f2fb",
      },
      spacing: {
        ext: "35rem",
        up: "28rem",
        upSize: "26rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
