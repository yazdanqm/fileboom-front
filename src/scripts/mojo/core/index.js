import CssCreator from './utils/cssCreator.js';
import Init from './staticCss/init/init.js';
import Root from './staticCss/init/root.js';
//import UtilityTree from './utils/utilityTree.js';
import Components from './utils/components.js';
import CssString from "./utils/cssString.js";
import SplitClassName from './utils/classNames.js';

class CssModule {
    init(args = {}) {
        this.args = args;

        if (this.args.isExtend === undefined)
            this.args.isExtend = false;

        if (this.args.theme === "default-theme")
            this.args.theme = "default";

        if (this.args.theme === "i-default-theme")
            this.args.theme = "i-default";

        return this;
    }

    setConfig(config) {
        this.config = config;
        this.initStyles = new Init(config).getCss();
        //this.utilityTree = UtilityTree(config);
        //this.componentTree = Components.components;
        this.Components = Components;
        if (this.usedColors === undefined) {
            this.usedColors = {};
            this.usedColors['body'] = new Set();
            this.usedColors['body'].add(0);
            this.usedColors['invert'] = new Set();
            this.usedColors['invert'].add(0);
        }

        if (this.userUtilities === undefined)
            this.userUtilities = {};

        if (this.nonMojoClasses === undefined)
            this.nonMojoClasses = new Set();

        if (this.componentList === undefined)
            this.componentList = new Set();

        return this;
    }

    addUtility(name, props, isStatic = true) {
        this.userUtilities[name] = {
            props,
            isStatic,
        }
        /*
        if (this.utilityTree === undefined) {
            throw new Error("Config was not set");
        } else {
            const nameSpl = name.split('-');
            const pre = nameSpl.shift();
            let utl = nameSpl.join("-");
            if (utl.length < 1 || utl === "-") {
                utl = pre;
            }
            if(this.utilityTree[pre] === undefined)
                this.utilityTree[pre] = {};
            this.utilityTree[pre][utl] = body;
        }
         */
    }

    addComponent(tree) {
        Components.add(tree);
    }

    addPseudo(name, obj) {
        if (CssString.pseudos[name] === undefined) {
            CssString.pseudos[name] = obj;
        }
    }

    getInitStyles() {
        if (this.initStyles === undefined)
            return '';
        else
            return this.initStyles;
    }

    getRootStyles() {
        return new Root(this.config, this.usedColors).getCss();
    }

    getPseudos() {
        return Object.keys(CssString.pseudos);
    }

    getStyles() {
        let CSS = "";
        const t1 = Date.now();

        if (!this.args.isExtend)
            for (let i in this.args.classes) {
                const classObj = new SplitClassName(this.args.classes[i], this.userUtilities);
                CSS += new CssCreator({
                    classObj,
                    //utilityTree: this.utilityTree,
                    components: Components,
                    config: this.config,
                    isExtend: this.args.isExtend,
                    pseudo: this.args.pseudo,
                    theme: this.args.theme,
                    children: this.args.children,
                    breakpoint: this.args.breakpoint,
                    usedColors: this.usedColors,
                    attribute: this.args.attribute,
                    nonMojoClasses: this.nonMojoClasses
                }).create();
            }
        else {
            let body = "", first = true, CAN_CREATE_CSS = true;
            for (let i in this.args.classes) {
                if (!first) body += ";";
                const classObj = new SplitClassName(this.args.classes[i], this.userUtilities);
                if(classObj.body === undefined)
                    classObj.body = this.args.body;

                body += new CssCreator({
                    classObj,
                    //utilityTree: this.utilityTree,
                    components: Components,
                    config: this.config,
                    isExtend: this.args.isExtend,
                    selector: this.args.selector,
                    pseudo: this.args.pseudo,
                    theme: this.args.theme,
                    children: this.args.children,
                    breakpoint: this.args.breakpoint,
                    usedColors: this.usedColors,
                    attribute: this.args.attribute,
                    nonMojoClasses: this.nonMojoClasses
                }).create();

                if (first && body.length > 0)
                    first = false;
            }
            if (body.length > 0) {
                CSS = new CssString({
                    pseudo: this.args.pseudo,
                    className: this.args.selector,
                    theme: this.args.theme,
                    isExtend: this.args.isExtend,
                    children: this.args.children,
                    body: body.toString().replace(/;/g, ";\n    "),
                }).getCss();
                if (this.args.breakpoint !== undefined)
                    CSS = CSS.replace(/\n/g, "\n    ");
            }
        }

        let bpName = this.args.breakpoint;
        let invert = false;
        if (bpName !== undefined && CSS.length > 0) {
            if (bpName.startsWith("i-")) {
                bpName = bpName.substring(2);
                invert = true;
            }
            const bp = Object.create(this.config.base.breakpoints[bpName]);
            if (invert) {
                const min = bp.min;
                bp.min = bp.max;
                bp.max = min;
            }

            if (parseInt(bp.max) < parseInt(bp.min)) {
                const CSS1 = getBpCss({min: bp.min}, this.args.pseudo, CSS);
                let CSS2 = "";
                if (parseInt(bp.max) > 0) {
                    CSS2 = getBpCss({max: bp.max}, this.args.pseudo, CSS);
                }
                CSS = CSS1 + CSS2;
            } else {
                CSS = getBpCss(bp, this.args.pseudo, CSS);
            }

            function getBpCss(bp, pseudo, css) {
                function getQuery(name, value) {
                    let v = parseFloat(value);
                    let suf = value.replace(v, "");
                    if (name === "max")
                        v = v - 0.02;
                    return `(${name}-width: ${v}${suf}) `;
                }

                let bpCss = "@media ";
                if (pseudo !== "print")
                    bpCss += "only screen and ";
                if (bp.min !== undefined)
                    bpCss += getQuery('min', bp.min);
                if (bp.max !== undefined) {
                    if (bp.min !== undefined) {
                        bpCss += "and ";
                    }
                    bpCss += getQuery('max', bp.max);
                }
                return bpCss + "{\n    " + css.substring(0, css.length - 4) + "}\n"
            }
        }
        const t2 = Date.now();

        return {
            css: CSS,
            time: t2 - t1
        };
    }
}

const cssModule = new CssModule();
export default cssModule;

