import Utility from "./utility.js";

export default class MixBlend extends Utility {
  getTree() {
    this.property = "mix-blend-mode";
    this.values = {
      normal: "normal",
      multiply: "multiply",
      screen: "screen",
      darken: "darken",
      lighten: "lighten",
      "color-dodge": "color-dodge",
      "color-burn": "color-burn",
      difference: "difference",
      exclusion: "exclusion",
      hue: "hue",
      saturation: "saturation",
      color: "color",
      luminosity: "luminosity",
      overlay: "overlay",
    };
    const mix_blend = super.getTree();

    return mix_blend;
  }
};
