//import CreateCSS from "../../preprocessor/preprocessor/createCSS.js";

class Components {
    constructor() {
        this.components = [];
        this.keys = {};
    }

    add(tree) {
        let index = this.components.push(tree) - 1;
        this.addKeys(tree, index);
    }

    addKeys(node, index) {
        let name = node.selector;
        if(name.startsWith(".")){
            name = name.substring(1);
        }
        this.keys[name] = index;
    }

    findComponent(name){
        return this.components[this.keys[name]];
    }

    getCSS(name) {
        const CreateCSS = window.mojoPreprocessor.CreateCSS;
        let component = this.findComponent(name);
        if(component !== undefined){
            return new CreateCSS().createCssSting([component]);
        }
        return false;
    }
}

let i = new Components();
export default i;

