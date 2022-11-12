import colorUtility from "./colorUtility.js";

export default class Shadow extends colorUtility {
  constructor(config, value) {
    super(config, value);
  }

  getCss() {
    if (!this.isVariable) {
        return this.getColors("--m-shadow-color", undefined,1);
    }
  }
};
