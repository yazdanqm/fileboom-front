import colorUtility from "./colorUtility.js";

export default class Border extends colorUtility {
  constructor(config, value, side) {
    super(config, value);

    this.side = side;
    if (this.side.length > 0) this.side = "-" + this.side;
  }
  getCss() {
    if (this.isVariable) {
      return this.toCss(`border${this.side}`, `var(${this.value})`);
    } else if (
      this.value === "solid" ||
      this.value === "dotted" ||
      this.value === "dashed" ||
      this.value === "double"
    ) {
      return this.toCss(`border${this.side}-style`, `var(${this.value})`);
    } else if (/^\d/.test(this.value)) {
      return this.toCss(`border${this.side}-width`, `${this.value}`);
    } else {
      return this.getColors(`border${this.side}-color`, "--m-border-alpha");
    }
  }
};
