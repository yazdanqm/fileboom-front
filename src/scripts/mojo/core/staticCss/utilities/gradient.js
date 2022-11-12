import Utility from "./utility.js";

export default class Gradient extends Utility {
  getTree() {
    this.property = "--m-gradient-dir";
    this.values = {
      "to-top": "to top",
      "to-top-r": "to top right",
      "to-top-l": "to top left",
      "to-bottom": "to bottom",
      "to-bottom-r": "to bottom right",
      "to-bottom-l": "to bottom left",
      "to-right": "to right",
      "to-left": "to left",
    };
    const gd_direction = super.getTree();

    return {
      ...gd_direction,
    };
  }
};
