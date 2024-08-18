/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "carrousel-color": "#F3F1EE",
        "gray-color": "#595959",
        "footer-color": "#D5D4D0",
        "beige-color": "#B69454",
        "white-color": "#FFFFFF",
        "logo-color": "#272727",
        "normal-black-color": "#262626",
        "important-black-color": "#000000",
        "border-color": "#E9E9E9",
        "order-input": "#9F9F9F",
        "modal-color": "#00000080",
        "modal-background": "#00000080",
        "modal-button-border": "#D9D9D9",
      },
      fontFamily: {
        lora: ["Lora"],
        roboto: ["Roboto"],
      },
      screens: {
        xs: "425px",
        fullHd: "1920px",
      },
    },
  },
  plugins: [],
};
