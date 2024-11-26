/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      width: {
        "vw-custom": "95vw",
      },
      gridTemplateColumns: {
        cust: "repeat(auto-fit, minmax(600px, 1fr))",
        custe: "repeat(2, 50%);",
      },
      colors: {
        "custom-color1": "rgb(191, 190, 167)",
        "custom-color2": "rgb(200, 200, 200)",
        "custom-color3": "rgb(195, 195, 195)",
        "color-a": "#fbddb9",
        "color-b": "#6ee35e",
        "color-c": "#cd76d8",
        "color-d": "#c86464",
        "color-e": "#33ddc0",
        "color-f": "#284cc5",
      },
      fontFamily: {
        "text-cust-1": "Roboto, sans-serif",
        "text-cust-2": "Montserrat, sans-serif"
      },
    },
  },

  darkMode: "class",

  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("flowbite/plugin")({
      charts: true,
    }),
  ],
};

