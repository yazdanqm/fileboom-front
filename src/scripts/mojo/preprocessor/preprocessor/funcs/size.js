import Function from "./function.js";

class Size extends Function{
    constructor(args) {
        super("size")
        this.config = args.config;
    }

    getString(str){
        let matches = this.findMatches(str)
        if(matches.length !== 0) {
            for(let i in matches) {
                let rawValue = matches[i][0];
                let value = matches[i][1].replace(/['"]+/g, "");
                str = str.replace(rawValue, this.config.base.sizing[value]);
            }
        }

        return str;
    }
}

export default Size;