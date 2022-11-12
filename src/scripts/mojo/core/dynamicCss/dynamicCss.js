import NormalColor from "./utilities/normalColor.js";
import Shadow from "./utilities/shadow.js";
import Text from "./utilities/text.js";
import Border from "./utilities/border.js";
import GradientColor from "./utilities/gradientColor.js";
import Public from "./utilities/public.js";

export default class DynamicCss {
  constructor(args) {
    this.args = args;
  }

  getCss() {
    const name = this.args.name;
    const value = this.args.value;
    const config = this.args.config;

    switch (name) {
      case "bg":
        return new NormalColor(
          config,
          value,
          "bg",
          "background-color"
        ).getCss();
      case "text":
        return new Text(config, value).getCss();
      case "shadow":
        return new Shadow(config, value).getCss();
      case "placeholder":
        return new NormalColor(config, value, "placeholder", "color").getCss();
      case "border":
        return new Border(config, value, "").getCss();
      case "border-top":
        return new Border(config, value, "top").getCss();
      case "border-left":
        return new Border(config, value, "left").getCss();
      case "border-right":
        return new Border(config, value, "right").getCss();
      case "border-bottom":
        return new Border(config, value, "bottom").getCss();
      case "gd-start":
        return new GradientColor(config, value, "start").getCss();
      case "gd-mid":
        return new GradientColor(config, value, "mid").getCss();
      case "gd-end":
        return new GradientColor(config, value, "end").getCss();
      case "w":
        return new Public(config, value, ["width"]).getCss();
      case "max-w":
        return new Public(config, value, ["max-width"]).getCss();
      case "min-w":
        return new Public(config, value, ["min-width"]).getCss();
      case "h":
        return new Public(config, value, ["height"]).getCss();
      case "max-h":
        return new Public(config, value, ["max-height"]).getCss();
      case "min-h":
        return new Public(config, value, ["min-height"]).getCss();
      case "pa":
        return new Public(config, value, ["padding"]).getCss();
      case "pt":
        return new Public(config, value, ["padding-top"]).getCss();
      case "pb":
        return new Public(config, value, ["padding-bottom"]).getCss();
      case "pl":
        return new Public(config, value, ["padding-left"]).getCss();
      case "pr":
        return new Public(config, value, ["padding-right"]).getCss();
      case "px":
        return new Public(config, value, [
          "padding-right",
          "padding-left",
        ]).getCss();
      case "py":
        return new Public(config, value, [
          "padding-top",
          "padding-bottom",
        ]).getCss();
      case "ma":
        return new Public(config, value, ["margin"]).getCss();
      case "mt":
        return new Public(config, value, ["margin-top"]).getCss();
      case "mb":
        return new Public(config, value, ["margin-bottom"]).getCss();
      case "ml":
        return new Public(config, value, ["margin-left"]).getCss();
      case "mr":
        return new Public(config, value, ["margin-right"]).getCss();
      case "mx":
        return new Public(config, value, [
          "margin-right",
          "margin-left",
        ]).getCss();
      case "my":
        return new Public(config, value, [
          "margin-top",
          "margin-bottom",
        ]).getCss();
      case "top":
        return new Public(config, value, ["top"]).getCss();
      case "bottom":
        return new Public(config, value, ["bottom"]).getCss();
      case "right":
        return new Public(config, value, ["right"]).getCss();
      case "left":
        return new Public(config, value, ["left"]).getCss();
      case "inset":
        return new Public(config, value, [
          "top",
          "right",
          "bottom",
          "left",
        ]).getCss();
      case "inset-x":
        return new Public(config, value, ["right", "left"]).getCss();
      case "inset-y":
        return new Public(config, value, ["top", "bottom"]).getCss();
      case "gap":
        return new Public(config, value, ["gap"]).getCss();
      case "gap-x":
        return new Public(config, value, [
          "column-gap",
          "grid-column-gap",
        ]).getCss();
      case "gap-y":
        return new Public(config, value, ["row-gap", "grid-row-gap"]).getCss();
      case "translate-x":
        return new Public(config, value, ["--m-translate-x"]).getCss();
      case "translate-y":
        return new Public(config, value, ["--m-translate-y"]).getCss();
      case "translate-z":
        return new Public(config, value, ["--m-translate-z"]).getCss();
      case "scale":
        return new Public(config, value, [
          "--m-scale-x",
          "--m-scale-y",
          "--m-scale-z",
        ]).getCss();
      case "scale-x":
        return new Public(config, value, ["--m-scale-x"]).getCss();
      case "scale-y":
        return new Public(config, value, ["--m-scale-y"]).getCss();
      case "scale-z":
        return new Public(config, value, ["--m-scale-z"]).getCss();
      case "rotate":
        return new Public(config, value, ["--m-rotate"]).getCss();
      case "rounded":
        return new Public(config, value, ["border-radius"]).getCss();
      case "rounded-top":
        return new Public(config, value, [
          "border-top-right-radius",
          "border-top-left-radius",
        ]).getCss();
      case "rounded-bottom":
        return new Public(config, value, [
          "border-bottom-right-radius",
          "border-bottom-left-radius",
        ]).getCss();
      case "rounded-right":
        return new Public(config, value, [
          "border-top-right-radius",
          "border-bottom-right-radius",
        ]).getCss();
      case "rounded-left":
        return new Public(config, value, [
          "border-top-left-radius",
          "border-bottom-left-radius",
        ]).getCss();
      case "rounded-top-r":
        return new Public(config, value, ["border-top-right-radius"]).getCss();
      case "rounded-top-l":
        return new Public(config, value, ["border-top-left-radius"]).getCss();
      case "rounded-bottom-r":
        return new Public(config, value, [
          "border-bottom-right-radius",
        ]).getCss();
      case "rounded-bottom-l":
        return new Public(config, value, [
          "border-bottom-left-radius",
        ]).getCss();
      case "opacity":
        return new Public(config, value, ["opacity"]).getCss();
      case "bg-alpha":
        return new Public(config, value, ["--m-bg-alpha"]).getCss();
      case "text-alpha":
        return new Public(config, value, ["--m-text-alpha"]).getCss();
      case "border-alpha":
        return new Public(config, value, ["--m-border-alpha"]).getCss();
      case "shadow-alpha":
        return new Public(config, value, ["--m-shadow-alpha"]).getCss();
      case "gd-start-alpha":
        return new Public(config, value, ["--m-gd-start-alpha"]).getCss();
      case "gd-mid-alpha":
        return new Public(config, value, ["--m-gd-mid-alpha"]).getCss();
      case "gd-end-alpha":
        return new Public(config, value, ["--m-gd-end-alpha"]).getCss();
      case "placeholder-alpha":
        return new Public(config, value, ["--m-placeholder-alpha"]).getCss();
      case "text-ls":
        return new Public(config, value, ["letter-spacing"]).getCss();
      case "text-lh":
        return new Public(config, value, ["line-height"]).getCss();
      case "text-w":
        return new Public(config, value, ["font-weight"]).getCss();
      case "content":
        return new Public(config, value, ["content"]).getCss();
      case "ts":
        return new Public(config, value, [
          "transition-duration",
          "-webkit-transition-duration",
          "-o-transition-duration",
        ]).getCss();
      case "ts-delay":
        return new Public(config, value, [
          "transition-delay",
          "-webkit-transition-delay",
          "-o-transition-delay",
        ]).getCss();
      case "z":
        return new Public(config, value, ["z-index"]).getCss();
      case "blur":
        return new Public(config, value, ["--m-blur"]).getCss();
      case "grayscale":
        return new Public(config, value, ["--m-grayscale"]).getCss();
      case "invert":
        return new Public(config, value, ["--m-invert"]).getCss();
      case "cols":
        return new Public(config, `repeat(${value}, minmax(0, 1fr))`, [
          "grid-template-columns",
        ]).getCss(false);
      case "rows":
        return new Public(config, `repeat(${value}, minmax(0, 1fr))`, [
          "grid-template-rows",
        ]).getCss(false);
      case "col":
        return new Public(config, `auto / span ${value}`, [
          "grid-column",
        ]).getCss(false);
      case "col-offset":
        return new Public(config, (parseInt(value) + 1).toString(), [
          "grid-column-start",
        ]).getCss(false);
      case "c-span":
        return new Public(config, `auto / span ${value}`, [
          "grid-column",
        ]).getCss(false);
      case "c-start":
        return new Public(config, value, ["grid-column-start"]).getCss(false);
      case "c-end":
        return new Public(config, value, ["grid-column-end"]).getCss(false);
      case "r-span":
        return new Public(config, `auto / span ${value}`, ["grid-row"]).getCss(
          false
        );
      case "r-start":
        return new Public(config, value, ["grid-row-start"]).getCss(false);
      case "r-end":
        return new Public(config, value, ["grid-row-end"]).getCss(false);
      default:
        break;
    }
  }
}
