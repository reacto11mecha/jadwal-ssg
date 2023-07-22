/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
    fontFamily: {
      lato: ["Lato", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },

	},
	plugins: [],
}
