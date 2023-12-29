/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    1: "#8000ff",
                    2: "#e000ff",
                },
                authform: {
                    1: "#12055c",
                    2: "#42045e",
                },
                error: "crimson",
                success: "rgb(20, 220, 60)",
            },
        },
        screens: {
            xl: { max: "1279px" },
            lg: { max: "1023px" },
            md: { max: "767px" },
            sm: { max: "639px" },
        },
    },
    plugins: [],
};
