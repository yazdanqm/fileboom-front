import Utility from "./utility.js";

export default class Sizes extends Utility {
  constructor(props, prepend = "", config) {
    super(config);
    this.property = props;
    this.values = {};
    this.values[`${prepend}auto`] = "auto";
    this.values[`${prepend}1fifth`] = "20%";
    this.values[`${prepend}2fifth`] = "40%";
    this.values[`${prepend}3fifth`] = "60%";
    this.values[`${prepend}4fifth`] = "80%";
    this.values[`${prepend}1fourth`] = "25%";
    this.values[`${prepend}3fourth`] = "75%";
    this.values[`${prepend}1third`] = "33%";
    this.values[`${prepend}2third`] = "66%";
    this.values[`${prepend}half`] = "50%";
    this.values[`${prepend}full`] = "100%";
    this.values[`${prepend}fullvw`] = "100vw";
    this.values[`${prepend}fullvh`] = "100vh";
    if (config !== undefined) {
      let container = config.base.container;
      for (let bp in container) {
        if (bp !== "default" && container[bp].maxWidth !== undefined)
          this.values[prepend + bp] = `${container[bp].maxWidth}`;
      }
    }
  }
};
