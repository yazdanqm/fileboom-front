import tinyColor from "../../utils/tinycolor.js";

export default class Base {
    constructor(config) {
        this.config = config;
    }

    getCss() {
        let CSS = "";

        const key = Object.keys(this.config.base.fonts)[0];
        let font = this.config.base.fonts[key];
        let fontName = "";
        if (typeof font === typeof "") {
            fontName = font;
        } else {
            if (Array.isArray(font)) fontName = font.join(", ");
            else {
                fontName = Object.keys(font).join(", ");
                for (let i in font) {
                    if (font[i].length > 0) {
                        CSS += `@import url("${font[i]}");\n`
                    }
                }
            }
        }


        for (let i in this.config.base.themes) {
            if (i !== "default") {
                CSS += `[m-theme="${i}"] {\n`;
            } else {
                CSS += ":root {\n    ";
            }

            for (let j in this.config.base.themes[i]) {
                let CAN_CREAT_COLORS = true;
                if (i !== "default") {
                    if (
                        this.config.base.themes.default[j] === this.config.base.themes[i][j]
                    )
                        // ignore equal colors
                        CAN_CREAT_COLORS = false;
                }
                if (CAN_CREAT_COLORS) {
                    const color1 = tinyColor(this.config.base.themes[i][j]);
                    CSS += getRootColorCSS(j, color1);
                    const color2 = tinyColor(this.config.base.themes[i][j]);

                    for (let k = 1; k <= 5; k++) {
                        color1.brighten(k * this.config.base.units.lighten);
                        CSS += getRootColorCSS(j + "-l-" + k, color1);
                        color2.darken(k * this.config.base.units.darken);
                        CSS += getRootColorCSS(j + "-d-" + k, color2);
                    }
                }
            }

            CSS = CSS.substring(0, CSS.length - 4);
            CSS += "}\n";

            function getRootColorCSS(name, color) {
                return `--m-color-${name}: ${parseInt(color._r)}, ${parseInt(
                    color._g
                )}, ${parseInt(color._b)};\n    `;
            }
        }

        if (this.config.options.baseStyles !== false) {
            CSS += getCSS(
                "*",
                "margin: 0;padding: 0;box-sizing: border-box;-webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important"
            );
            CSS += getCSS("*,*::before,*::after", "border: 0 solid #00000000");
            CSS += getCSS("html", "font-size: 100%;-webkit-text-size-adjust: 100%");
            CSS += getCSS(
                "article, aside, figcaption, figure, footer, header, hgroup, main, nav, section ",
                "display: block"
            );
            let direction = this.config.options.rtl ? "rtl" : "ltr";
            CSS += getCSS(
                "body",
                "--m-bg-alpha: 1;--m-text-alpha: 1;background-color: rgba(var(--m-color-body), var(--m-bg-alpha));color: rgba(var(--m-color-invert), var(--m-text-alpha));font-size: 1rem;font-weight: 400;line-height: 1.5;" +
                `direction: ${direction}`
            );
            CSS += getCSS(
                "body, button, input, select, textarea",
                `font-family: ${fontName}`
            );
            CSS += getCSS(
                "button, input, optgroup, select, textarea",
                "font-family: inherit;font-size: 100%;line-height: 1.15;margin: 0"
            );
            CSS += getCSS("a", "text-decoration: none");
            CSS += getCSS("p", "margin: 0.4rem 0");
            CSS += getCSS(
                "h1, h2, h3, h4, h5, h6",
                "margin-top: 0;margin-bottom: 0.5rem;display: block;font-weight: 500"
            );
            CSS += getCSS("h1", "font-size: 2rem");
            CSS += getCSS("h2", "font-size: 1.5rem");
            CSS += getCSS("h3", "font-size: 1.25rem");
            CSS += getCSS("h4", "font-size: 1rem");
            CSS += getCSS("h5", "font-size: .83rem");
            CSS += getCSS("h6", "font-size: .67rem");
            CSS += getCSS("i", "vertical-align: middle !important;user-select: none");
            CSS += getCSS("button, input, select, textarea", "margin: 0");
            CSS += getCSS("iframe", "margin: 0");
            CSS += getCSS("table", "border-collapse: collapse;border-spacing: 0");
            CSS += getCSS("td, th", "padding: 0");
            let directionAlign = this.config.options.rtl ? "right" : "left";
            CSS += getCSS(
                "td:not([align]), th:not([align])",
                "text-align: " + directionAlign
            );

            CSS += getCSS(
                ".container",
                `width: 100%;max-width: ${this.config.base.container.default.maxWidth};margin: 0 auto;padding: ${this.config.base.container.default.padding}`
            );
            CSS += getCSS(
                ".container-fluid",
                `width: 100%;margin: 0 auto;padding: ${this.config.base.container.default.padding}`
            );
            for (let p in this.config.base.container) {
                if (p !== "default" && this.config.base.breakpoints[p] !== undefined && (this.config.base.container[p].padding !== undefined || this.config.base.container[p].maxWidth !== undefined)) {
                    let b_min = this.config.base.breakpoints[p].min;
                    let b_max = this.config.base.breakpoints[p].max;

                    let c1 = '',c2 = '';
                    if(this.config.base.container[p].padding !== undefined && this.config.base.container[p].maxWidth !== undefined){
                        c1 = `padding: ${this.config.base.container[p].padding};max-width: ${this.config.base.container[p].maxWidth}`;
                    } else {
                        if (this.config.base.container[p].padding !== undefined)
                            c1 = `padding: ${this.config.base.container[p].padding}`;
                        if (this.config.base.container[p].maxWidth !== undefined)
                            c1 = `max-width: ${this.config.base.container[p].maxWidth}`;
                    }
                    if (this.config.base.container[p].padding !== undefined)
                        c2 = `padding: ${this.config.base.container[p].padding}`;

                    if (b_min !== undefined && b_max !== undefined) {
                        CSS += getContainerCSS(
                            `@media only screen and (min-width: ${b_min}) and (max-width:${b_max})`,
                            `.container {${c1} }.container-fluid {${c2} }`
                        );
                    }
                    if (b_min !== undefined && b_max === undefined) {
                        CSS += getContainerCSS(
                            `@media only screen and (min-width: ${b_min})`,
                            `.container {${c1} }.container-fluid {${c2} }`
                        );
                    }
                    if ((b_min === undefined && b_max !== undefined)) {
                        CSS += getContainerCSS(
                            `@media only screen and (max-width:${b_max})`,
                            `.container {${c1} }.container-fluid {${c2} }`
                        );
                    }

                }
            }

            function getCSS(name, body) {
                return `${name} {\n    ${body.replace(/;/g, ";\n    ")};\n}\n`;
            }

            function getContainerCSS(name, body) {
                return `${name} {\n    ${body
                    .replace(/;/g, ";\n        ")
                    .replace(/{/g, "{\n        ")
                    .replace(/}/g, "\n    }\n    ")
                }\n}\n`;
            }
        }

        return CSS;
    }
};
