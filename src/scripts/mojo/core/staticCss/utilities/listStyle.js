import Utility from "./utility.js";

export default class ListStyle extends Utility {
    constructor() {
        super();
        this.property = "list-style-type";
        this.values = {
            "style-none": "none",
            "style-disc": "disc",
            "style-circle": "circle",
            "style-decimal": "decimal",
        }
    }
}