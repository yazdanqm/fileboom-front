import Statics from "../utils/statics.js";

class AtFinder {
  constructor(args) {
    this.config = args.config;
    this.cssModule = args.cssModule;
  }

  getAtSelector(name) {
    if (
      name.startsWith("@media") ||
      name.startsWith("@keyframes") ||
      name.startsWith("@font-face") ||
      name.startsWith("@utility") ||
      name.startsWith("@component")
    )
      return [name];

    const fixedName = name.substring(1).replace("default-theme", "default");

    let pName = fixedName;
    if (pName.startsWith("i-")) {
      pName = pName.substring(2);
    }

    if (this.config.base.themes[pName] !== undefined) {
      //return [`[m-theme="${fixedName}"]`];
      return this.getThemeSelector(fixedName);
    }

    if (this.config.base.breakpoints[pName] !== undefined) {
      return this.getBpSelector(fixedName);
    }

    return [this.getVariantSelector(fixedName)];
  }

  getAtProps(string) {
    let opt = {};
    opt.isExtend = true;
    opt.classes = string.split(" ");
    opt.variant = undefined;
    let cssArr = this.cssModule
      .init(opt)
      .getStyles()
      .css.replace(/\n/g, "")
      .replace(/    /g, "")
      .split(";")
      .filter((e) => e);

    let name = opt.classes.shift();

    if (name === "@idle") {
      return cssArr;
    }

    let selectors = this.getAtSelector(name);
    let ret = [];
    if (selectors.length > 1) {
      for (let i in selectors) {
        ret.push({
          selector: selectors[i],
          valueArr: cssArr,
        });
      }
    } else {
      return {
        selector: selectors[0],
        valueArr: cssArr,
      };
    }

    return ret;
  }

  getVariantSelector(name) {
    switch (name) {
      case "hover":
        return "&:hover";
      case "focus":
        return "&:focus";
      case "active":
        return "&:active";
      case "first":
        return "&:first-child";
      case "last":
        return "&:last-child";
      case "even":
        return "&:nth-child(even)";
      case "odd":
        return "&:nth-child(odd)";
      case "focus-within":
        return "&:focus-within";
      case "visited":
        return "&:visited";
      case "not-first":
        return "&:not(:first-child)";
      case "not-last":
        return "&:not(:last-child)";
      case "disabled":
        return "&:disabled";
      case "checked":
        return "&:checked";
      case "not-checked":
        return "&:not(:checked)";
      case "invalid":
        return "&:invalid";
      case "valid":
        return "&:valid";
      case "optional":
        return "&:optional";
      case "read-only":
        return "&:read-only";
      case "focus-visible":
        return "&:focus-visible";
      case "indeterminate":
        return "&:indeterminate";
      case "required":
        return "&:required";
      case "empty":
        return "&:empty";
      case "before":
        return "&::before";
      case "after":
        return "&::after";
      case "selection":
        return "&::selection";
      case "first-letter":
        return "&::first-letter";
      case "first-line":
        return "&::first-line";
      case "parent-hover":
        return "<.parent:hover";
      case "parent-focus":
        return "<.parent:focus";
      case "parent-active":
        return "<.parent:active";
      case "parent-visited":
        return "<.parent:visited";
      case "parent-print":
        return "@media print";
    }
    return "@" + name;
  }

  getThemeSelector(themeName) {
    let theme = themeName,
      invert = false;
    if (theme.startsWith("i-")) {
      theme = theme.substring(2);
      invert = true;
    }

    if (invert) {
      if (theme === "default")
        return [`html:is([m-theme]):not([m-theme="default"])`];
      else return [`html:not([m-theme="${theme}"])`];
    } else {
      if (theme === "default") {
        return [`html:not([m-theme])`, `[m-theme="default"]`];
      } else {
        return [`[m-theme="${theme}"]`];
      }
    }
  }

  getBpSelector(bpName) {
    let invert = false;
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
      let ret = [getBpSelectorString({ min: bp.min })];
      if (parseInt(bp.max) > 0) {
        ret.push(getBpSelectorString({ max: bp.max }));
      }
      return ret;
    } else {
      return [getBpSelectorString(bp)];
    }

    function getBpSelectorString(bp) {
      function getQuery(name, value) {
        let v = parseFloat(value);
        let suf = value.replace(v, "");
        if (name === "max") v = v - 0.02;
        return `(${name}-width: ${v}${suf}) `;
      }

      let bpCss = "@media ";
      bpCss += "only screen and ";
      if (bp.min !== undefined) bpCss += getQuery("min", bp.min);
      if (bp.max !== undefined) {
        if (bp.min !== undefined) {
          bpCss += "and ";
        }
        bpCss += getQuery("max", bp.max);
      }

      return bpCss;
    }
  }

  setAtUtility(node) {
    this.cssModule.addUtility(
      Statics.fixString(node.selector.replace("@utility", "").substring(1)),
      node.valueArr.join(";")
    );
  }

  setAtComponent(node) {
    //this.cssModule.addComponent(Statics.fixString(node.selector.replace("@component","").substring(1)) , node.valueArr.join(";"));
    this.cssModule.addComponent(node);
  }
}

export default AtFinder;
