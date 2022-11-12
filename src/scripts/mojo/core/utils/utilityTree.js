import Appearance from "../staticCss/utilities/appearance.js";
import Backdrop from "../staticCss/utilities/backdrop.js";
import Colors from "../staticCss/utilities/colors.js";
import Background from "../staticCss/utilities/background.js";
import Border from "../staticCss/utilities/border.js";
import BoxAlignment from "../staticCss/utilities/boxAlignment.js";
import BoxJustify from "../staticCss/utilities/boxJustify.js";
import BoxOrder from "../staticCss/utilities/boxOrder.js";
import Clear from "../staticCss/utilities/clear.js";
import Cursor from "../staticCss/utilities/cursor.js";
import Display from "../staticCss/utilities/display.js";
import Fill from "../staticCss/utilities/fill.js";
import Flex from "../staticCss/utilities/flex.js";
import Float from "../staticCss/utilities/float.js";
import Font from "../staticCss/utilities/font.js";
import ListStyle from "../staticCss/utilities/listStyle.js";
import Text from "../staticCss/utilities/text.js";
import Overflow from "../staticCss/utilities/overflow.js";
import Position from "../staticCss/utilities/position.js";
import ObjectFit from "../staticCss/utilities/objectFit.js";
import Resize from "../staticCss/utilities/resize.js";
import UserSelect from "../staticCss/utilities/userSelect.js";
import Transition from "../staticCss/utilities/transition.js";
import Shadow from "../staticCss/utilities/shadow.js";
import ShadowColor from "../staticCss/utilities/shadowColor.js";
import MixBlend from "../staticCss/utilities/mixBlend.js";
import GradientColor from "../staticCss/utilities/gradientColor.js";
import Gradient from "../staticCss/utilities/gradient.js";
import Origin from "../staticCss/utilities/origin.js";
import Sizes from "../staticCss/utilities/sizes.js";

