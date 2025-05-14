/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.js",
    "./screens/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        siyah: "#232323",
        beyaz: "#FFFFFF",
        sari: "#E2F163",
        mor: "#896CFE",
        acikmor: "#B3A0FF"
      }
    },
  },
  plugins: [],
  presets: [require("nativewind/preset")],
}
