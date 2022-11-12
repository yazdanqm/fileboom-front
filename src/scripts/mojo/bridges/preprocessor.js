import DownloadStyles from "../preprocessor/utils/downloadStyles.js";
import CreateTree from "../preprocessor/preprocessor/createTree.js";
import Process from "../preprocessor/preprocessor/process.js";
import CreateCSS from "../preprocessor/preprocessor/createCSS.js";
import XRegExp from "../lib/xregexp.js";
import Tinycolor from "../lib/tinycolor.js";

class ProcessorModule {
    init(args = {}) {
        this.mainFile = args.mainFile;
        this.config = args.config;
        this.cssModule = args.cssModule;

        return this;
    }

    compile(extend = "") {
        let styles = "";
        if (this.mainFile !== undefined)
            styles += new DownloadStyles(this.mainFile).getStyles();

        styles += extend;
        let t1 = Date.now();
        let stylesTree = new CreateTree(styles);
        let processedStyles = new Process({
            config: this.config,
            cssModule: this.cssModule,
            tinycolor: Tinycolor,
        }).process(stylesTree);
        styles = new CreateCSS({
            config: this.config,
            cssModule: this.cssModule,
        }).createCssSting(processedStyles);
        let t2 = Date.now();

        return {
            css: styles,
            time: t2 - t1,
        };
    }
}

const processorModule = new ProcessorModule();


const cyrb53 = function (str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed,
        h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 =
        Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
        Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 =
        Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
        Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

let styles = {}, initialed = false;

function init() {
    if (initialed === false) {
        window.mojoPreprocessor = {
            CreateTree,
            CreateCSS,
        };
        initialed = true;
    }
}

export default function p(url = undefined, core ) {
    init();

    processorModule.init({
        config: core.cssModule.config,
        cssModule: core.cssModule,

    });

    let css = "";
    if (Array.isArray(url)) {
        for (let i in url) {
            processorModule.mainFile = url[i];
            let style = processorModule.compile().css;
            styles[cyrb53(style)] = style;
        }
    } else if (url !== undefined) {
        processorModule.mainFile = url;
        let style = processorModule.compile().css;
        styles[cyrb53(style)] = style;
    }

    document.querySelectorAll("style").forEach(function (node) {
        if (!node.hasAttribute("mojo-auto-generated"))
            if (
                node.hasAttribute("type") &&
                node.getAttribute("type") === "text/mojo"
            ) {
                processorModule.mainFile = undefined;
                if (node.innerHTML !== "") {
                    let style = processorModule.compile(node.innerHTML).css;
                    styles[cyrb53(style)] = style;
                }
            } else {
                let str = node.innerHTML;
                if (str != null && str.length > 0 && str.includes("@mojo")) {
                    str.replace(/ {/g, "");
                    let array = [];
                    try {
                        array = XRegExp.matchRecursive(str, "{", "}", "g", {
                            valueNames: ["selector", null, "content", null],
                            escapeChar: "\\",
                        });
                    } catch (ignore) {
                      console.log(ignore)
                    }

                    for (let i = 0; i < array.length - 1; i = i + 2) {
                        let selector = array[i].value;
                        if (selector.includes("@mojo")) {
                            let input = array[i + 1].value;
                            let style = processorModule.compile(input).css;
                            styles[cyrb53(style)] = style;
                        }
                    }
                }
            }
    });

    for (let i in styles) {
        css += styles[i];
    }

    let cmp = intersection(
        core.cssModule.componentList,
        core.cssModule.nonMojoClasses
    );

    function intersection(setA, setB) {
        let _intersection = new Set();
        for (let elem of setB) {
            if (setA.has(elem)) {
                _intersection.add(elem);
            }
        }
        return _intersection;
    }
    function getComponents() {
        for (let component of [...cmp]) {
            if (core.cssModule.Components.getCSS(component) === false) {
                setTimeout(getComponents, 1);
                return;
            }
            let css = processorModule.compile(
                core.cssModule.Components.getCSS(component)
            ).css;
            core.addStyles(css)
        }
    }
    getComponents();

    return css;
}

/*
if (window !== undefined) {
    window.mojoLoader = m;
}
 */
