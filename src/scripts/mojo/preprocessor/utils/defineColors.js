class DefineColors {
  constructor(config) {
    this.config = config;
  }

  getColors(tinycolor) {
    let colors = {};
    for (let color in this.config.base.themes.default) {
      colors[`${color}`] = `rgba(var(--m-color-${color}), 1)`;
      for (let j = 1; j <= 5; j++) {
        colors[`${color}-${j}`] = `rgba(var(--m-color-${color}-l-${j}), 1)`;
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

    return {
      colors,
      colorsExact,
    };
  }
}

export default DefineColors;
