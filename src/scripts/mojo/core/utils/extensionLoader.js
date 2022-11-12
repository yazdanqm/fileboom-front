let CreateTree = undefined;

export default class ExtensionLoader {
    constructor(config,cssModule) {
        let c = {...config};
        delete c.extensions;


            for (let i in config.extensions) {
                let func,args = [];
                if (typeof config.extensions[i] === "function") {
                    func = config.extensions[i];
                }
                if (typeof config.extensions[i] === "object" && typeof config.extensions[i]["function"] === "function") {
                    func = config.extensions[i]["function"];
                    args = config.extensions[i]["arguments"];
                }
                if(func) {
                    try {
                        func.call(new Extension({
                            config: c,
                            cssModule
                        }), ...args)
                    } catch (e) {
                        console.warn(e)
                    }
                }
            }

    }
}

class Extension {
    constructor(args) {
        this.config = args.config;
        Object.freeze(this.config);

        this.addUtility = function (name, props, isStatic = true){
            args.cssModule.addUtility(name,props, isStatic);
        }
        this.addComponent = function (css){
            let style = css.replace(/\n/g,"");
            style = style.replace(/\r/g,"");
            let cname = style.match(/([^\r\n,{}]+)(,(?=[^}]*{)|\s*{)/g);
            for(let i in cname){
                let n = cname[i];
                n = n.split("{")[0]
                while (n.endsWith(" ") || n.endsWith("{"))
                    n = n.substring(0, n.length - 1)
                while (n.startsWith(" ") || n.startsWith("."))
                    n = n.substring(1)

                if(!n.includes(" "))
                    args.cssModule.componentList.add(n);
            }

            let i = 0;
            function f() {
                if (window.mojoPreprocessor === undefined || window.mojoPreprocessor.CreateTree === undefined) {
                    if (++i < 1000) {
                        setTimeout(f, 1);
                    } else {
                        new Error("failed to find mojo preprocessor to add components")
                    }

                    return;
                }
                CreateTree = window.mojoPreprocessor.CreateTree;
                let tree = new CreateTree(css);
                for (let i in tree)
                    args.cssModule.addComponent(tree[i]);
            }
            f();
        }
        this.addVariant = function (name, obj){
            args.cssModule.addVariant(name,obj);
        }
        this.getStyles = function (classes){
            let opt = {
                classes,
                isExtend: true
            }
            return args.cssModule.init(opt).getStyles().css.replace(/\n/g,"").replace(/    /g,"");
        }

        function getBody(body){
            if(Array.isArray(body)) {
                return body.join(";");
            } else if(typeof body === "object") {
                let b = "";
                for (let i in body){
                    b += `${i}: ${body[i]};`
                }
            } else {
                return body;
            }
        }
    }
}


