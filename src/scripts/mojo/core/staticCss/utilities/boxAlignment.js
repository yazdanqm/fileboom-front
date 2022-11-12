import Utility from "./utility.js";

export default class BoxAlignment extends Utility {
  getTree() {
    this.property = "align-items";
    this.values = {
      "items-stretch": "stretch",
      "items-baseline": "baseline",
      "items-start": "var(--m-box-start)",
      "items-center": "center",
      "items-end": "var(--m-box-end)",
    };
    const alignItems = super.getTree();

    this.property = "align-content";
    this.values = {
      "content-between": "space-between",
      "content-around": "space-around",
      "content-start": "var(--m-box-start)",
      "content-center": "center",
      "content-end": "var(--m-box-end)",
    };
    const alignContent = super.getTree();

    this.property = "align-self";
    this.values = {
      "self-auto": "auto",
      "self-stretch": "stretch",
      "self-start": "var(--m-box-start)",
      "self-center": "center",
      "self-end": "var(--m-box-end)",
    };
    const alignSelf = super.getTree();

    return {
      ...alignItems,
      ...alignContent,
      ...alignSelf,
    };
  }
};
