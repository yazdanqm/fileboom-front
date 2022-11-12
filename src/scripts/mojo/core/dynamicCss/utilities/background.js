import colorUtility from "./colorUtility.js";

export default class Background extends colorUtility {
  getCss() {
    const prop = "background-color";

    if (this.isVariable) {
      return this.toCss(prop, `var(${this.value})`);
    } else {
      return this.getColors("background-color", "--m-bg-alpha");
    }
  }
};
