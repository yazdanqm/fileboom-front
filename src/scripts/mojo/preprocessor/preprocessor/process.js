import AtFinder from "./atFinder.js";
import DefineColors from "../utils/defineColors.js";
import Color from "./funcs/color.js";
import Rgb from "./funcs/rgb.js";
import Hsl from "./funcs/hsl.js";
import Lighten from "./funcs/lighten.js";
import Darken from "./funcs/darken.js";
import Size from "./funcs/size.js";
import TextSize from "./funcs/text-size.js";

class Process {
    constructor(args) {
        this.config = args.config;
        this.cssModule = args.cssModule;
        this.tinycolor = args.tinycolor;
        this.atFinder = new AtFinder(args);
        this.delayProperties = ["transition"]
    }

    process(tree,parentsData = {}) {
        let pData = {};

        for (let i = 0; i < tree.length; i++) {
            let node = tree[i];

            for (let j = 0; j < node.valueArr.length; j++) {
                if (node.valueArr[j] !== undefined && node.valueArr[j].includes("color(")) {
                    // only first time
                    if (this.colors === undefined)
                        this.colors = new DefineColors(this.config).getColors(this.tinycolor);
                    if (this.colorFunc === undefined)
                        this.colorFunc = new Color({colors: this.colors});
                    ///
                    node.valueArr[j] = this.colorFunc.getString(node.valueArr[j]);
                }

                if (node.valueArr[j] !== undefined && node.valueArr[j].includes("rgb(")) {
                    node.valueArr[j] = new Rgb().getString(node.valueArr[j]);
                }

                if (node.valueArr[j] !== undefined && node.valueArr[j].includes("hsl(")) {
                    node.valueArr[j] = new Hsl().getString(this.tinycolor,node.valueArr[j]);
                }

                if (node.valueArr[j] !== undefined && node.valueArr[j].includes("lighten(")) {
                    node.valueArr[j] = new Lighten().getString(this.tinycolor,node.valueArr[j]);
                }

                if (node.valueArr[j] !== undefined && node.valueArr[j].includes("darken(")) {
                    node.valueArr[j] = new Darken().getString(this.tinycolor,node.valueArr[j]);
                }

                if (node.valueArr[j] !== undefined && node.valueArr[j].includes("text-size(")) {
                    node.valueArr[j] = new TextSize({config: this.config}).getString(node.valueArr[j]);
                }

                if (node.valueArr[j] !== undefined && node.valueArr[j].includes("size(")) {
                    node.valueArr[j] = new Size({config: this.config}).getString(node.valueArr[j]);
                }

                if (node.valueArr[j] !== undefined && node.valueArr[j].startsWith("@")) {
                    let atProps = this.atFinder.getAtProps(node.valueArr[j]);

                    if (Array.isArray(atProps)) {
                        if (typeof atProps[0] === typeof "") {
                            delete node.valueArr[j];

                            for (let s = atProps.length - 1; s >= 0; s--) {
                                node.valueArr.splice(j, 0, atProps[s]);
                            }
                        } else {
                            delete node.valueArr[j];
                            if (node.childs === undefined) node.childs = [];

                            node.childs = [...node.childs, ...atProps];
                        }
                    } else {
                        delete node.valueArr[j];
                        if (node.childs === undefined) node.childs = [];

                        node.childs.push(atProps);
                    }
                }
            }
            node.valueArr = node.valueArr.filter((e) => e);

            let isComponent = false;
            if (node.selector.startsWith("@")) {
                let atNames = this.atFinder.getAtSelector(node.selector);
                node.selector = atNames[0];
                atNames.shift();

                if (atNames.length > 0) {
                    for (let j in atNames) {
                        let obj = {};
                        for (let k in tree[i])
                            obj[k] = tree[i][k];

                        obj.selector = atNames[j];

                        if (obj.childs !== undefined) obj.childs = this.process(obj.childs);

                        for (let k = tree.length - 1; k >= i; k--) {
                            tree[k + 1] = tree[k];
                        }
                        tree[j] = obj;
                    }
                }


                if(node.selector.startsWith("@utility")) {
                    pData.isUtility = true;
                    node.isUtility = node.selector !== "@utility";
                }

                if(node.selector.startsWith("@component")) {
                    isComponent = true;
                }
            }

            for(let i in node.valueArr){
                for(let j in this.delayProperties){
                    if(typeof node.valueArr[i] === typeof "" && node.valueArr[i].includes(this.delayProperties[j])) {
                        node.valueArr[i] = "-mojo-delay-" + node.valueArr[i];
                    }
                }
            }

            if (node.childs !== undefined) {
                node.childs = this.process(node.childs, pData);
            }

            if(parentsData.isUtility === true || node.isUtility === true) {
                this.atFinder.setAtUtility(node);
            }

            if(isComponent) {
                if(node.selector !== "@component"){
                    node.selector = node.selector.substring(11);
                    this.atFinder.setAtComponent(node);
                } else {
                    for (let i in node.childs)
                        this.atFinder.setAtComponent(node.childs[i]);
                }
            }
            if(pData.isUtility || isComponent) {
                delete tree[i];
            }

            pData = {}
        }

        return tree;
    }
}

export default Process;
