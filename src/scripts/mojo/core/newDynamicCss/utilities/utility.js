export default class Utility {
    constructor(args) {
        this.args = args;
        if(!Array.isArray(this.args.props)){
            this.args.props = [this.args.props];
        }
    }

    toCss(prop,value,prepend = undefined,append = undefined) {
        let ret = `${prop}: ${value}`;
        if(prepend !== undefined){
            ret = prepend + ";" + ret;
        }
        if(append !== undefined){
            ret = ret + ";" + append;
        }
        return ret;
    }
}