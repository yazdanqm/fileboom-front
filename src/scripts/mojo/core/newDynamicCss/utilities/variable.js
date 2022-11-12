import Utility from "./utility.js";

export default class Variable extends Utility{
    getCSS(){
        let props = this.args.props;
        let value = this.args.value;

        let css = "",isFirst = true;

        for(let i in props){
            if(isFirst)
                isFirst = false;
            else
                css += ";"
            css += this.toCss(props[i],`var(${value})`);
        }

        return css;
    }
}