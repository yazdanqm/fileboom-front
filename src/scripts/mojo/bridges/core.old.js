import config from "./mojo.config.js";
import CssModule from "../core/index.js";
import ExtensionLoader from "../core/utils/extensionLoader.js";
import Tinycolor from "../lib/tinycolor.js";

let cssModule = CssModule.init().setConfig(config);

let head, style, initStyles, allPseudos;

function getPseudoObj(pseudo, breakpoint, theme, children, regexMid) {
  let obj = {};
  obj.name = regexMid;
  obj.pseudo = pseudo;
  obj.regex = new RegExp("(^|[^:!-])" + regexMid + '="(.*?)"', "g");
  obj.breakpoint = breakpoint;
  obj.theme = theme;
  obj.children = children;
  return obj;
}

function findUsedAttributes() {
  let attributes = {};

  /*
    let themes = new Set();
    let breakpoints = new Set();
    let pseudos = new Set();
    let children = new Set();

     */

  document.querySelectorAll("body *").forEach(function (el) {
    for (let i in el.attributes) {
      if (el.attributes[i].nodeName !== undefined) {
        if (el.attributes[i].nodeName.includes(":")) {
          let attr = {};
          let s = el.attributes[i].nodeName.split(":");
          for (let j in s) {
            let type = findAttributeType(s[j]);
            switch (type) {
              case 0:
                attr.theme = s[j];
                //themes.add(s[j]);
                break;
              case 1:
                attr.breakpoint = s[j];
                //breakpoints.add(s[j]);
                break;
              case 2:
                attr.pseudo = s[j];
                //pseudos.add(s[j]);
                break;
              case 3:
                attr.children = s[j];
                //children.add(s[j]);
                break;
            }
          }
          if (attr.theme || attr.breakpoint || attr.pseudo)
            attributes[el.attributes[i].nodeName] = attr;
        } else {
          let type = findAttributeType(el.attributes[i].nodeName);
          switch (type) {
            case 0:
              //themes.add(el.attributes[i].nodeName);
              attributes[el.attributes[i].nodeName] = {
                theme: el.attributes[i].nodeName,
              };
              break;
            case 1:
              //breakpoints.add(el.attributes[i].nodeName);
              attributes[el.attributes[i].nodeName] = {
                breakpoint: el.attributes[i].nodeName,
              };
              break;
            case 2:
              //pseudos.add(el.attributes[i].nodeName);
              attributes[el.attributes[i].nodeName] = {
                pseudo: el.attributes[i].nodeName,
              };
              break;
            case 3:
              //children.add(el.attributes[i].nodeName);
              attributes[el.attributes[i].nodeName] = {
                children: el.attributes[i].nodeName,
              };
              break;
          }
        }
      }
    }
  });

  /*
      breakpoints = [...breakpoints];
      breakpoints.sort(function (a, b) {
        return Object.keys(config.base.breakpoints).indexOf(a) - Object.keys(config.base.breakpoints).indexOf(b);
      });

      pseudos = [...pseudos];
      pseudos.sort(function (a, b) {
        return allPseudos.indexOf(a) - allPseudos.indexOf(b);
      });

     */

  return {
    attributes: attributes,
    /*
        themes: [...themes],
        breakpoints: breakpoints,
        pseudos: pseudos,
        children: children,
         */
  };
}

function findAttributeType(attribute) {
  if (attribute.startsWith("i-")) attribute = attribute.substring(2);

  if (attribute === "default-theme") attribute = "default";

  if (config.base.themes[attribute] !== undefined) return 0;
  if (config.base.breakpoints[attribute] !== undefined) return 1;
  if (allPseudos.includes(attribute)) return 2;
  if (attribute.startsWith("children")) return 3;

  return -1;
}

