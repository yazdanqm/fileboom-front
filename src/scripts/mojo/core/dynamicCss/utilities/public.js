import utility from "./utility.js";

export default class Text extends utility {
  constructor(config, value, prop) {
    super(config, value);

    this.prop = prop;
  }

  getCss(checkUnit = true) {
    if (this.isVariable) {
      let ret = "";
      let isFirst = true;
      for (let i in this.prop) {
        if (isFirst) isFirst = false;
        else ret += ";";

        ret += this.toCss(this.prop[i], `var(${this.value})`);
      }
      return ret;
    } else {
      let ret = "";
      let isFirst = true;
      for (let i in this.prop) {
        if (isFirst) isFirst = false;
        else ret += ";";

        if (this.isSemiDynamic === true && checkUnit) {
          let size = this.config.base.units.sizing;
          if (this.prop[i].startsWith("--m-scale"))
            size = this.config.base.units.scale;
          if (this.prop[i].startsWith("--m-rotate"))
            size = this.config.base.units.rotate;
          if (this.prop[i].startsWith("--m-blur")) size = 2 + "px";
          if (this.prop[i].startsWith("--m-grayscale")) size = 1 + "%";
          if (this.prop[i].startsWith("--m-invert")) size = 1 + "%";
          if (this.prop[i].includes("transition"))
            size = this.config.base.units.transition;
          if (this.prop[i].includes("radius"))
            size = this.config.base.units.rounded;
          if (this.prop[i].includes("alpha")) size = 0.01;
          if (this.prop[i].includes("opacity")) size = 0.01;
          if (this.prop[i].startsWith("z-index")) size = 1;

          let com = parseFloat(size);
          let value;
          if (com !== size) {
            let unit = size.replace(com.toString(), "");
            value = (parseFloat(this.value) * com).toString() + unit;
          } else {
            value = (parseFloat(this.value) * com).toString();
          }

          ret += this.toCss(this.prop[i], value);
        } else {
          ret += this.toCss(this.prop[i], this.value);
        }
      }
      return ret;
    }
  }
};
