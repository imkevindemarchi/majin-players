/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#f37c90",
                red: "#ff0000",
                green: "#008000",
                orange: "#ffa500",
            },
        },
    },
    plugins: [],
};
