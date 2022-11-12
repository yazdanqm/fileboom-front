import colorUtility from "./colorUtility.js";

export default class NormalColor extends colorUtility {
  constructor(config, value, title, prop) {
    super(config, value);
    this.title = title;
    this.prop = prop;
  }
  getCss() {
    const prop = this.prop;

    if (this.isVariable) {
      return this.toCss(prop, `var(${this.value})`);
    } else {
      return this.getColors(prop, `--m-${this.title}-alpha`);
    }
  }
}
