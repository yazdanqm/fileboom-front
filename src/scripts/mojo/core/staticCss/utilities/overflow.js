import Utility from "./utility.js";

export default class Overflow extends Utility {
  getTree() {
    this.property = "overflow";
    this.values = {
      auto: "auto",
      hidden: "hidden",
      scroll: "scroll",
      visible: "visible",
    };
    const overflow = super.getTree();

    this.property = "overflow-x";
    this.values = {
      "x-auto": "auto",
      "x-hidden": "hidden",
      "x-scroll": "scroll",
      "x-visible": "visible",
    };
    const overflow_x = super.getTree();

    this.property = "overflow-y";
    this.values = {
      "y-auto": "auto",
      "y-hidden": "hidden",
      "y-scroll": "scroll",
      "y-visible": "visible",
    };
    const overflow_y = super.getTree();

    return {
      ...overflow,
      ...overflow_x,
      ...overflow_y,
    };
  }
};
