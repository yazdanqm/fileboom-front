import Function from "./function.js";

class TextSize extends Function{
    constructor(args) {
        super("text-size")
        this.config = args.config;
    }

    getString(str){
        let matches = this.findMatches(str);
        if(matches.length !== 0) {
            for(let i in matches) {
                let rawValue = matches[i][0];
                let value = matches[i][1].replace(/['"]+/g, "");
                str = str.replace(rawValue, this.config.base.textSize[value]);
            }
        }

        return str;
    }
}

export default TextSize;