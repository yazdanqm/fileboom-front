import Statics from "../utils/statics.js";
//import AtFinder from "./atFinder.js";
//const SysFunctions = require("./sysFunctions");

class CreateCSS {
    constructor(args) {
        //this.sysFunctions = new SysFunctions(args);
    }

    createCssSting(array, parents = "") {
        let css = "";
        for (let i in array) {
            const value = array[i].valueArr.join(";");
            const childs = array[i].childs;

            if (array[i].selector.startsWith("@")) {
                let currentCss = "",
                    childCss = "";
                if (parents.length > 0) {
                    if (value.length > 0) {
                        currentCss = toCss(parents, value);
                    }
                }
                if (childs !== undefined) {
                    childCss = this.createCssSting(childs, parents);
                }
                if ((currentCss + childCss).length > 0) {
                    css += array[i].selector + " {\n    ";
                    css += currentCss.replace(/\n/g, "\n    ");
                    css += childCss.replace(/\n/g, "\n    ");
                    css = css.substring(0, css.length - 4);
                    css += "}\n";
                }
            } else if (
                array[i].selector.includes("[m-theme")
            ) {
                let parentSpl = parents.split(",");
                let selectors = [];
                for (let j in parentSpl) {
                    selectors.push(array[i].selector + " " + parentSpl[j]);
                }

                let selector = selectors.join(", ").replace(/ &/g, "");

                if (value.length > 0) css += toCss(selector, value);
                if (childs !== undefined) {
                    css += this.createCssSting(childs, selector);
                }
            } else {
                let parentSpl = parents.split(",");
                let currentSpl = array[i].selector.split(",");
                let selectors = [];

                for (let j in parentSpl) {
                    //spl[i] = parentSplS + " " + spl[i];
                    for (let k in currentSpl) {
                        if (currentSpl[k].startsWith("<")) {
                            let p = parentSpl[j].split(" ");
                            let tmp = p.pop();
                            p.push(Statics.fixString(currentSpl[k]).substring(1));
                            p.push(tmp);
                            selectors.push(p.join(" "));
                        } else {
                            selectors.push(
                                Statics.fixString(parentSpl[j]) +
                                " " +
                                Statics.fixString(currentSpl[k])
                            );
                        }
                    }
                }

                let selector = selectors.join(", ").replace(/ &/g, "");

                while (selector.startsWith(" ")){
                    selector = selector.substring(1)
                }

                if (value.length > 0)
                    css += toCss(selector, value);

                if (childs !== undefined) {
                    css += this.createCssSting(childs, selector);
                }
            }
        }

        function toCss(selector, value) {
            let val = value.replace(/;(?=(?:(?:[^"]*"){2})*[^"]*$)(?=(?:(?:[^']*'){2})*[^']*$)/g, ";\n    ");
            return `${selector} {\n    ${val}\n}\n`;
        }

        /*
        let raw = css;
        if (raw != undefined) {
          css = css.replace(raw, this.sysFunctions.compile(css));
        }
        */

        return css;
    }
}

export default CreateCSS;