function compile() {
  allPseudos = cssModule.getPseudos();
  const usedAttributes = findUsedAttributes();

  let markups = document.querySelector("html").innerHTML;
  markups = markups.replace(/className=/g, "class=");
  markups = markups.replace(/\r/g, " ");
  markups = markups.replace(/\n/g, " ");
  markups = markups.replace(/\t/g, " ");
  markups = markups.replace(/    /g, " ");

  while (markups.includes("  ")) {
    markups = markups.replace(/  /g, " ");
  }

  if (config.whitelist !== undefined) {
    markups += "<div ";
    for (let i in config.whitelist) {
      let name = i;
      if (name === "idle") name = "class";
      markups += `${name}="${config.whitelist[i]}" `;
    }
    markups += "></div>";
  }

  let attrs = Object.keys(usedAttributes.attributes);
  let rbps = Object.keys(config.base.breakpoints).reverse();
  for (let rbp in rbps) {
    rbps[rbp] = "i-" + rbps[rbp];
  }
  let vb = [...allPseudos, ...Object.keys(config.base.breakpoints), ...rbps];
  attrs.sort(function (a, b) {
    let aSplit = a.split(":");
    let bSplit = b.split(":");

    let sum = 0;
    for (let i in aSplit) {
      for (let j in bSplit) {
        sum += vb.indexOf(aSplit[i]) - vb.indexOf(bSplit[j]);
      }
    }

    return sum;
  });

  let css = createPattensCSS();

  let types = [];

  for (let attr of attrs) {
    types.push(
      getPseudoObj(
        usedAttributes.attributes[attr].pseudo === undefined
          ? "class"
          : usedAttributes.attributes[attr].pseudo,
        usedAttributes.attributes[attr].breakpoint,
        usedAttributes.attributes[attr].theme,
        usedAttributes.attributes[attr].children,
        attr
      )
    );
  }

  let ts = "";
  for (let i in types) {
    if (markups.includes(types[i].name)) {
      let vc = getCoreCSS(markups, types[i]);
      css += vc.css;
      ts += vc.ts;
    }
  }

  return {
    css,
    ts,
  };
}

function createPattensCSS() {
  let css = "";

  if (config.patterns !== undefined) {
    for (let selector in config.patterns) {
      for (let pseudo in config.patterns[selector]) {
        let string = config.patterns[selector][pseudo];
        string = string.replace(/\n/g, " ");
        while (string.includes("  ")) string = string.substring(/  /g, " ");

        let selectorSpl = selector.split(",");
        for (let i in selectorSpl) {
          let s = selectorSpl[i];
          while (s.startsWith(" ")) s = s.substring(1);

          let v = pseudo;
          let t = undefined;
          let b = undefined;

          let tName = v;
          if (tName.startsWith("i-")) tName.substring(2);
          if (config.base.themes[tName] !== undefined) {
            t = v;
            v = "class";
          }

          if (config.base.breakpoints[getBpName(v)] !== undefined) {
            b = v;
            v = "class";
          }

          let variantSpl = pseudo.split(":");
          if (variantSpl.length > 1) {
            if (config.base.themes[variantSpl[0]] !== undefined) {
              t = variantSpl[0];
              v = variantSpl[1];

              if (
                config.base.breakpoints[getBpName(variantSpl[1])] !== undefined
              ) {
                b = variantSpl[1];
                v = variantSpl[2];
              }
            } else if (
              config.base.breakpoints[getBpName(variantSpl[0])] !== undefined
            ) {
              b = variantSpl[0];
              v = variantSpl[1];
            }
          }

          let opt = {
            isExtend: true,
            selector: s,
            classes: string.split(" "),
            pseudo: v,
            theme: t,
            breakpoint: b,
          };
          css += cssModule.init(opt).getStyles().css;
        }
      }
    }
  }

  function getBpName(bp) {
    if (bp.startsWith("i-")) return bp.replace("i-", "");

    return bp;
  }

  return css;
}

function getCoreCSS(str, type) {
  let css = "",
    ts = "";

  let variant_arr = str.match(type.regex);
  if (variant_arr != null) {
    let variant_str = "";
    for (let i in variant_arr) {
      variant_str += variant_arr[i].split('"')[1] + " ";
    }

    while (variant_str.includes("  "))
      variant_str = variant_str.replace(/  /g, " ");

    let variant_spl = variant_str.split(" ");
    let classes = new Set();
    let transitions = new Set();
    let alphaclasses = new Set();
    for (let i in variant_spl) {
      if (
        variant_spl[i].startsWith("ts-") ||
        variant_spl[i].startsWith("transition")
      ) {
        transitions.add(variant_spl[i]);
      } else if (variant_spl[i].includes("-alpha-")) {
        alphaclasses.add(variant_spl[i]);
      } else {
        classes.add(variant_spl[i]);
      }
    }
    classes = [...classes, ...alphaclasses];
    transitions = [...transitions];

    let opt = {
      isExtend: false,
      pseudo: type.pseudo,
      breakpoint: type.breakpoint,
      theme: type.theme,
      children: type.children,
      attribute: type.name,
      classes: classes,
    };

    let res = cssModule.init(opt).getStyles();
    css = res.css;

    opt.classes = transitions;
    res = cssModule.init(opt).getStyles();
    ts = res.css;
  }

  return {
    css,
    ts,
  };
}

