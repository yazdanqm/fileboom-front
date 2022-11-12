import Utility from "./utility.js";

export default class Vanilla extends Utility {
  getCSS(type) {
    let name = this.args.name;
    let props = this.args.props;
    let value = this.args.value;
    let config = this.args.config;

    let css = "",
      isFirst = true;
    value = value
      .toString()
      .replace(/([^\\])(\_)/g, "$1 ")
      .replace(/\\_/g, "_");

    for (let i in props) {
      if (isFirst) isFirst = false;
      else css += ";";
      if (props[i].includes("shadow"))
        value = value.replace(/[c](?=\W)|[c]$/g, "var(--m-shadow-color)");
      if (this.args.isNumber)
        css += this.toCss(
          props[i],
          this.getValueUnit(name, props[i], value, config)
        );
      else
        css += this.toCss(
          props[i],
          this.getValue(name, props[i], value, config)
        );
    }

    return css;
  }

  getValueUnit(name, prop, value, config) {
    if (this.args.isForcedValue) return value;
    let size = config.base.units.sizing;
    let changeNeeded = true;
    if (prop.startsWith("--m-t-scale")) size = config.base.units.scale;
    if (prop.startsWith("--m-t-rotate") || prop.startsWith("--m-t-skew"))
      size = config.base.units.rotate;
    if (prop.includes("transition")) size = config.base.units.transition;
    if (prop.includes("radius")) size = config.base.units.rounded;
    if (prop.includes("alpha") || prop.includes("opacity")) size = 0.01;
    if (
      prop.startsWith("z-index") ||
      prop.startsWith("font-weight") ||
      prop.startsWith("order")
    )
      size = 1;
    if (prop.startsWith("font-size")) size = config.base.units.fontSize;
    if (prop.includes("border") && prop.includes("width")) size = 1 + "px";
    if (prop.includes("grid")) {
      changeNeeded = false;
      if (name === "cols" || name === "rows")
        value = `repeat(${value}, minmax(0, 1fr))`;
      if (name === "col" || name === "c-span" || name === "r-span")
        value = `auto / span ${value}`;
      if (name === "col-offset") value = parseInt(value) + 1;
    }
    if (prop.startsWith("--m-f-") || prop.startsWith("--m-bf-")) {
      changeNeeded = false;
      let f_value = value / 100;
      if (prop.includes("blur")) f_value = value + "px";
      if (prop.includes("rotate")) f_value = value + "deg";
      value = `${name.replace("backdrop-", "")}(${f_value})`;
    }
    if (name === "shadow-solid") {
      changeNeeded = false;
      value = `0 0 0 ${value}px var(--m-shadow-color, #000)`;
    }
    if (name === "shadow") {
      changeNeeded = false;
      let shadowArr = config.base.effects.shadow;
      for (let i in shadowArr) {
        if (i === value) value = shadowArr[i];
      }
    }

    if (changeNeeded) {
      let com = parseFloat(size);
      if (com !== size) {
        let unit = size.replace(com.toString(), "");
        value = (parseFloat(value) * com).toString() + unit;
      } else {
        value = (parseFloat(value) * com).toString();
      }
    }

    return value;
  }
  getValue(name, prop, value, config) {
    if (this.args.isForcedValue) return value;
    if (name === "gradient-dir") {
      if (!value.includes("deg")) value = "to " + value.replace(/-/g, " ");
    }
    if (
      prop === "background-position" ||
      name === "transform-o" ||
      name === "perspective-o" ||
      name === "flex" ||
      name === "obj-p"
    )
      value = value.replace(/-/g, " ");
    if (name.includes("bg-img")) value = "url('" + value + "')";
    if (value === "current") value = "currentColor";
    if (value.toString().includes("calc")) {
      value = value
        .replace(/\+/g, " + ")
        .replace(/\-/g, " - ")
        .replace(/\*/g, " * ")
        .replace(/\//g, " / ");
    }
    if (name === "d" && value.includes("flex"))
      value = `${value};--m-box-start: flex-start;--m-box-end: flex-end`;
    if (name === "d" && value.includes("grid"))
      value = `${value};--m-box-start: start;--m-box-end: end`;
    if (
      name.startsWith("a-") ||
      name.startsWith("j-") ||
      name.startsWith("p-")
    ) {
      if (value.includes("start") || value.includes("end"))
        value = `var(--m-box-${value})`;
      if (
        value.includes("between") ||
        value.includes("around") ||
        value.includes("evenly")
      )
        value = `space-${value}`;
    }
    if (prop.startsWith("--m-f-") || prop.startsWith("--m-bf-"))
      value = `${name.replace("backdrop-", "")}(${value})`;
    if (name === "shadow" && !value.startsWith("var")) {
      let isFromConfig = false;
      let shadowArr = config.base.effects.shadow;
      for (let i in shadowArr) {
        if (i === value) {
          isFromConfig = true;
          value = shadowArr[i];
        }
      }
    }
    if (name === "shadow-solid")
      value = `0 0 0 ${value} var(--m-shadow-color, #000)`;
    if (name === "font") {
      let fontArr = config.base.fonts;
      for (let i in fontArr) {
        if (i === value) {
          if (typeof fontArr[i] === typeof "") {
            value = fontArr[i];
          } else {
            value = "";
            let isFirst = true;
            for (let j in fontArr[i]) {
              if (isFirst) isFirst = false;
              else value += ",";

              if (!Array.isArray(fontArr[i])) {
                value += j;
              } else {
                value += fontArr[i][j];
              }
            }
          }
        }
      }
    }

    return value;
  }
}
