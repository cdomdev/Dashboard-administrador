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
    },
  },
  plugins: [require("flowbite/plugin")],
};
