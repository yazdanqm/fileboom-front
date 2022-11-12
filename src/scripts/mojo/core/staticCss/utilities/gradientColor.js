import Utility from "./utility.js";

export default class GradientColor extends Utility {
  constructor(config, type) {
    super(config);

    if (type === "start") {
      this.property = "--m-gradient-start";
      this.values = {
        "start-transparent": "transparent",
        "start-c-current": "currentColor",
        "start-c-inherit": "inherit",
        "start-c-initial": "initial",
      };
      this.createThemeColors(type);
    }
    if (type === "mid") {
      this.property = "--m-gradient-stops";
      this.values = {
        "mid-transparent":
          "var(--m-gradient-start), transparent, var(--m-gradient-end)",
        "mid-c-current":
          "var(--m-gradient-start), currentColor, var(--m-gradient-end)",
        "mid-c-inherit":
          "var(--m-gradient-start), inherit, var(--m-gradient-end)",
        "mid-c-initial":
          "var(--m-gradient-start), initial, var(--m-gradient-end)",
      };
      this.createThemeColors(type);
    }
    if (type === "end") {
      this.property = "--m-gradient-end";
      this.values = {
        "end-transparent": "transparent",
        "end-c-current": "currentColor",
        "end-c-inherit": "inherit",
        "end-c-initial": "initial",
      };
      this.createThemeColors(type);
    }
  }

  createThemeColors(type) {
    if (type === "start" || type === "end") {
      for (let t in this.config.base.themes) {
        const themeColors = this.config.base.themes[t];
        for (let i in themeColors) {
          this.values[
            type + "-" + i
          ] = `rgba(var(--m-color-${i}), var(--m-gd-${type}-alpha, 1))`;

          for (let j = 1; j <= 5; j++) {
            this.values[
              type + "-" + i + "-" + j
            ] = `rgba(var(--m-color-${i}-l-${j}), var(--m-gd-${type}-alpha, 1))`;

            this.values[
              type + "-" + i + "-" + j + "-"
            ] = `rgba(var(--m-color-${i}-d-${j}), var(--m-gd-${type}-alpha, 1))`;
          }
        }
      }
    } else if (type === "mid") {
      for (let t in this.config.base.themes) {
        const themeColors = this.config.base.themes[t];
        for (let i in themeColors) {
          this.values[
            "mid-" + i
          ] = `var(--m-gradient-start), rgba(var(--m-color-${i}), var(--m-gd-mid-alpha, 1)), var(--m-gradient-end)`;

          for (let j = 1; j <= 5; j++) {
            this.values[
              "mid-" + i + "-" + j
            ] = `var(--m-gradient-start), rgba(var(--m-color-${i}-l-${j}), var(--m-gd-mid-alpha, 1)), var(--m-gradient-end)`;

            this.values[
              "mid-" + i + "-" + j + "-"
            ] = `var(--m-gradient-start), rgba(var(--m-color-${i}-d-${j}), var(--m-gd-mid-alpha, 1)), var(--m-gradient-end)`;
          }
        }
      }
    }
  }
};
