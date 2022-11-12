import Function from "./function.js";

class Rgb extends Function{
    constructor() {
        super("rgb");
    }

    getString(tinycolor,str){
        let matches = this.findMatches(str);
        if(matches.length !== 0) {
            for(let i in matches) {
                let rawValue = matches[i][0];
                let value = matches[i][1].replace(/['"]+/g, "");
                str = str.replace(
                    rawValue,
                    tinycolor(`rgb(${value})`).toHexString()
                );
            }
        }


        return str;
    }
}

export default Rgb;