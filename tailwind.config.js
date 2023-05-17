/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          450: '#e5f3fe',
          900: '#00152a',
        },
        neutral: {
          150: '#f7f7f7',
          450: '#969696',
        },
        lila: '#4f46e5',
      },
    },
  },
  plugins: [],
}

