import Vanilla from "./utilities/vanilla.js";
import Variable from "./utilities/variable.js";
import Color from "./utilities/color.js";
import StaticValues from "./staticValues.js";

export default class DynamicCss {
  constructor(args) {
    this.args = args;
  }

  getCss() {
    const classInfo = this.getClassInfo();

    if (classInfo.isVariable) {
      return new Variable(classInfo).getCSS();
    } else if (classInfo.isColor) {
      return new Color(classInfo).getCSS();
    } else {
      return new Vanilla(classInfo).getCSS();
    }
  }

  getClassInfo() {
    let name = this.args.name;
    let value = this.args.value;

    if (value.endsWith("-")) value = "-" + value.substring(0, value.length - 1);

    if (value.startsWith("(") && value.endsWith(")"))
      value = value.substring(1, value.length - 1);

    /////////// number
    const isNumber = !isNaN(value);
    /////////// number-end

    /////////// variable
    const isVariable = value.startsWith("--");
    /////////// variable-end

    /////////// color
    let isColor = false,
      color = undefined;

    if (name.endsWith("-c")) {
      isColor = true;
    }
    if (isColor) {
      let valueSpl = value.split(":");
      color = valueSpl[0];

      if (valueSpl[1]) value = valueSpl[1].replace("+", "");
    }
    /////////// color-end

    let v = value;
    if (StaticValues["_"][v] !== undefined) {
      value = StaticValues["_"][v];
    }
    if (
      StaticValues[name] !== undefined &&
      StaticValues[name][v] !== undefined
    ) {
      value = StaticValues[name][v];
    }
    let nspl = name.split("-");
    let n;
    do {
      n = nspl.shift();
    } while (n === "");
    if (
      StaticValues["_i_" + n] !== undefined &&
      StaticValues["_i_" + n][v] !== undefined
    ) {
      value = StaticValues["_i_" + n][v];
    }

    if(value !== "default" && this.args.config.base.container[value] !== undefined && this.args.config.base.container[value].maxWidth !== undefined)
        value = this.args.config.base.container[value].maxWidth;

    if(!Array.isArray(this.args.props) && this.args.props.startsWith(":"))
        this.args.props = this.args.props.substring(1);

    return {
      name,
      value,
      isNumber,
      isColor,
      color,
      isVariable,
      config: this.args.config,
      isForcedValue: this.args.isForcedValue,
      appends: this.args.appends,
      props: this.args.props,
      usedColors: this.args.usedColors,
    };
  }
}
