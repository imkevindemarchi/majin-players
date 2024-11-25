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
                backdrop: "#0000006b",
                "backdrop-dark": "#3030306b",
                "pink-transparent": "#f37c903a",
                "pink-transparent-2": "#f37c901d",
                "pink-2": "#0000006b",
                darkgray: "#141414",
            },
        },
        screens: {
            mobile: { max: "767px" },
        },
    },
    plugins: [],
};
