export default {
  options: {
    initStyles: true,
    rtl: false,
    darkMode: {
      enabled: false,
      theme: "dark",
    },
  },
  base: {
    themes: {
      default: {
        body: "#fff",
        invert: "#202129",
        primary: "#ff6145",
        white: "#fff",
        black: "#000",
        gray: "#666666",
        grayblue: "#455370",
        red: "#e84c3d",
        pink: "#ff004e",
        orange: "#f39b13",
        yellow: "#f1c40f",
        tealblue: "#01caff",
        blue: "#0078ff",
        green: "#2ccd70",
        purple: "#5a51de",
        bronze: "#c67c3b",
        orchid: "#9a59b5",
        charocoal: "#31394c",
      },
    },
    fonts: {
      default: {
        "system-ui": "",
        "-apple-system": "",
        BlinkMacSystemFont: "",
        "'Segoe UI'": "",
        Roboto: "",
        Oxygen: "",
        Ubuntu: "",
        Cantarell: "",
        "'Open Sans'": "",
        "'Helvetica Neue'": "",
        "sans-serif": "",
      },
    },
    breakpoints: {
      sm: { min: "576px" },
      md: { min: "768px" },
      lg: { min: "992px" },
      xl: { min: "1200px" },
      xxl: { min: "1600px" },
    },
    container: {
      default: {
        maxWidth: "100%",
        padding: "0 1rem",
      },
      sm: {
        maxWidth: "576px",
      },
      md: {
        maxWidth: "768px",
      },
      lg: {
        maxWidth: "992px",
      },
      xl: {
        maxWidth: "1200px",
      },
      xxl: {
        maxWidth: "1400px",
      },
    },
    effects: {
      shadow: {
        1: "0 2px 6px 0 var(--m-shadow-color, #0000001a), 0 1px 2px 0 var(--m-shadow-color, #0000001a)",
        2: "0 3px 9px 0 var(--m-shadow-color, #0000001a), 0 1px 2px 0 var(--m-shadow-color, #0000001a)",
        3: "0 4px 15px 0 var(--m-shadow-color, #0000001a), 0 1px 2px 0 var(--m-shadow-color, #0000001a)",
        4: "0 5px 18px 0 var(--m-shadow-color, #0000001a), 0 1px 3px 0 var(--m-shadow-color, #0000001a)",
        5: "0 8px 26px 0 var(--m-shadow-color, #0000001a), 0 2px 3px 0 var(--m-shadow-color, #0000001a)",
      },
    },
    units: {
      fontSize: "0.01rem",
      scale: "0.01",
      rotate: "1deg",
      sizing: "0.25rem",
      transition: "1ms",
      rounded: "0.125rem",
      lighten: "3.0",
      darken: "1.2",
    },
  },
  extensions: [],
};
