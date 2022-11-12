import Function from "./function.js";

class Color extends Function{
    constructor(args) {
        super("color");
        this.colors = args.colors;
    }

    getString(str) {
        let matches = this.findMatches(str);
        if (matches.length > 0) {
            for (let i in matches) {
                let rawValue = matches[i][0];
                let value = matches[i][1].replace(/['"\[\]]+/g, "");
                if (value.includes(",")) {
                    let values = value.replace(/ /g, "").split(",");

                    let theme = values[0];
                    let color = values[1];
                    if (
                        this.colors.colorsExact[theme] !== undefined &&
                        this.colors.colorsExact[theme][color] !== undefined
                    ) {
                        str = str.replace(rawValue, this.colors.colorsExact[theme][color]);
                    }
                } else {
                    if (this.colors.colors[value] !== undefined)
                        str = str.replace(rawValue, this.colors.colors[value]);
                }
            }
        }

        return str;
    }
}

export default Color;
