import Utility from "./utility.js";

export default class Float extends Utility {
    constructor() {
        super();
        this.property = "float";
        this.values = {
            left: "left",
            right: "right",
            none: "none"
        }
    }
}