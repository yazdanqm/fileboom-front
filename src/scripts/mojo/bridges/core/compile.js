export default class Compile {
    constructor(cssModule) {
        this.cssModule = cssModule;
    }

    getPatterns() {
        let config = this.cssModule.config;
        let cssModule = this.cssModule;
        let allPseudos = this.cssModule.getPseudos();

        return createPattensCSS();

        function createPattensCSS() {
            let css = "";

            if (config.patterns !== undefined) {
                css += getPatternCSS(config.patterns);
            }

            function getPatternCSS(patterns, parent = '') {
                let css = "";

                for (let selector in patterns) {
                    let currentCSS = "";
                    let atSelector = false;
                    let p = selector;
                    while (p.startsWith(" "))
                        p = p.substring(1);
                    while (p.endsWith(" "))
                        p = p.substring(0,p.length - 1);

                    if (p.startsWith("@")) {
                        atSelector = true;
                        currentCSS += p + " {\n";
                    }

                    for (let variant in patterns[selector]) {
                        let string = patterns[selector][variant];
                        if (variant !== "style" && typeof string !== typeof '') {
                            let obj = {};
                            obj[variant] = string;
                            let s = getSpace(selector)
                            if(atSelector)
                                s.t = "";
                            currentCSS += getPatternCSS(obj, parent + s.s + s.t);
                            continue;
                        }

                        if (variant !== "style") {
                            string = string.replace(/\n/g, " ");
                            while (string.includes("  ")) string = string.substring(/  /g, " ");
                        }

                        let selectorSpl = selector.split(",");
                        let parentSpl = parent.split(",");


                        for (let i in selectorSpl) {

                            for (let pr in parentSpl) {
                                /*
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

                                 */


                                let p = "class", t, b, c, body, classes;

                                let sn = selectorSpl[i];
                                let pn = parentSpl[pr];

                                while (pn.startsWith(" ")) pn = pn.substring(1);
                                while (pn.endsWith(" ")) pn = pn.substring(0, pn.length - 1);

                                let plSpl = pn.split(" ");
                                for (let i in plSpl) {
                                    const pn = plSpl[i];
                                    let type = findAttributeType(pn);
                                    switch (type) {
                                        case 0:
                                            t = pn;
                                            break;
                                        case 1:
                                            b = pn;
                                            break;
                                        case 2:
                                            p = pn;
                                            break;
                                        case 3:
                                            c = pn;
                                            break;
                                    }
                                    if (type !== -1)
                                        plSpl[i] = "";
                                }
                                pn = plSpl.join(" ");


                                let type = findAttributeType(sn);
                                switch (type) {
                                    case 0:
                                        t = sn;
                                        break;
                                    case 1:
                                        b = sn;
                                        break;
                                    case 2:
                                        p = sn;
                                        break;
                                    case 3:
                                        c = sn;
                                        break;
                                }
                                if (type !== -1)
                                    sn = '';
                                //console.log(type)

                                sn = getSpace(sn)

                                let s = pn + sn.s + sn.t;
                                while (s.startsWith(" ")) s = s.substring(1);

                                if (variant === "style") {
                                    if (typeof string === typeof '') {
                                        body = string;
                                    } else if (Array.isArray(string)) {
                                        body = string.join(";")
                                    } else {
                                        body = '';
                                        for (let i in string) {
                                            body += `${i.replace(/[A-Z]/g, (match, offset) => (offset > 0 ? '-' : '') + match.toLowerCase())}: ${string[i]};`;
                                        }
                                        body = body.substring(0, body.length - 1)
                                    }
                                    classes = [""];
                                } else {
                                    classes = string.split(" ")
                                    if (variant.includes(":")) {
                                        let variantSpl = variant.split(":");
                                        for (let i in variantSpl) {
                                            let type = findAttributeType(variantSpl[i]);
                                            switch (type) {
                                                case 0:
                                                    t = variantSpl[i];
                                                    break;
                                                case 1:
                                                    b = variantSpl[i];
                                                    break;
                                                case 2:
                                                    p = variantSpl[i];
                                                    break;
                                                case 3:
                                                    c = variantSpl[i];
                                                    break;

                                            }
                                        }
                                    } else {
                                        let type = findAttributeType(variant);
                                        switch (type) {
                                            case 0:
                                                t = variant;
                                                break;
                                            case 1:
                                                b = variant;
                                                break;
                                            case 2:
                                                p = variant;
                                                break;
                                            case 3:
                                                c = variant;
                                                break;
                                        }
                                    }
                                }

                                let opt = {
                                    body,
                                    isExtend: true,
                                    selector: s,
                                    classes,
                                    pseudo: p,
                                    theme: t,
                                    children: c,
                                    breakpoint: b,
                                };
                                currentCSS += cssModule.init(opt).getStyles().css;

                            }

                        }
                    }

                    if(atSelector) {
                        currentCSS = currentCSS.replace(/\n/g,"\n\t");
                        currentCSS += "\n}\n";
                        currentCSS = currentCSS.replace(/\n\t\n/g,"\n");
                    }
                    css += currentCSS;
                }

                return css;
            }

            function getBpName(bp) {
                if (bp.startsWith("i-")) return bp.replace("i-", "");

                return bp;
            }

            function getSpace(text) {
                let s = ' ';
                if (text.startsWith("&")) {
                    s = '';
                    text = text.substring(1);
                }

                return {s, t: text}
            }

            return css;
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
    }

    compile() {
        let allPseudos = this.cssModule.getPseudos();
        let config = this.cssModule.config;
        let cssModule = this.cssModule;

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

        let css = "";

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
                                        break;
                                    case 1:
                                        attr.breakpoint = s[j];
                                        break;
                                    case 2:
                                        attr.pseudo = s[j];
                                        break;
                                    case 3:
                                        attr.children = s[j];
                                        break;
                                }
                            }
                            if (attr.theme || attr.breakpoint || attr.pseudo)
                                attributes[el.attributes[i].nodeName] = attr;
                        } else {
                            let type = findAttributeType(el.attributes[i].nodeName);
                            switch (type) {
                                case 0:
                                    attributes[el.attributes[i].nodeName] = {
                                        theme: el.attributes[i].nodeName,
                                    };
                                    break;
                                case 1:
                                    attributes[el.attributes[i].nodeName] = {
                                        breakpoint: el.attributes[i].nodeName,
                                    };
                                    break;
                                case 2:
                                    attributes[el.attributes[i].nodeName] = {
                                        pseudo: el.attributes[i].nodeName,
                                    };
                                    break;
                                case 3:
                                    attributes[el.attributes[i].nodeName] = {
                                        children: el.attributes[i].nodeName,
                                    };
                                    break;
                            }
                        }
                    }
                }
            });


            return {
                attributes: attributes,
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
    }
}
