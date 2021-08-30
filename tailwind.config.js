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
          "slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.5s  both",
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
      },
      colors: {
        dateBubble: "#e1f2fb",
      },
      spacing: {
        ext: "35rem",
        extr: "30rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
