export default class CssString {
  constructor(args) {
    this.args = args;
  }

  getCss() {
    const args = this.args;
    if (args.utilityPseudo === undefined) args.utilityPseudo = "";
    if (args.attribute === undefined) args.attribute = "class";

    args.attribute = args.attribute.replace(/:/g, "\\:");

    let append = args.utilityPseudo;
    if (args.children !== undefined) {
      const childArr = args.children.split("-");
      childArr.shift();
      let cType = childArr.pop();
      if (cType !== "first" && cType !== "all") {
        childArr.push(cType);
        cType = "first";
      }

      let childTag = childArr.join("-");
      if (childTag.replace(/ /g, "").length === 0) childTag = "*";

      if (cType === "first") append += " > " + childTag;
      else if (cType === "all") append += " " + childTag;
    }

    let themes = [""];
    if (args.theme !== undefined && args.theme.length > 0) {
      themes = [];
      if (args.theme.startsWith("i-")) {
        let theme = args.theme.substring(2);
        if (theme === "default")
          themes.push(`html:is([m-theme]):not([m-theme="default"]) `);
        else themes.push(`html:not([m-theme="${theme}"]) `);
      } else {
        if (args.theme === "default") {
          themes.push(`html:not([m-theme]) `);
          themes.push(`[m-theme="default"] `);
        } else {
          themes.push(`[m-theme="${args.theme}"] `);
        }
      }
    }
    const pseudos = CssString.pseudos;

    if (!this.args.isExtend) {
      if (
        (args.pseudo === "class" || args.pseudo === "idle") &&
        (args.attribute === "class" || args.attribute === "idle")
      ) {
        let s = "",
          first = true;
        for (let theme of themes) {
          if (first) first = false;
          else s += ",\n";

          s += `${theme}.${args.className}${append}`;
        }
        s += ` {\n    ${args.body}\n}\n`;

        return s;
      } else if (pseudos[args.pseudo] !== undefined) {
        const v = pseudos[args.pseudo];
        let s = "";
        if (v.media) {
          s += `@media ${v.media} {\n`;
        }

        let first = true;
        for (let theme of themes) {
          if (first) first = false;
          else s += ",\n";

          s += theme;
          if (v.parent) {
            s += `${v.parent} `;
          }
          s += `[${args.attribute}~="${args.className}"]`;
          if (v.pseudo) {
            s += `:${v.pseudo}`;
          }
          s+= append
        }

        s += ` {\n    ${args.body}\n}`;
        if (v.media) {
          s = s.replace(/\n/g, "\n    ");
          s += `\n}`;
        }
        s += "\n";
        return s;
      }
    } else {
      if (args.pseudo === undefined) {
        return args.body;
      } else if (args.pseudo === "class" || args.pseudo === "idle") {
        let s = "",
          first = true;
        for (let theme of themes) {
          if (first) first = false;
          else s += ",\n";

          s += `${theme}${args.className}${append}`;
        }
        s += ` {\n    ${args.body}\n}\n`;

        return s;
      } else if (pseudos[args.pseudo] !== undefined) {
        const v = pseudos[args.pseudo];
        let s = "";
        if (v.media) {
          s += `@media ${v.media} {\n`;
        }

        let first = true;
        for (let theme of themes) {
          if (first) first = false;
          else s += ",\n";

          s += theme;
          if (v.parent) {
            s += `${v.parent} `;
          }
          s += args.className;
          if (v.pseudo) {
            s += `:${v.pseudo}`;
          }
          s += append;
        }
        s += ` {\n    ${args.body}\n}`;
        if (v.media) {
          s = s.replace(/\n/g, "\n    ");
          s += `\n}`;
        }
        s += "\n";

        return s;
      }
    }

    /*
        if (!this.args.isExtend) {
            if (args.pseudo === "class" || args.pseudo === "idle") {
                if (args.prefix.length === 0) {
                    let s = '',first = true;
                    for(let theme of themes){
                        if(first)
                            first = false;
                        else
                            s += ',\n';

                        s += `${theme}.${args.className}${append}`
                    }
                    s += ` {\n    ${args.body}\n}\n`

                    return s;
                } else {
                    let s = '',first = true;
                    for(let theme of themes){
                        if(first)
                            first = false;
                        else
                            s += ',\n';

                        s += `${theme}[${args.attribute}~="${args.className}"]${append}`
                    }
                    s += ` {\n    ${args.body}\n}\n`

                    return s;
                }
            } else if (pseudos[args.pseudo] !== undefined) {
                const v = pseudos[args.pseudo];
                let s = '';
                if (v.media) {
                    s += `@media ${v.media} {\n`
                }

                let first = true;
                for(let theme of themes) {
                    if(first)
                        first = false;
                    else
                        s += ',\n';

                    s += theme;
                    if (v.parent) {
                        s += `${v.parent} `
                    }
                    s += `[${args.attribute}~="${args.className}"]${append}`;
                    if (v.pseudo) {
                        s += `:${v.pseudo}`;
                    }
                }

                s += ` {\n    ${args.body}\n}`;
                if (v.media) {
                    s = s.replace(/\n/g, "\n    ")
                    s += `\n}`
                }
                s += "\n"
                return s;
            }
        } else {
            if (args.pseudo === undefined) {
                return args.body;
            } else if (args.pseudo === "class" || args.pseudo === "idle") {
                let s = '',first = true;
                for(let theme of themes){
                    if(first)
                        first = false;
                    else
                        s += ',\n';

                    s += `${theme}${args.className}${append}`
                }
                s += ` {\n    ${args.body}\n}\n`

                return s;
            } else if (pseudos[args.pseudo] !== undefined) {
                const v = pseudos[args.pseudo];
                let s = '';
                if (v.media) {
                    s += `@media ${v.media} {\n`
                }

                let first = true;
                for(let theme of themes) {
                    if (first)
                        first = false;
                    else
                        s += ',\n';

                    s += theme;
                    if (v.parent) {
                        s += `${v.parent} `
                    }
                    s += args.className
                    if (v.pseudo) {
                        s += `:${v.pseudo}`;
                    }
                    s += append;
                }
                s += ` {\n    ${args.body}\n}`;
                if (v.media) {
                    s = s.replace(/\n/g, "\n    ")
                    s += `\n}`
                }
                s += "\n"

                return s;
            }
        }

         */

    return "";
  }
}

