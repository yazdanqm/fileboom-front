import utility from "./utility.js";
import tinyColor from "../../../lib/tinycolor.js";

export default class colorUtility extends utility {
  getColors(prop, alphaProp, type = 0) {
    let rawColor = this.value.split(":");
    let func = rawColor[1];
    let color;
    if (func === undefined) {
      color = tinyColor(`${this.value}`);
    } else {
      let inputColor = tinyColor(`${rawColor[0]}`);
      let inputFunc = func.replace(/\+/g, "");
      inputFunc = inputFunc.replace("-", "");
      color = inputColor;
      let count = parseInt(inputFunc) + 1;
      if (func.startsWith("+")) {
        for (let i = 1; i < count; i++) {
          color = color.brighten(i * this.config.base.units.lighten);
        }
      } else {
        for (let i = 1; i < count; i++) {
          color = color.darken(i * this.config.base.units.darken);
        }
      }
    }

    if (type === 0) {
      return (
        this.toCss(alphaProp, color._a) +
        ";" +
        this.toCss(
          prop,
          `rgba(${color.toRgb().r}, ${color.toRgb().g}, ${
            color.toRgb().b
          }, var(${alphaProp}))`
        )
      );
    } else if (type === 1) {
      return this.toCss(
        prop,
        `${color.toRgb().r}, ${color.toRgb().g}, ${color.toRgb().b}`
      );
    } else if (type === 2) {
      return this.toCss(
        prop,
        `var(--m-gradient-start), rgba(${color.toRgb().r}, ${
          color.toRgb().g
        }, ${color.toRgb().b}, var(--m-gd-mid-alpha, 1)), var(--m-gradient-end)`
      );
    } else if (type === 3) {
      return this.toCss(
        prop,
        `rgba(${color.toRgb().r}, ${color.toRgb().g}, ${
          color.toRgb().b
        }, var(--m-gd-${alphaProp}-alpha, 1))`
      );
    }
  }
}
