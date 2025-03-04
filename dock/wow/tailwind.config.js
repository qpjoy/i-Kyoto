module.exports = {
  // prefix: "qp-",
  // important: true,
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px"
    },
    fontFamily: {
      display: ["Gilroy", "sans-serif"],
      body: ["Graphik", "sans-serif"]
    },
    fontFamily: {
      display: ["Gilroy", "sans-serif"],
      body: ["Graphik", "sans-serif"]
    },
    extend: {
      colors: {
        cyan: "#9cdbff"
      },
      margin: {
        96: "24rem",
        128: "32rem"
      }
    }
  },
  variants: {
    appearance: ["responsive"],
    backgroundColor: ["responsive", "hover", "focus"],
    fill: []
  },
  plugins: [
    require("tailwindcss-transforms"),
    require("tailwindcss-transitions"),
    require("tailwindcss-border-gradients")
  ]
};
