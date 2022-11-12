import Utility from "./utility.js";

export default class Flex extends Utility {
  getTree() {
    this.property = "flex-direction";
    this.values = {
      row: "row",
      "row-reverse": "row-reverse",
      col: "column",
      "column-reverse": "column-reverse",
    };
    const flexDirection = super.getTree();

    this.property = "flex-wrap";
    this.values = {
      nowrap: "nowrap",
      wrap: "wrap",
      "wrap-reverse": "wrap-reverse",
    };
    const flexWrap = super.getTree();

    this.property = "flex";
    this.values = {
      auto: "1 1 auto",
      none: "none",
    };
    const flex = super.getTree();

    this.property = "flex-grow";
    this.values = {
      "grow-1": "1",
      "grow-0": "0",
    };
    const flexGrow = super.getTree();

    this.property = "flex-shrink";
    this.values = {
      "shrink-1": "1",
      "shrink-0": "0",
    };
    const flexShrink = super.getTree();

    return {
      ...flexDirection,
      ...flexWrap,
      ...flex,
      ...flexGrow,
      ...flexShrink,
    };
  }
};
