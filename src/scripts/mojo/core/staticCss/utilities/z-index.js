import Utility from "./utility.js";

export default class Z_Index extends Utility {
  getTree() {
    this.property = "z-index";
    this.values["auto"] = "auto";
    for (let i = 0; i <= 5; i++) {
      this.values[i * 25] = i * 25;
    }
    const z_index = super.getTree();

    return z_index;
  }
};
