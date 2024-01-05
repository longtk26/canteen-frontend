/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      minHeight: {
        "1/2": "50%",
      },
      colors: {
        // Login/Register Form
        "dark-pink": "#C10C99",
        form: "#050214",

        // Main color
        primary: "#EA7C69",
        secondary: "#E7EAEE",
        tertiary: "rgb(4 120 87 / 1)",

        // Background
        "dark-bg-2": "#1F1D2B",
        "dark-line": "#393C49",

        dark_bg: "#1F1D2B",
        dark_line: "#393C49",

        // Status
        completed: "#50D1AA",

        //text
        light: "#ABBBC2",

        //Box-shadow
        brown: "rgba(234, 124, 105, 0.30)",
      },
      fontFamily: {
        barlow: "Barlow",
        poppin: '"Poppins", sans-serif',
      },
    },
  },
  plugins: [
    function ({ addComponents, theme }) {
      const customStyles = {
        ".custom-popup-container": {
          backgroundColor: "#1F1D2B",
          color: theme("colors.customText"),
        },
        ".custom-popup-content": {
          boxShadow: `0 4px 8px ${theme("colors.customShadow")}`,
        },
        ".custom-popup-header": {
          color: "white",
        },
        ".custom-popup-data": {
          color: "white",
        },
      };

      addComponents(customStyles);
    },
  ],
};
