import primeui from 'tailwindcss-primeui';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts}'],
    theme: {
        extend: {
          colors: {
            primary: {
                DEFAULT: "var(--primary-color)",
            },
            "primary-light": {
                DEFAULT: "var(--primary-light-color)",
            },
          },
        },
    },
    plugins: [primeui],
    darkMode: "class"
};
