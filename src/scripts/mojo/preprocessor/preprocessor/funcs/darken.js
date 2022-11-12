import Function from "./function.js";

class Darken extends Function{
    constructor() {
        super("darken");
    }

    getString(tinycolor, str){
        let matches = this.findMatches(str);
        if(matches.length !== 0) {
            for(let i in matches) {
                let rawValue = matches[i][0];

                let value = matches[i][1]
                    .replace(/ /g, "")
                    .replace(/['"]+/g, "")
                    .split(",");
                str = str.replace(
                    rawValue,
                    tinycolor(value[0]).darken(value[1])
                );
            }
        }

        return str;
    }
}

export default Darken;