function addStyles(cssCode, append = true) {
  if (!append) {
    style.textContent = "";
    style.textContent = cssModule.getRootStyles() + initStyles;
  }

  style.textContent += cssCode;

  if (cssCode.includes("-mojo-delay-")) {
    setTimeout(function () {
      style.textContent = style.textContent.replace(/-mojo-delay-/g, "");
    }, 30);
  }

  //style.appendChild(document.createTextNode(cssCode));
}

const mergeConfigs = (source, target) => {
  return (
    Object.keys(target).forEach((key) => {
      source[key] instanceof Object && target[key] instanceof Object
        ? source[key] instanceof Array && target[key] instanceof Array
          ? void (source[key] = Array.from(
              new Set(source[key].concat(target[key]))
            ))
          : !(source[key] instanceof Array) && !(target[key] instanceof Array)
          ? void mergeConfigs(source[key], target[key])
          : void (source[key] = target[key])
        : void (source[key] = target[key]);
    }) || source
  );
};

function refactorConfig(c) {
  if (
    c.base !== undefined &&
    c.base.fonts !== undefined &&
    Object.keys(c.base.fonts).length > 0
  ) {
    config.base.fonts = c.base.fonts;
  }

  config.base.breakpoints = Object.entries(config.base.breakpoints)
    .sort(([, a], [, b]) => parseInt(a.min) - parseInt(b.min))
    .sort(([, a], [, b]) => parseInt(b.max) - parseInt(a.max))
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
}

let initialed = false;
let mojoCore;

function init() {
  if (!initialed) {
    let current_url = window.location.href;

    head = document.head || document.getElementsByTagName("head")[0];
    style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.setAttribute("mojo-auto-generated", "");
    head.appendChild(style);

    mojoCore = {};
    /*
        const observeCallback = function (mutationsList) {
            mutationsList.forEach((mutation, index) => {
                if (index === 0) {
                    if (!mutation.target.hasAttribute("m-ignore-observe")){
                        m();
                    }
                }
            });
        };
         */

    const observeCallback = function (mutationsList) {
      mutationsList.forEach((mutation, index) => {
        if (index === 0) {
          let is_not_ignored = true;
          let node = mutation.target;
          if (node.hasAttribute("m-ignore-observe")) {
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
            m();
          }
        }
      });
    };

    mojoCore.observer = new MutationObserver(observeCallback);
    document.querySelectorAll("body,head style").forEach(function (target) {
      if (!target.hasAttribute("mojo-auto-generated"))
        mojoCore.observer.observe(target, {
          attributes: true,
          subtree: true,
          childList: true,
        });
    });

    initialed = true;
  }
}

if (window !== undefined) {
  (function () {
    setTimeout(function () {
      if (mojoCore === undefined) m();
    }, 7);
  })();
}

function docReady(fn) {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

export default function m(
  c = undefined,
  fn = undefined,
  has_preprocessor = false
) {
  docReady(function () {
    init();
    if (c !== undefined) {
      mergeConfigs(config, c);
      refactorConfig(c);
    }

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

    cssModule = CssModule.init().setConfig(config);
    new ExtensionLoader(config, cssModule);
    if (config.utilities !== undefined) {
      for (let i in config.utilities) {
        cssModule.addUtility(i, config.utilities[i]);
      }
    }

    initStyles = cssModule.getInitStyles();

    mojoCore.cssModule = cssModule;
    if (mojoCore.tinycolor === undefined) mojoCore.tinycolor = Tinycolor;
    mojoCore.compile = compile;
    mojoCore.addStyle = addStyles;

    if (has_preprocessor === false) {
      let c = compile();
      addStyles(c.css, false);
      setTimeout(function () {
        addStyles(c.ts, true);
      }, 30);
    }

    if (fn !== undefined) {
      fn(mojoCore);
    }
  });
}
