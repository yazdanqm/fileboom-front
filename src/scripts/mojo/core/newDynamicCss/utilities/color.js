import Utility from "./utility.js";
import tinyColor from "../../../lib/tinycolor.js";
import Vanilla from "./vanilla.js";

export default class Color extends Utility {
  getCSS() {
    let props = this.args.props;
    let value = this.args.value;
    let config = this.args.config;
    let colorName = this.args.color;

    let isConfigColor = config.base.themes.default[colorName] !== undefined;

    let isMidColor = false;

    let alphaValue = 1;
    let isAlphaAppended = false;
    if (
      this.args.appends &&
      this.args.appends[0] &&
      !isNaN(this.args.appends[0])
    ) {
      alphaValue = parseInt(this.args.appends[0]) / 100;
      isAlphaAppended = true;
    }

    let css = "",
      isFirst = true;
    if (isConfigColor) {
      if (this.args.usedColors[colorName] === undefined) {
        this.args.usedColors[colorName] = new Set();
      }

      let cvar = "--m-color-" + colorName;
      if (colorName !== value && !isNaN(value)) {
        value = parseInt(value);
        if (value > 0) cvar += "-l-" + value;
        else if (value < 0) cvar += "-d" + value;

        this.args.usedColors[colorName].add(value);
      } else {
        this.args.usedColors[colorName].add(0);
      }
      let alphaProp = `--m-${this.args.name}-alpha`;

      for (let i in props) {
        if (isFirst) isFirst = false;
        else css += ";";
        if (props[i].includes("mid")) isMidColor = true;
        css += this.toCss(
          props[i],
          `rgba(var(${cvar}),var(${alphaProp}))${isMidColor ? "," : ""}`,
          this.toCss(alphaProp, alphaValue)
        );
      }

      return css;
    } else {
      let rawColor = this.args.value.split(":");

      let func = rawColor[1];
      let color;
      if (func === undefined) {
        if (colorName !== undefined) {
          color = tinyColor(colorName);
          if (colorName !== value && !isNaN(value)) {
            value = parseInt(value);
            if (value > 0)
              color = color.brighten(
                value * this.args.config.base.units.lighten
              );
            else if (value < 0) {
              color = color.darken(-value * this.args.config.base.units.darken);
            }
          }
        } else {
          color = tinyColor(value);
        }
      } else {
        let inputColor = tinyColor(`${rawColor[0]}`);
        let inputFunc = func.replace(/\+/g, "");
        inputFunc = inputFunc.replace("-", "");
        color = inputColor;
        let count = parseInt(inputFunc) + 1;
        if (func.startsWith("+")) {
          for (let i = 1; i < count; i++) {
            color = color.brighten(i * this.args.config.base.units.lighten);
          }
        } else {
          for (let i = 1; i < count; i++) {
            color = color.darken(i * this.args.config.base.units.darken);
          }
        }
      }

      if (color["_ok"] === false) return new Vanilla(this.args).getCSS();

      let alphaProp = `--m-${this.args.name}-alpha`;

      for (let i in props) {
        if (isFirst) isFirst = false;
        else css += ";";
        if (props[i].includes("mid")) isMidColor = true;
        css += this.toCss(
          props[i],
          `rgba(${color.toRgb().r}, ${color.toRgb().g}, ${
            color.toRgb().b
          }, var(${alphaProp}))${isMidColor ? "," : ""}`,
          this.toCss(alphaProp, isAlphaAppended ? alphaValue : color._a)
        );
      }

      return css;
    }
  }
}
