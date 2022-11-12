import Utility from "./utility.js";

export default class Text extends Utility {
  getTree() {
    this.property = "text-align";
    this.values = {
      left: "left",
      center: "center",
      right: "right",
      justify: "justify",
      "justify-all": "justify-all",
      start: "start",
      end: "end",
      "match-parent": "match-parent",
    };
    const align = super.getTree();

    this.property = "text-decoration";
    this.values = {
      underline: "underline",
      "line-through": "line-through",
      "underline-none": "none",
    };
    const decoration = super.getTree();

    this.property = "letter-spacing";
    this.values = {
      "ls-normal": "0",
      "ls-tight-1": "-0.025rem",
      "ls-tight-2": "-0.05rem",
      "ls-wide-1": "0.025rem",
      "ls-wide-2": "0.05rem",
      "ls-wide-3": "0.075rem",
      "ls-wide-4": "0.1rem",
      "ls-wide-5": "0.125rem",
    };
    const letter_spacing = super.getTree();

    this.property = "line-height";
    this.values = {
      "lh-normal": "1",
      "lh-1": "1.25",
      "lh-2": "1.375",
      "lh-3": "1.5",
      "lh-4": "1.625",
      "lh-5": "2",
    };
    const line_height = super.getTree();

    this.property = "font-size";
    this.values = {
      0: "0",
    };

    this.property = "font-style";
    this.values = {
      italic: "italic",
      normal: "normal",
    };
    const font_style = super.getTree();

    this.property = "text-transform";
    this.values = {
      uppercase: "uppercase",
      lowercase: "lowercase",
      normalcase: "none",
      capitalize: "capitalize",
    };
    const text_transform = super.getTree();

    this.property = "font-weight";
    this.values = {
      "w-thin": "200",
      "w-light": "300",
      "w-normal": "400",
      "w-medium": "500",
      "w-semibold": "600",
      "w-bold": "700",
      "w-extrabold": "800",
      "w-black": "900",
    };
    const font_weight = super.getTree();

    this.property = "white-space";
    this.values = {
      "ws-normal": "normal",
      "ws-norwrap": "nowrap",
      "ws-pre": "pre",
      "ws-preline": "pre-line",
      "ws-prewrap": "pre-wrap",
    };
    const white_space = super.getTree();

    const word_break = {
      "wb-normal": "word-break: normal;overflow-wrap: normal",
      "wb-words": "overflow-wrap: break-word",
      "wb-all": "word-break: break-all",
      truncate: "overflow: hidden;text-overflow: ellipsis;white-space: nowrap",
    };

    return {
      ...align,
      ...decoration,
      ...letter_spacing,
      ...line_height,
      ...font_style,
      ...text_transform,
      ...font_weight,
      ...white_space,
      ...word_break,
    };
  }
};
