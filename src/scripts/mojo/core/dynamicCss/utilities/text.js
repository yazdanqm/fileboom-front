import colorUtility from "./colorUtility.js";

export default class Text extends colorUtility {
  getCss() {
    if (/^\d/.test(this.value)) {
      if (this.isSemiDynamic) {
        let size = this.config.base.units.fontSize;
        let com = parseFloat(size);
        let value;
        if (com !== size) {
          let unit = size.replace(com.toString(), "");
          value = (parseFloat(this.value) * com).toString() + unit;
        } else {
          value = this.value;
        }

        return this.toCss("font-size", value);
      } else {
        return this.toCss("font-size", this.value);
      }
    } else {
      if (this.isVariable) {
        return this.toCss("color", `var(${this.value})`);
      } else {
        return this.getColors("color", "--m-text-alpha");
      }
    }
  }
};
