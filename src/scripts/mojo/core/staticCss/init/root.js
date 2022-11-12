import tinyColor from "../../../lib/tinycolor.js";

export default class Init {
    constructor(config,usedColors) {
        this.config = config;
        this.usedColors = usedColors;
    }

    getCss() {
        let CSS = "";

        for (let i in this.config.base.themes) {
            let isFirst = true;
            for (let j in this.usedColors) {
                if (i === "default" || (this.config.base.themes[i][j] !== undefined && this.config.base.themes.default[j] !== this.config.base.themes[i][j])) {
                    if(isFirst) {
                        if (i !== "default") {
                            CSS += `[m-theme="${i}"] {\n    `;
                        } else {
                            CSS += ":root {\n    ";
                        }
                        isFirst = false;
                    }


                    for (let k of [...this.usedColors[j]]) {
                        if(k > 0) {
                            const color = tinyColor(this.config.base.themes[i][j]);
                            color.brighten(k * this.config.base.units.lighten);
                            CSS += getRootColorCSS(j + "-l-" + k, color);
                        } else if(k < 0) {
                            const color = tinyColor(this.config.base.themes[i][j]);
                            color.darken(Math.abs(k) * this.config.base.units.darken);
                            CSS += getRootColorCSS(j + "-d" + k, color);
                        } else {
                            const color = tinyColor(this.config.base.themes[i][j]);
                            CSS += getRootColorCSS(j, color);
                        }
                    }

                }
            }
            if(!isFirst) {
                CSS = CSS.substring(0, CSS.length - 4);
                CSS += "}\n";
            }

            function getRootColorCSS(name, color) {
                return `--m-color-${name}: ${parseInt(color._r)}, ${parseInt(
                    color._g
                )}, ${parseInt(color._b)};\n    `;
            }
        }

        return CSS;
    }
};
