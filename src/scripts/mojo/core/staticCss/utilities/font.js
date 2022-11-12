import Utility from "./utility.js";

export default class Font extends Utility {
    constructor(config) {
        super(config);
        this.property = "font-family";
        for (let i in this.config.base.fonts) {
            if(typeof this.config.base.fonts[i] === typeof "") {
                this.values[i] = this.config.base.fonts[i]
            } else {
                this.values[i] = '';
                let isFirst = true;
                for (let j in this.config.base.fonts[i]) {
                    if (isFirst)
                        isFirst = false;
                    else
                        this.values[i] += ","

                    if (!Array.isArray(this.config.base.fonts[i])) {
                        this.values[i] += j;
                    } else {
                        this.values[i] += this.config.base.fonts[i][j];
                    }
                }
            }
        }

    }
}