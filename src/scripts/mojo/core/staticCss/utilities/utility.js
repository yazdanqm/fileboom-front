export default class Utility {
    constructor(config = {}) {
        this.config = config;
        this.values = {};
        this.property = "";
        this.prefixes = [];
        this.appends = {};
        this.prepends = {};
    }

    getTree() {
        function toCss(property, value, prefixes, prepend, append) {
            let css = '';
            if (prepend !== undefined) {
                css += prepend + ';';
            }
            if(Array.isArray(property)){
                let isFirst = true;
                for(let i in property){
                    if(isFirst)
                        isFirst = false;
                    else
                        css += ';';

                    css += `${property[i]}: ${value}`;
                }
            } else {
                css += `${property}: ${value}`;
            }
            for (let i in prefixes) {
                css += `;-${prefixes[i]}-${property}: ${value}`;
            }
            if (append !== undefined) {
                css += ';' + append;
            }
            return css;
        }

        const ret = {}
        for (let i in this.values) {
            ret[i] = toCss(this.property,
                this.values[i],
                this.prefixes,
                this.prepends[i],
                this.appends[i]
            );
        }
        return ret;
    }
}