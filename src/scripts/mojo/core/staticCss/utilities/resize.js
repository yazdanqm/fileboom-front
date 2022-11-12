import Utility from "./utility.js";

export default class Resize extends Utility {
  constructor() {
    super();

    this.property = "resize";
    this.values = {
      xy: "both",
      x: "horizontal",
      y: "vertical",
      none: "none",
      sticky: "sticky",
    };
  }
};
