import Utility from "./utility.js";

export default class ObjectFit extends Utility {
  getTree() {
    this.property = "object-fit";
    this.values = {
      "fit-contain": "contain",
      "fit-cover": "cover",
      "fit-fill": "fill",
      "fit-none": "none",
      "fit-scale-down": "scale-down",
    };
    const object_fit = super.getTree();

    this.property = "object-position";
    this.values = {
      "p-top": "top",
      "p-top-right": "top right",
      "p-top-left": "top left",
      "p-center": "center",
      "p-bottom": "bottom",
      "p-bottom-right": "bottom right",
      "p-bottom-left": "bottom left",
      "p-right": "right",
      "p-left": "left",
    };
    const object_position = super.getTree();

    return {
      ...object_fit,
      ...object_position,
    };
  }
};
