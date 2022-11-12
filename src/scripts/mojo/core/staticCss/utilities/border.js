import Utility from "./utility.js";

export default class Border extends Utility {
  getTree() {
    const COUNT = 8;
    this.property = "border-width";
    this.values = {
      none: "0",
    };
    for (let i = 1; i <= COUNT; i++) {
      this.values[i] = `${i}px`;
    }
    const borderNone = super.getTree();

    const styles = ["solid", "dashed", "dotted", "double"];
    this.property = "border-style";
    this.values = {};
    for (let i in styles) {
      this.values[styles[i]] = styles[i];
    }
    const borderStyle = super.getTree();

    const sides = ["top", "left", "right", "bottom"];
    let borderSides = {},
      borderSidesStyle = {};
    for (let s in sides) {
      this.property = `border-${sides[s]}-width`;
      this.values = {};
      this.values[`${sides[s]}-none`] = `0`;
      for (let i = 1; i <= COUNT; i++) {
        this.values[`${sides[s]}-${i}`] = `${i}px`;
      }
      const tmp = super.getTree();
      borderSides = { ...borderSides, ...tmp };

      for (let st in styles) {
        this.property = `border-${sides[s]}-style`;
        this.values = {};
        this.values[`${sides[s]}-${styles[st]}`] = styles[st];
        const tmp = super.getTree();
        borderSidesStyle = { ...borderSidesStyle, ...tmp };
      }
    }

    this.property = "border-collapse";
    this.values = {
      collapse: "collapse",
      separate: "separate",
    };
    const borderCollapse = super.getTree();

    return {
      ...borderNone,
      ...borderSides,
      ...borderStyle,
      ...borderSidesStyle,
      ...borderCollapse,
    };
  }
};
