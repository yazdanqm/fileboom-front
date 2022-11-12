import Function from "./function.js";

class Lighten extends Function{
    constructor() {
        super("lighten");
    }

    getString(tinycolor,str){
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
                    tinycolor(value[0]).lighten(value[1])
                );
            }
        }

        return str;
    }
}

export default Lighten;