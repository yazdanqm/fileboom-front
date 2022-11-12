import Config from "./mojo.config.js";
import CssModule from "../core/index.js";
import ExtensionLoader from "../core/utils/extensionLoader.js";
import Compile from "./core/compile.js";
import MergeConfig from "./core/mergeConfig.js";
//import Preprocessor from "./preprocessor.js"

let head, style, timeout, initialed = false, config = Config , cssModule;
let currentCss = {
    init: "",
    utilities: "",
    patterns: "",
    transitions: "",
}

function addStyles(cssCode, append = true) {
    if (!append) {
        head.removeChild(style);
        style.textContent = "";
    }
    style.textContent += cssCode;

    if (!append) {
        head.appendChild(style);
    }


    if (cssCode.includes("-mojo-delay-")) {
        if(timeout !== undefined)
          clearTimeout(timeout);

        timeout = setTimeout(function () {
            style.textContent = style.textContent.replace(/-mojo-delay-/g, "");
        }, 30);
    }
    //style.appendChild(document.createTextNode(cssCode));
}

function init() {
    if (!initialed) {
        let current_url = window.location.href;

        head = document.head || document.getElementsByTagName("head")[0];
        style = document.createElement("style");
        style.setAttribute("type", "text/css");
        style.setAttribute("mojo-auto-generated", "");
        head.appendChild(style);

        const observeCallback = function (mutationsList) {
            mutationsList.forEach((mutation, index) => {
                if (index === 0) {
                    let is_not_ignored = true;
                    let node = mutation.target;
                    if (node == null || node.hasAttribute("m-ignore-observe") || node.hasAttribute("mojo-auto-generated")) {
                        is_not_ignored = false;
                    }

                    while (node !== null) {
                        if (
                            node.hasAttribute("m-ignore-observe") &&
                            node.getAttribute("m-ignore-observe") === "children"
                        ) {
                            is_not_ignored = false;
                            break;
                        }
                        node = node.parentElement;
                    }


                    if (is_not_ignored) {
                        if (window.location.href === current_url) {
                          m();
                        } else {
                            current_url = window.location.href;
                        }
                    }
                }
            });
        };

        let observer = new MutationObserver(observeCallback);
        document.querySelectorAll("body").forEach(function (target) {
            observer.observe(target, {
                attributes: true,
                subtree: true,
                childList: true,
            });
        });


        const observe2Callback = function (mutationsList) {
            mutationsList.forEach((mutation, index) => {
                if (index === 0) {
                    document.querySelectorAll("head style").forEach(function (target) {
                        if(target.hasMutationObserver !== true && !target.hasAttribute("mojo-auto-generated")) {
                            observer.observe(target, {
                                attributes: true,
                                subtree: true,
                                childList: true,
                            });
                            target.hasMutationObserver = true;
                        }
                    });
                }
            });
        }

        let observer2 = new MutationObserver(observe2Callback);
        observer2.observe(document.head, {
            attributes: true,
            subtree: true,
            childList: false,
        });

        initialed = true;
    }
}


function getScriptPath(foo){ return window.URL.createObjectURL(new Blob([foo.toString().match(/^\s*function\s*\(\s*\)\s*\{(([\s\S](?!\}$))*[\s\S])/)[1]],{type:'text/javascript'})); }

export default function m(cnf = undefined, urls = undefined) {
    let first = false;
    if (!initialed) {
        first = true;
    }
    init();
    config = new MergeConfig(config, cnf);

    if (
        config.options.darkMode.enabled === true &&
        window !== undefined &&
        window.matchMedia !== undefined
    ) {
        let matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
        let targetNode = document.documentElement;
        if (matchMedia !== undefined) {
            if (matchMedia.matches) {
                targetNode.setAttribute("m-theme", config.options.darkMode.theme);
            }

            matchMedia.addEventListener("change", (e) => {
                if (e.matches) {
                    targetNode.setAttribute("m-theme", config.options.darkMode.theme);
                } else {
                    targetNode.removeAttribute("m-theme");
                }
            });
        }
    }

    /*
    document.querySelectorAll("[m-theme]").forEach(function (el) {
        el.setAttribute("m-ignore-observe", "");
    });
    */

    cssModule = CssModule.init().setConfig(config);
    new ExtensionLoader(config, cssModule);
    if (config.utilities !== undefined) {
        for (let i in config.utilities) {
            cssModule.addUtility(i, config.utilities[i]);
        }
    }


    let compile = new Compile(cssModule);

    currentCss.patterns = compile.getPatterns();
    if(!first && cnf !== undefined && cnf.patterns !== undefined && cnf.base === undefined && cnf.extensions === undefined){
        setStyles(cssModule);
      //console.log("mojo compile for patterns")
        return;
    }
  //console.log("mojo compile full")

    currentCss.init = cssModule.getInitStyles();

    let c = compile.compile();
    currentCss.utilities = c.css;
    currentCss.transitions = c.ts;
    setStyles(cssModule);


  //let pc = Preprocessor(urls, {cssModule, addStyles: addStyles})
    //addStyles(pcss + c.css, false);
/*
    setTimeout(function () {
        addStyles(c.ts, true);
    }, 30);
 */

}

function setStyles(cssModule){
    addStyles(currentCss.init + cssModule.getRootStyles() + currentCss.patterns + currentCss.utilities, false);
    if(currentCss.transitions.length > 0){
        setTimeout(function () {
            addStyles(currentCss.transitions, true);
        }, 30);
    }
}

function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function (){
    if (!initialed && document !== undefined) {
        m();
    }
})
