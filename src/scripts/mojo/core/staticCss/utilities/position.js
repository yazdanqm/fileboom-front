import Utility from "./utility.js";

export default class Position extends Utility {
  constructor() {
    super();

    this.property = "position";
    this.values = {
      static: "static",
      fixed: "fixed",
      absolute: "absolute",
      relative: "relative",
      sticky: "sticky",
    };
  }
};
