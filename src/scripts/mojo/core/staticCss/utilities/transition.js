import Utility from "./utility.js";

export default class Transition extends Utility {
  constructor(config, type) {
    super(config);
    let timings = ["ease", "ease-in", "ease-in-out", "ease-out", "linear"];
    if (type === "timing") {
      this.property = "transition-delay";
      this.prefixes = ["webkit", "o"];
      for (let i in timings) {
        this.values[timings[i]] = timings[i];
      }
    }
    let properties = {
      colors: "background-color, border-color, color, fill, stroke",
      opacity: "opacity",
      shadow:
        "box-shadow, -webkit-box-shadow, text-shadow, -webkit-text-shadow",
      transform: "transform, -webkit-transform",
      none: "none",
    };
    if (type === "property") {
      this.property = "transition-property";
      this.prefixes = ["webkit", "o"];
      for (let i in properties) {
        this.values[i] = properties[i];
      }
    }
  }
};
