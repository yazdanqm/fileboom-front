import Utility from "./utility.js";

export default class Backdrop extends Utility {
    constructor() {
        super();
        this.property = "backdrop-filter";
        this.prefixes = ["webkit"]
        this.values = {
            "blur-none": "blur(0)"
        }
        for(let i = 1; i <=5; i++) {
            this.values[`blur-${i}`] = `blur(${parseInt(i) * 5}px)`
        }
    }
}