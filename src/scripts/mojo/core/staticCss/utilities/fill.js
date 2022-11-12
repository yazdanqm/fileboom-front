import Utility from "./utility.js";

export default class Fill extends Utility {
    constructor() {
        super();

        this.property = "fill";
        this.values = {
            'c-current': "currentColor",
            'c-inherit': "inherit",
            'c-initial': "initial",
        }

    }
}