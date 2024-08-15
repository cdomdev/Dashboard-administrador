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
    },
  },
  plugins: [require("flowbite/plugin")],
};
