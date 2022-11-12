export default class Component {
    constructor(config = {}) {
        this.config = config;
        this.properties = {};
    }

    getCSS() {
        function toCss(property, value) {
            return `${property}: ${value}`;
        }

        let ret = "";
        let isFirst = true;
        for (let i in this.properties) {
            if(isFirst)
                isFirst = false;
            else
                ret += ";";
            ret += toCss(i,this.properties[i]);
        }
        return ret;
    }
}