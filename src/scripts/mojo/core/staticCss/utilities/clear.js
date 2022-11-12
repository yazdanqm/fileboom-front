import Utility from "./utility.js";

export default class Clear extends Utility {
    constructor() {
        super();

        this.property = "clear";
        this.values = {
            left: "left",
            right: "right",
            both: "both"
        }
    }

}