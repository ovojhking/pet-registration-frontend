import primeui from 'tailwindcss-primeui';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts}'],
    theme: {
        extend: {
          colors: {
            primary: {
              DEFAULT: "var(--primary-color)", // 讓 Tailwind 讀取 PrimeVue 的變數
            },
          },
        },
    },
    plugins: [primeui],
    darkMode: "class"
};
