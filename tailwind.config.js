module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./containers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#532c6d",
      },
      backgroundImage: {
        "talent-bg": "url('/images/thumb/talent-bg.png');",
        "agent-bg": "url('/images/thumb/talent-bg.png');",
        splash: "url('/images/thumb/splash.png');",
        auth: "url('/images/thumb/auth-bg.jpg');",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      boxShadow: {
        base: "0px 1px 2px 0px rgba(0, 0, 0, 0.1);",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".section-gap": {
          padding: "40px 0",
        },
        ".section-gap-b": {
          paddingBottom: "40px",
        },
        ".section-gap-t": {
          paddingTop: "40px",
        },
      });
    },
  ],
};
