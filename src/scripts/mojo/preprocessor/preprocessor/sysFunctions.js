/*
var tinycolor = require("../utils/tinycolor");

class SysFunctions {
  constructor(args) {
    this.config = args.config;
    this.cssModule = args.cssModule;
  }

  compile(str) {
    let functions = [
      "color",
      "size",
      "text-size",
      "rgb",
      "hsl",
      "lighten",
      "darken",
    ];
    if (str == undefined) {
      return;
    }
    let result = str;

    // Config Values
    let sizes = this.config.base.sizing;
    let textSizes = this.config.base.textSize;

    let colors = {};
    for (let color in this.config.base.themes.default) {
      colors[`${color}`] = `rgba(var(--m-color-${color}), 1)`;
      for (let j = 1; j <= 5; j++) {
        colors[`${color}-${j}`] = `rgba(var(--m-color-${color}-${j}), 1)`;
        colors[`-${color}-${j}`] = `rgba(var(--m-color-${color}-d-${j}), 1)`;
      }
    }

    let colorsExact = {};
    for (let theme in this.config.base.themes) {
      colorsExact[`${theme}`] = {};
      for (let color in this.config.base.themes[theme]) {
        let colorValue = this.config.base.themes[theme][color];
        colorsExact[`${theme}`][`${color}`] =
          tinycolor(colorValue).toHexString();
        for (let j = 1; j <= 5; j++) {
          colorsExact[`${theme}`][`${color}-${j}`] = tinycolor(colorValue)
            .brighten(j * 3.2)
            .toHexString();
          colorsExact[`${theme}`][`-${color}-${j}`] = tinycolor(colorValue)
            .darken(j * 1.8)
            .toHexString();
        }
      }
    }

    for (let i = 0; i < functions.length; i++) {
      let regex;
      let matches;

      switch (functions[i]) {
        case "color":
          regex = RegExp(functions[i] + "\\((.*?)\\)", "g");
          matches = [...result.matchAll(regex)];
          if (matches.length != 0) {
            for (let i = 0; i < matches.length; i++) {
              let rawValue = matches[i][0];
              let value = matches[i][1].replace(/['"\[\]]+/g, "");
              if (value.includes(",")) {
                let values = value.replace(/ /g, "").split(",");
                for (let theme in colorsExact) {
                  if (values[0] == theme) {
                    for (let color in colorsExact[values[0]]) {
                      if (values[1] == color) {
                        result = result.replace(
                          rawValue,
                          tinycolor(colorsExact[values[0]][color])
                        );
                      }
                    }
                  }
                }
              } else {
                for (let color in colors) {
                  if (value == color) {
                    result = result.replace(rawValue, colors[color]);
                  }
                }
              }
            }
          }
          break;
        case "rgb":
          regex = RegExp("en\\(" + functions[i] + "\\((.*?)\\)", "g");
          matches = [...result.matchAll(regex)];
          if (matches.length != 0) {
            for (let i = 0; i < matches.length; i++) {
              let rawValue = matches[i][0];
              let value = matches[i][1].replace(/['"]+/g, "");
              result = result.replace(
                rawValue.substring(3),
                tinycolor(`rgb(${value})`).toHexString()
              );
            }
          }
          break;
        case "hsl":
          regex = RegExp("en\\(" + functions[i] + "\\((.*?)\\)", "g");
          matches = [...result.matchAll(regex)];
          if (matches.length != 0) {
            for (let i = 0; i < matches.length; i++) {
              let rawValue = matches[i][0];
              let value = matches[i][1].replace(/['"]+/g, "");
              result = result.replace(
                rawValue.substring(3),
                tinycolor(`hsl(${value})`).toHexString()
              );
            }
          }
          break;
        case "lighten":
          regex = RegExp(functions[i] + "\\((.*?)\\)", "g");
          matches = [...result.matchAll(regex)];
          if (matches.length != 0) {
            for (let i = 0; i < matches.length; i++) {
              let rawValue = matches[i][0];
              let value = matches[i][1]
                .replace(/ /g, "")
                .replace(/['"]+/g, "")
                .split(",");
              result = result.replace(
                rawValue,
                tinycolor(value[0]).lighten(value[1])
              );
            }
          }
          break;
        case "darken":
          regex = RegExp(functions[i] + "\\((.*?)\\)", "g");
          matches = [...result.matchAll(regex)];
          if (matches.length != 0) {
            for (let i = 0; i < matches.length; i++) {
              let rawValue = matches[i][0];
              let value = matches[i][1]
                .replace(/ /g, "")
                .replace(/['"]+/g, "")
                .split(",");
              result = result.replace(
                rawValue,
                tinycolor(value[0]).darken(value[1])
              );
            }
          }
          break;
        case "size":
          regex = RegExp("(?<!-)" + functions[i] + "\\((.*?)\\)", "g");
          matches = [...result.matchAll(regex)];
          if (matches.length != 0) {
            for (let i = 0; i < matches.length; i++) {
              let rawValue = matches[i][0];
              let value = matches[i][1].replace(/['"]+/g, "");
              result = result.replace(rawValue, sizes[value]);
            }
          }
          break;
        case "text-size":
          regex = RegExp(functions[i] + "\\((.*?)\\)", "g");
          matches = [...result.matchAll(regex)];
          if (matches.length != 0) {
            for (let i = 0; i < matches.length; i++) {
              let rawValue = matches[i][0];
              let value = matches[i][1].replace(/['"]+/g, "");
              result = result.replace(rawValue, textSizes[value]);
            }
          }
          break;
        default:
      }
    }

    return result;
  }
}

module.exports = SysFunctions;

 */
