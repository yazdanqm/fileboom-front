import Utility from "./utility.js";

export default class BoxOrder extends Utility {
  constructor() {
    super();
    const GRID_COUNT = 24;
    this.property = "order";
    this.values = {
      first: "-1",
      last: "99999",
      none: "0",
    };
    for (let i = 1; i <= GRID_COUNT; i++) {
      this.values[i] = i;
    }
  }
};
