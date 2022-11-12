import Utility from "./utility.js";

export default class Grid extends Utility {
  constructor(config, type) {
    super(config);
    const GRID_COUNT = 24;

    if (type === "cols") {
      this.property = "grid-template-columns";
      this.values["auto"] = "repeat(auto-fit, minmax(0, 1fr))";
      for (let i = 1; i <= GRID_COUNT; i++) {
        this.values[i] = `repeat(${i}, minmax(0, 1fr))`;
      }
    }
    if (type === "rows") {
      this.property = "grid-template-rows";
      for (let i = 1; i <= GRID_COUNT; i++) {
        this.values[i] = `repeat(${i}, minmax(0, 1fr))`;
      }
    }
    if (type === "col") {
      this.property = "grid-column";
      this.values["auto"] = "auto";
      for (let i = 1; i <= GRID_COUNT; i++) {
        this.values[i] = `auto / span ${i}`;
      }
    }
    if (type === "offset") {
      // Col Offset
      this.property = "grid-column-start";
      this.values["offset-auto"] = "auto";
      for (let i = 1; i <= GRID_COUNT - 1; i++) {
        this.values["offset-" + i] = i + 1;
      }
    }
    if (type === "c-span") {
      // c-span
      this.property = "grid-column";
      for (let i = 1; i <= GRID_COUNT; i++) {
        this.values["span-" + i] = `auto / span ${i}`;
      }
    }
    if (type === "c-start") {
      // c-start
      this.property = "grid-column-start";
      this.values["start-auto"] = "auto";
      for (let i = 1; i <= GRID_COUNT + 1; i++) {
        this.values["start-" + i] = i;
      }
    }
    if (type === "c-end") {
      // c-end
      this.property = "grid-column-end";
      this.values["end-auto"] = "auto";
      for (let i = 1; i <= GRID_COUNT + 1; i++) {
        this.values["end-" + i] = i;
      }
    }
    if (type === "r-span") {
      // r-span
      this.property = "grid-row";
      for (let i = 1; i <= GRID_COUNT; i++) {
        this.values["span-" + i] = `auto / span ${i}`;
      }
    }
    if (type === "r-start") {
      // r-start
      this.property = "grid-row-start";
      this.values["start-auto"] = "auto";
      for (let i = 1; i <= GRID_COUNT + 1; i++) {
        this.values["start-" + i] = i;
      }
    }
    if (type === "r-end") {
      // r-end
      this.property = "grid-row-end";
      this.values["end-auto"] = "auto";
      for (let i = 1; i <= GRID_COUNT + 1; i++) {
        this.values["end-" + i] = i;
      }
    }
  }
};
