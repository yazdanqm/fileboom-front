import Utility from "./utility.js";

export default class boxJustify extends Utility {
  getTree() {
    this.property = "justify-items";
    this.values = {
      "items-start": "var(--m-box-start)",
      "items-center": "center",
      "items-end": "var(--m-box-end)",
    };
    const alignItems = super.getTree();

    this.property = "justify-content";
    this.values = {
      "content-start": "var(--m-box-start)",
      "content-center": "center",
      "content-end": "var(--m-box-end)",
      "content-between": "space-between",
      "content-around": "space-around",
      "content-evenly": "space-evenly",
    };
    const alignContent = super.getTree();

    this.property = "justify-self";
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