CssString.pseudos = {
  class: {},
  hover: {
    pseudo: "hover",
  },
  focus: {
    pseudo: "focus",
  },
  active: {
    pseudo: "active",
  },
  first: {
    pseudo: "first-child",
  },
  last: {
    pseudo: "last-child",
  },
  even: {
    pseudo: "nth-child(even)",
  },
  odd: {
    pseudo: "nth-child(odd)",
  },
  "focus-within": {
    pseudo: "focus-within",
  },
  visited: {
    pseudo: "visited",
  },
  "not-first": {
    pseudo: "not(:first-child)",
  },
  "not-last": {
    pseudo: "not(:last-child)",
  },
  disabled: {
    pseudo: "disabled",
  },
  checked: {
    pseudo: "checked",
  },
  "not-checked": {
    pseudo: "not(:checked)",
  },
  invalid: {
    pseudo: "invalid",
  },
  valid: {
    pseudo: "valid",
  },
  optional: {
    pseudo: "optional",
  },
  "read-only": {
    pseudo: "read-only",
  },
  "focus-visible": {
    pseudo: "focus-visible",
  },
  indeterminate: {
    pseudo: "indeterminate",
  },
  required: {
    pseudo: "required",
  },
  empty: {
    pseudo: "empty",
  },
  before: {
    pseudo: ":before",
  },
  after: {
    pseudo: ":after",
  },
  selection: {
    pseudo: ":selection",
  },
  "first-letter": {
    pseudo: ":first-letter",
  },
  "first-line": {
    pseudo: ":first-line",
  },
  "parent-hover": {
    parent: "[parent]:hover",
  },
  "parent-focus": {
    parent: "[parent]:focus",
  },
  "parent-active": {
    parent: "[parent]:active",
  },
  "parent-visited": {
    parent: "[parent]:visited",
  },
  "sibling-hover": {
    parent: "[sibling]:hover ~",
  },
  "sibling-focus": {
    parent: "[sibling]:focus ~",
  },
  "sibling-checked": {
    parent: "[sibling]:checked ~",
  },
  rtl: {
    parent: "[dir='rtl']",
  },
  print: {
    media: "print",
  },
};
