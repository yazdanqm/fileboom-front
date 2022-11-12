import DownloadStyles from "../preprocessor/utils/downloadStyles.js";
import CreateTree from "../preprocessor/preprocessor/createTree.js";
import Process from "../preprocessor/preprocessor/process.js";
import CreateCSS from "../preprocessor/preprocessor/createCSS.js";
import XRegExp from "../lib/xregexp.js";

class ProcessorModule {
  init(args = {}) {
    this.mainFile = args.mainFile;
    this.config = args.config;
    this.cssModule = args.cssModule;
    this.tinycolor = args.tinycolor;

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
      tinycolor: this.tinycolor,
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
let initialed = false;
let mojoCore;
let compiledStyles;

function init() {
  if (initialed === false) {
    window.mojoPreprocessor = {
      CreateTree,
      CreateCSS,
    };

    initialed = true;
    let current_url = window.location.href;
    let can_observer = true;
    mojoCore.styles = {};

    mojoCore.observer.disconnect();
    mojoCore.observer = undefined;

    const observeCallback = function (mutationsList) {
      mutationsList.forEach((mutation, index) => {
        if (index === 0) {
          let is_ignored = false;
          let node = mutation.target;
          if (node.hasAttribute("m-ignore-observe")) {
            is_ignored = true;
          }
          while (node !== null) {
            if (
              node.hasAttribute("m-ignore-observe") &&
              node.getAttribute("m-ignore-observe") === "children"
            ) {
              is_ignored = true;
              break;
            }
            node = node.parentElement;
          }

          if (!is_ignored && can_observer) {
            if (window.location.href === current_url) {
              m();
            } else {
              current_url = window.location.href;

              //document.body.style.display = 'none';
              //document.body.style.opacity = '0';
              //can_observer = false;
              //setTimeout(function (){
              //    can_observer = true;
              //m();
              //},100)
            }
          }
        }
      });
    };

    mojoCore.observer = new MutationObserver(observeCallback);

    function addObserverIfDesiredNodeAvailable() {
      const targetNode = document.querySelector("body");
      if (!targetNode) {
        window.setTimeout(addObserverIfDesiredNodeAvailable, 1);
        return;
      }
      document.querySelectorAll("body,head style").forEach(function (target) {
        if (!target.hasAttribute("mojo-auto-generated"))
          mojoCore.observer.observe(target, {
            attributes: true,
            subtree: true,
            childList: true,
          });
      });
    }

    addObserverIfDesiredNodeAvailable();
  }
}

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

export default function m(url = undefined, core = undefined) {
  if (core !== undefined) mojoCore = core;
  if (window === undefined) {
    throw new Error("Mojo: Window is not defined");
  } else {
    init();

    processorModule.init({
      config: mojoCore.cssModule.config,
      cssModule: mojoCore.cssModule,
      tinycolor: mojoCore.tinycolor,
    });

    let css = "";
    if (Array.isArray(url)) {
      for (let i in url) {
        processorModule.mainFile = url[i];
        let style = processorModule.compile().css;
        mojoCore.styles[cyrb53(style)] = style;
      }
    } else if (url !== undefined) {
      processorModule.mainFile = url;
      let style = processorModule.compile().css;
      mojoCore.styles[cyrb53(style)] = style;
    }

    for (let i in mojoCore.styles) {
      css += mojoCore.styles[i];
    }

    document.querySelectorAll("style").forEach(function (node) {
      if (!node.hasAttribute("mojo-auto-generated"))
        if (
          node.hasAttribute("type") &&
          node.getAttribute("type") === "text/mojo"
        ) {
          processorModule.mainFile = undefined;
          if (node.innerHTML !== "") {
            css += processorModule.compile(node.innerHTML).css;
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
            } catch (ignore) {}

            for (let i = 0; i < array.length - 1; i = i + 2) {
              let selector = array[i].value;
              if (selector.includes("@mojo")) {
                let input = array[i + 1].value;
                css += processorModule.compile(input).css;
              }
            }
          }
        }
    });

    let cmp = intersection(
      mojoCore.cssModule.componentList,
      mojoCore.cssModule.nonMojoClasses
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

    let c = mojoCore.compile();
    mojoCore.addStyle(css + c.css, false);

    function getComponents() {
      for (let component of [...cmp]) {
        if (mojoCore.cssModule.Components.getCSS(component) === false) {
          setTimeout(getComponents, 1);
          return;
        }
        let css = processorModule.compile(
          mojoCore.cssModule.Components.getCSS(component)
        ).css;
        mojoCore.addStyle(css, true);
      }
    }
    getComponents();

    setTimeout(function () {
      mojoCore.addStyle(c.ts, true);
    }, 30);

    /*
                document.body.style.display = '';
                document.body.style.opacity = '';
                 */
  }
}

/*
if (window !== undefined) {
    window.mojoLoader = m;
}
 */
