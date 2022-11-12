import Utility from "./utility.js";

export default class Placeholder extends Utility {
    constructor() {
        super();

        this.property = "color";
        this.values = {
            white: "white",
            black: "black"
        }
    }

}