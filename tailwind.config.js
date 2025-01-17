/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			sm: "480px",
			md: "768px",
			lg: "993px",
		},
		colors: {
			black: "#000000",
			white: "#ffffff",
			appBlack: "#111111",
			appLightBlack: "#1E1E1E",
			gray: "#535353",
			orange: "#ff5200",
			transparent: "rgba(0,0,0,0)",
			red: "#be2929",
			green: "#36C04E",
		},
		fontSize: {
			sm: "1.2rem",
			base: "1.4rem",
			xl: "1.6rem",
			"2xl": "1.8rem",
			"3xl": "2rem",
			"4xl": "2.8rem",
			"5xl": "3.6rem",
		},
		extend: {
			backgroundImage: {
				loginBg: "url('/images/loginBg.png')",
			},
		},
	},

	plugins: [],
};
