import Utility from "./utility.js";

export default class Cursor extends Utility {
    constructor() {
        super();
        this.property = "cursor";
        this.values = {
            default: "default",
            auto: "auto",
            pointer: "pointer",
            wait: "wait",
            text: "text",
            move: "move",
            'not-allowed': "not-allowed",
        }
    }
}