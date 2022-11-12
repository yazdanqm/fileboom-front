import CssString from "./cssString.js";
import UtilityOptions from "./utilityOptions.js";
import DynamicCss from "../newDynamicCss/dynamicCss.js";

export default class CssCreator {
    constructor(args) {
        this.classObj = args.classObj;
        this.isExtend = args.isExtend;
        this.selector = args.selector;
        this.pseudo = args.pseudo;
        this.breakpoint = args.breakpoint;
        this.theme = args.theme;
        this.children = args.children;
        this.config = args.config;
        this.utilityTree = args.utilityTree;
        this.components = args.components;
        this.attribute = args.attribute;
        this.utilityPseudo = '';
        this.usedColors = args.usedColors;
        this.nonMojoClasses = args.nonMojoClasses;
    }

    create() {
        let className = this.classObj.className;
        let name = this.classObj.name;
        let value = this.classObj.value;
        let props = this.classObj.props;

        let body = undefined;

        /*
        let forceDynamic = [
          "pa",
          "pt",
          "pb",
          "pr",
          "pl",
          "px",
          "py",
          "ma",
          "mt",
          "mb",
          "ml",
          "mr",
          "mx",
          "my",
          "w",
          "h",
          "max",
          "min",
          "gap",
          "translate",
          "scale",
          "rotate",
          "ts",
          "z",
          "top",
          "right",
          "bottom",
          "left",
          "inset",
          "inset-x",
          "inset-y",
          "rounded",
          "rounded-top",
          "rounded-bottom",
          "rounded-right",
          "rounded-left",
          "rounded-top-r",
          "rounded-top-l",
          "rounded-bottom-r",
          "rounded-bottom-l",
          "opacity",
          "blur",
          "grayscale",
          "invert",
          "cols",
          "rows",
          "col",
          "c",
          "r",
        ];
        if (
          (suf.startsWith("(") && suf.endsWith(")")) ||
          (forceDynamic.includes(pre) &&
            !isNaN(suf.replace("-", "")) &&
            parseFloat(suf.replace("-", "")).toString() === suf.replace("-", "")) ||
          (pre === "text" &&
            mid.length < 1 &&
            !isNaN(suf.replace("-", "")) &&
            parseFloat(suf.replace("-", "")).toString() === suf.replace("-", "")) ||
          mid.includes("alpha")
        ) {
          try {
            let prename = pre;
            if (mid.length > 0) {
              prename = pre + "-" + mid;
            }

            body = new DynamicCss({
              name: prename,
              value: suf,
              config: this.config,
            }).getCss();
          } catch (ign) {
          }
        } else {
          //console.log(pre)
          let suffix = suf;
          if (mid.length > 0) {
            suffix = mid + "-" + suf;
          }

        }
        */

        if (this.classObj.body !== undefined) {
            body = this.classObj.body;
        } else if (props !== undefined) {
            body = new DynamicCss({
                ...this.classObj,
                config: this.config,
                usedColors: this.usedColors,
            }).getCss();
        } else {
            if (className.length > 0 && this.pseudo === "class") {
                this.nonMojoClasses.add(className);
            }
        }


        let css = "";
        if (body !== undefined) {
            //let CAN_CREATE_CSS = true;
            //let prefix = "";

            /*
            if (this.breakpoint !== undefined && this.breakpoint.length > 0) {
                let bpName = this.breakpoint;
                if (bpName.startsWith("i-")) {
                    bpName = this.breakpoint.substring(2);
                    prefix = "\\";
                }
                prefix += this.breakpoint + "\\:";

                if (this.config.base.breakpoints[bpName] === undefined) {
                    CAN_CREATE_CSS = false;
                }
            }
            if (this.theme !== undefined && this.theme.length > 0) {
                let ptn = this.theme;
                if (ptn === "default")
                    ptn = "default-theme";
                if (ptn === "i-default")
                    ptn = "i-default-theme";

                prefix = ptn + "\\:" + prefix;
                let theme = this.theme;
                if (theme.startsWith("i-"))
                    theme = theme.substring(2);

                if (this.config.base.themes[theme] === undefined) {
                    CAN_CREATE_CSS = false;
                }
            }

            if (this.children !== undefined && this.children.length > 0) {
                if (prefix.length > 0)
                    prefix += "\\:"
                prefix = prefix + this.children + "\\:";
            }
            */

            if (this.classObj.isImportant) {
                className = "\\!" + className;
                const bodySpl = body.split(";");
                for (let i in bodySpl) {
                    //if (!bodySpl[i].startsWith("--")) {
                    bodySpl[i] += " !important";
                    //}
                }
                body = bodySpl.join(";");
            }

            if (UtilityOptions[name] !== undefined && UtilityOptions[name].pseudo !== undefined) {
                this.utilityPseudo = UtilityOptions[name].pseudo;
            }

            if (!this.isExtend) {
                css = new CssString({
                    pseudo: this.pseudo,
                    className,
                    theme: this.theme,
                    isExtend: this.isExtend,
                    selector: this.selector,
                    children: this.children,
                    attribute: this.attribute,
                    body: body.toString().replace(/;/g, ";\n    "),
                    utilityPseudo: this.utilityPseudo
                }).getCss();
            } else css = body;


            if (css !== undefined && this.breakpoint !== undefined)
                css = css.replace(/\n/g, "\n    ");
        }
        return css;
    }
};
