import Utility from "./utility.js";

export default class Display extends Utility {
  constructor() {
    super();

    this.property = "display";
    this.values = {
      block: "block",
      "inline-block": "inline-block",
      inline: "inline",
      table: "table",
      "table-row": "table-row",
      "table-cell": "table-cell",
      none: "none",
      flex: "flex",
      "inline-flex": "inline-flex",
      grid: "grid",
      "inline-grid": "inline-grid",
    };

    this.appends["flex"] = "--m-box-start:flex-start;--m-box-end:flex-end";
    this.appends["inline-flex"] =
      "--m-box-start:flex-start;--m-box-end:flex-end";
    this.appends["grid"] = "--m-box-start: start;--m-box-end: end";
    this.appends["inline-grid"] = "--m-box-start: start;--m-box-end: end";
    this.prefixes["grid"] = ["ms"];
    // this.prefixes["inline-grid"] = ["ms"];
  }
};
