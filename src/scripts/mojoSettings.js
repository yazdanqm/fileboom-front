mojo({
  options: {
    rtl: true,
  },
  base: {
    themes: {
      default: {
        body: "#fff",
        invert: "#000",
        primary: "#2ccd70",
        fbgray: "#777",
        milky: "#FAFAFA",
        fbdark: "#333333",
        lgray: "#EDEDED",
      },
    },
    fonts: {
      default: ["Bakh", "mgz"],
    },
    breakpoints: {
      xs: {
        min: "360px"
      },
      sm: {
        min: "576px"
      },
      md: {
        min: "768px"
      },
      lg: {
        min: "992px"
      },
      xl: {
        min: "1300px"
      },
      xxl: {
        min: "1600px"
      },
    },
    container: {
      default: {
        maxWidth: "100%",
        padding: "0 1.5rem",
      },
      xl: {
        maxWidth: "1345px",
      },
      xxl: {
        maxWidth: "1680px",
      },
    },
    effects: {
      shadow: {
        1: "0px 30px 50px 0px rgba(247,247,247,1)",
      },
    },
  },
  patterns: {
    html: {
      "i-xxl": "text-13px",
      "i-xl": "text-12px",
      "i-lg": "text-13px",
      "i-sm": "text-12px",
      "i-xs": "text-11px",
    },
  },
});
