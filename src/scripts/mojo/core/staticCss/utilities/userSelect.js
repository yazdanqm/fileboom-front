import Utility from "./utility.js";

export default class UserSelect extends Utility {
  constructor() {
    super();

    this.property = "user-select";
    this.values = {
      "select-none": "none",
      "select-text": "text",
      "select-auto": "auto",
    };
  }
};
