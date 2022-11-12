import Utility from "./utility.js";

export default class Background extends Utility {
  getTree() {
    this.property = "background-attachment";
    this.values = {
      fixed: "fixed",
      local: "local",
      scroll: "scroll",
    };
    const attachment = super.getTree();

    this.property = "background-origin";
    this.values = {
      "origin-border": "border-box",
      "origin-padding": "padding-box",
      "origin-content": "content-box",
    };
    const origin = super.getTree();

    this.property = "background-position";
    this.values = {
      top: "top",
      "top-right": "top right",
      "top-left": "top left",
      center: "center",
      bottom: "bottom",
      "bottom-right": "bottom right",
      "bottom-left": "bottom left",
      right: "right",
      left: "left",
    };
    const position = super.getTree();

    this.property = "background-repeat";
    this.values = {
      repeat: "repeat",
      "no-repeat": "no-repeat",
      "repeat-x": "repeat-x",
      "repeat-y": "repeat-y",
      "repeat-space": "space",
      "repeat-round": "round",
    };
    const repeat = super.getTree();

    this.property = "background-size";
    this.values = {
      auto: "auto",
      "auto-height": "100% auto",
      contain: "contain",
      cover: "cover",
    };
    const size = super.getTree();

    return {
      ...attachment,
      ...origin,
      ...position,
      ...repeat,
      ...size,
    };
  }
};
