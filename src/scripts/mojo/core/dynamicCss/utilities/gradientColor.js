import colorUtility from "./colorUtility.js";

export default class gradientColor extends colorUtility {
  constructor(config, value, stop) {
    super(config, value);
    this.stop = stop;
  }

  getCss() {
    if (!this.isVariable) {
      if (this.stop === "mid") {
        return this.getColors(`--m-gradient-stops`, undefined, 2);
      } else {
        return this.getColors(`--m-gradient-${this.stop}`, this.stop, 3);
      }
    }
  }
}