export default function (config) {
  return {
    appearance: new Appearance().getTree(),
    backdrop: new Backdrop().getTree(),
    bg: {
      none: "background: none",
      ...new Colors(config, "bg", "background-color").getTree(),
      ...new Background().getTree(),
      gradient:
        "--m-gradient-dir: to bottom;--m-gradient-start: rgba(var(--m-color-body-l-3), var(--m-gr-start-alpha, 1));--m-gradient-end: rgba(var(--m-color-body-d-3), var(--m-gr-end-alpha, 1));--m-gradient-stops: var(--m-gradient-start), var(--m-gradient-end);background-image: linear-gradient(var(--m-gradient-dir), var(--m-gradient-stops))",
    },
    border: {
      ...new Border().getTree(),
      ...new Colors(config, "border", "border-color").getTree(),
    },
    a: new BoxAlignment().getTree(),
    j: new BoxJustify().getTree(),
    order: new BoxOrder().getTree(),
    clear: new Clear().getTree(),
    clearfix: {
      clearfix: "display: table;clear:both",
    },
    cursor: new Cursor().getTree(),
    d: new Display().getTree(),
    p: new Position().getTree(),
    fill: new Fill().getTree(),
    filter: {
      filter:
        "--m-blur: 0;--m-grayscale: 0;--m-invert: 0;-webkit-filter: blur(var(--m-blur)) grayscale(var(--m-grayscale)) invert(var(--m-invert));filter: blur(var(--m-blur)) grayscale(var(--m-grayscale)) invert(var(--m-invert))",
      none: "filter: none;-webkit-filter: none;",
    },
    flex: new Flex().getTree(),
    float: new Float().getTree(),
    font: new Font(config).getTree(),
    list: new ListStyle().getTree(),
    text: {
      ...new Text(config).getTree(),
      ...new Colors(config, "text", "color").getTree(),
      gradient:
        "--m-gradient-dir: to bottom;--m-gradient-start: rgba(var(--m-color-body-l-3), var(--m-gr-start-alpha, 1));--m-gradient-end: rgba(var(--m-color-body-d-3), var(--m-gr-end-alpha, 1));--m-gradient-stops: var(--m-gradient-start), var(--m-gradient-end);background-clip: text;-webkit-background-clip: text;-moz-background-clip: text;-webkit-text-fill-color: transparent;-moz-text-fill-color: transparent;background-size: 100%;background-image: linear-gradient(var(--m-gradient-dir), var(--m-gradient-stops))",
    },
    grid: {
      grid: "display: grid;grid-template-columns: repeat(1, minmax(0, 1fr));grid-gap: 1rem;--m-box-start: start;--m-box-end: end",
    },
    cols: {
      auto: "grid-template-columns: repeat(auto-fit, minmax(0, 1fr))",
    },
    rows: {
      auto: "grid-template-rows: repeat(auto-fit, minmax(0, 1fr))",
    },
    col: {
      auto: "grid-column: auto",
      "offset-auto": "grid-column-start: auto",
    },
    c: {
      "start-auto": "grid-column-start: auto",
      "end-auto": "grid-column-start: auto",
    },
    r: {
      "start-auto": "grid-row-start: auto",
      "end-auto": "grid-row-start: auto",
    },
    overflow: new Overflow().getTree(),
    obj: new ObjectFit().getTree(),
    visible: {
      visible: "visibility: visible",
    },
    hidden: {
      hidden: "visibility: hidden",
    },
    outline: {
      none: "outline: none",
    },
    content: {
      none: 'content: ""',
    },
    pointer: {
      "events-none": "pointer-events: none",
      "events-auto": "pointer-events: auto",
    },
    resize: new Resize().getTree(),
    user: new UserSelect().getTree(),
    transition: {
      transition:
        "transition-property: all;-webkit-transition-property: all;-o-transition-property: all;transition-duration: 100ms;-webkit-transition-duration: 100ms;-o-transition-duration: 100ms;transition-timing-function: ease;-webkit-transition-timing-function: ease;-o-transition-timing-function: ease",
      none: "transition-property: none;-webkit-transition-property: none;-o-transition-property: none;",
    },
    ts: {
      ...new Transition(config, "timing").getTree(),
      ...new Transition(config, "property").getTree(),
    },
    transform: {
      transform:
        "--m-scale-x: 1;--m-scale-y: 1;--m-scale-z: 1;--m-rotate: 0;--m-translate-x: 0;--m-translate-y: 0;--m-translate-z: 0;transform: scaleX(var(--m-scale-x)) scaleY(var(--m-scale-y)) scaleZ(var(--m-scale-z)) rotate(var(--m-rotate)) translateX(var(--m-translate-x)) translateY(var(--m-translate-y)) translateZ(var(--m-translate-z));-webkit-transform: scaleX(var(--m-scale-x)) scaleY(var(--m-scale-y)) scaleZ(var(--m-scale-z)) rotate(var(--m-rotate)) translateX(var(--m-translate-x)) translateY(var(--m-translate-y)) translateZ(var(--m-translate-z));-ms-transform: scaleX(var(--m-scale-x)) scaleY(var(--m-scale-y)) scaleZ(var(--m-scale-z)) rotate(var(--m-rotate)) translateX(var(--m-translate-x)) translateY(var(--m-translate-y)) translateZ(var(--m-translate-z))",
      none: "transform: none;-webkit-transform: none;-ms-transform: none;",
    },
    shadow: {
      ...new Shadow(config, "shadow").getTree(),
      ...new Shadow(config, "shadow-soft").getTree(),
      ...new Shadow(config, "shadow-solid").getTree(),
      ...new ShadowColor(config).getTree(),
      none: "box-shadow: none;-webkit-box-shadow: none",
    },
    blend: new MixBlend().getTree(),
    gd: {
      ...new Gradient().getTree(),
      ...new GradientColor(config, "start").getTree(),
      ...new GradientColor(config, "mid").getTree(),
      ...new GradientColor(config, "end").getTree(),
    },
    t: new Origin("transform").getTree(),
    perspect: new Origin("perspective").getTree(),
    pt: new Sizes("padding-top").getTree(),
    pr: new Sizes("padding-right").getTree(),
    pb: new Sizes("padding-bottom").getTree(),
    pl: new Sizes("padding-left").getTree(),
    px: new Sizes(["padding-right", "padding-left"]).getTree(),
    py: new Sizes(["padding-top", "padding-bottom"]).getTree(),
    mt: new Sizes("margin-top").getTree(),
    mr: new Sizes("margin-right").getTree(),
    mb: new Sizes("margin-bottom").getTree(),
    ml: new Sizes("margin-left").getTree(),
    mx: new Sizes(["margin-right", "margin-left"]).getTree(),
    my: new Sizes(["margin-top", "margin-bottom"]).getTree(),
    top: new Sizes("top").getTree(),
    right: new Sizes("right").getTree(),
    bottom: new Sizes("bottom").getTree(),
    left: new Sizes("left").getTree(),
    inset: {
      ...new Sizes(["top", "right", "bottom", "left"]).getTree(),
      ...new Sizes(["right", "left"], "x-").getTree(),
      ...new Sizes(["bottom", "top"], "y-").getTree(),
    },
    gap: {
      ...new Sizes("gap").getTree(),
      ...new Sizes(["column-gap", "grid-column-gap"], "x-").getTree(),
      ...new Sizes(["row-gap", "grid-row-gap"], "y-").getTree(),
    },
    translate: {
      ...new Sizes("--m-translate-x", "x-").getTree(),
      ...new Sizes("--m-translate-y", "y-").getTree(),
      ...new Sizes("--m-translate-z", "z-").getTree(),
    },
    rounded: {
      full: "border-radius: 9999px",
    },
    w: new Sizes("width").getTree(),
    h: new Sizes("height").getTree(),
    min: {
      ...new Sizes("min-width", "w-", config).getTree(),
      ...new Sizes("min-height", "h-", config).getTree(),
    },
    max: {
      ...new Sizes("max-width", "w-", config).getTree(),
      ...new Sizes("max-height", "h-", config).getTree(),
    },
    placeholder: {
      ...new Colors(config, "placeholder", "color").getTree(),
    },
  };
}
