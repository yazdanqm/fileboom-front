import Utility from "./utility.js";

export default class Appearance extends Utility {
    constructor() {
        super();
        this.property = "appearance";
        this.values = {
            none: "none",
            auto: "auto",
            "menulist-button": "menulist-button",
            "text-field": "text-field"
        }
    }
}