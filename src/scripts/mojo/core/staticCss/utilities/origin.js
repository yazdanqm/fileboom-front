import Utility from "./utility.js";

export default class Origin extends Utility {
  constructor(type) {
    super();

    if (type === "transform") {
      this.property = "transform-origin";
    }
    if (type === "perspective") {
      this.property = "perspective-origin";
    }
    this.values = {
      "origin-center": "center",
      "origin-top": "top",
      "origin-right": "right",
      "origin-bottom": "bottom",
      "origin-left": "left",
      "origin-top-right": "top right",
      "origin-top-left": "top left",
      "origin-bottom-right": "bottom right",
      "origin-bottom-left": "bottom left",
    };
  }
};
