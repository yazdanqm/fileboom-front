import Function from "./function.js";

class Hsl extends Function{
    constructor() {
        super("hsl");
    }
    getString(tinycolor,str){
        let matches = this.findMatches(str);
        if(matches.length > 0) {
            for(let i in matches) {
                let rawValue = matches[i][0];
                let value = matches[i][1].replace(/['"]+/g, "").replace(/°/g,"").replace(/%/g,"");
                str = str.replace(
                    rawValue,
                    tinycolor(`hsl(${value})`).toHexString()
                );
            }
        }

        return str;
    }
}

export default Hsl;