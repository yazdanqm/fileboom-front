import Utility from "./utility.js";
//const tinyColor = require("tinycolor2");

export default class Colors extends Utility {
  constructor(config, title, prop) {
    super(config);
    this.title = title;

    this.property = prop;
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
        this.values[
          i
        ] = `rgba(var(--m-color-${i}),var(--m-${this.title}-alpha))`;
        this.prepends[i] = `--m-${this.title}-alpha: 1`;
        for (let j = 1; j <= 5; j++) {
          this.values[
            i + "-" + j
          ] = `rgba(var(--m-color-${i}-l-${j}),var(--m-${this.title}-alpha))`;
          this.prepends[i + "-" + j] = `--m-${this.title}-alpha: 1`;

          this.values[
            i + "-" + j + "-"
          ] = `rgba(var(--m-color-${i}-d-${j}),var(--m-${this.title}-alpha))`;
          this.prepends[i + "-" + j + "-"] = `--m-${this.title}-alpha: 1`;
        }
      }
    }
  }
};
