import Utility from "./utility.js";

export default class ShadowColor extends Utility {
  constructor(config) {
    super(config);

    this.property = "--m-shadow-color";
    this.values = {
      transparent: "transparent",
      "c-current": "currentColor",
      "c-inherit": "inherit",
      "c-initial": "initial",
    };
    this.createThemeColors();
  }

  createThemeColors() {
    for (let t in this.config.base.themes) {
      const themeColors = this.config.base.themes[t];
      for (let i in themeColors) {
        this.values[i] = `var(--m-color-${i})`;

        for (let j = 1; j <= 5; j++) {
          this.values[i + "-" + j] = `var(--m-color-${i}-l-${j})`;

          this.values[i + "-" + j + "-"] = `var(--m-color-${i}-d-${j})`;
        }
      }
    }
  }
};
