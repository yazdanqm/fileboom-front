import Utility from "./utility.js";

export default class Shadow extends Utility {
  constructor(config, type) {
    super(config);

    if (type === "shadow") {
      this.property = "box-shadow";
      this.prefixes = ["webkit"];
      this.values = {
        1: "0 1px 1px rgba(var(--m-shadow-color), var(--m-shadow-alpha)),0 2px 2px rgba(var(--m-shadow-color), var(--m-shadow-alpha))",
        2: "0 1px 1px rgba(var(--m-shadow-color), var(--m-shadow-alpha)),0 2px 2px rgba(var(--m-shadow-color), var(--m-shadow-alpha)),0 4px 4px rgba(var(--m-shadow-color), var(--m-shadow-alpha))",
        3: "0 1px 1px rgba(var(--m-shadow-color), var(--m-shadow-alpha)),0 2px 2px rgba(var(--m-shadow-color), var(--m-shadow-alpha)),0 4px 4px rgba(var(--m-shadow-color), var(--m-shadow-alpha)),0 8px 8px rgba(var(--m-shadow-color), var(--m-shadow-alpha))",
        4: "0 1px 1px rgba(var(--m-shadow-color), var(--m-shadow-alpha)),0 2px 2px rgba(var(--m-shadow-color), var(--m-shadow-alpha)),0 4px 4px rgba(var(--m-shadow-color), var(--m-shadow-alpha)),0 8px 8px rgba(var(--m-shadow-color), var(--m-shadow-alpha)),0 16px 16px rgba(var(--m-shadow-color), var(--m-shadow-alpha))",
        5: "0 1px 1px rgba(var(--m-shadow-color), var(--m-shadow-alpha)),0 2px 2px rgba(var(--m-shadow-color), var(--m-shadow-alpha)),0 4px 4px rgba(var(--m-shadow-color), var(--m-shadow-alpha)),0 8px 8px rgba(var(--m-shadow-color), var(--m-shadow-alpha)),0 16px 16px rgba(var(--m-shadow-color), var(--m-shadow-alpha)),0 32px 32px rgba(var(--m-shadow-color), var(--m-shadow-alpha))",
      };
      for (let i = 1; i <= 5; i++) {
        this.prepends[i] = `--m-shadow-color: 0, 0, 0;`;
        this.prepends[i] += `--m-shadow-alpha: 0.05`;
      }
    }
    if (type === "shadow-soft") {
      this.property = "box-shadow";
      this.prefixes = ["webkit"];
      for (let i = 1; i <= 5; i++) {
        this.values["soft-" + i] = `0 0 ${i * 8}px ${
          i * 1
        }px rgba(var(--m-shadow-color), var(--m-shadow-alpha))`;
        this.prepends["soft-" + i] = `--m-shadow-color: 0, 0, 0;`;
        this.prepends["soft-" + i] += `--m-shadow-alpha: 0.07`;
      }
    }
    if (type === "shadow-solid") {
      this.property = "box-shadow";
      this.prefixes = ["webkit"];
      for (let i = 0; i <= 10; i++) {
        this.values["solid-" + i] = `0 0 0 ${
          i * 1
        }px rgba(var(--m-shadow-color), var(--m-shadow-alpha))`;
        this.prepends["solid-" + i] = `--m-shadow-color: 0, 0, 0;`;
        this.prepends["solid-" + i] += `--m-shadow-alpha: 1`;
      }
    }
  }
};
