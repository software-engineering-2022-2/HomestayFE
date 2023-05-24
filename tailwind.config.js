/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        'homestay-bg': "url('/background_image.jpg')",
      }
    },
  },
  plugins: [],
}

