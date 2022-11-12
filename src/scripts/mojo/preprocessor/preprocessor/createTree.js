import XRegExp from "../../lib/xregexp.js";
import Statics from "../utils/statics.js";

class CreateTree {
    constructor(styles) {
        return this.createNestedTree(styles);
    }

    createNestedTree(str) {
        let nodes = [];
        let array = XRegExp.matchRecursive(str, "{", "}", "g", {
            valueNames: ["selector", null, "content", null],
            escapeChar: "\\",
        });

        for (let i = 0; i < array.length - 1; i = i + 2) {
            let node = {};
            node.selector = Statics.fixString(array[i].value);
            if (node.selector.includes(";")) {
                node.selector = Statics.fixString(node.selector.split(/;(?=(?:(?:[^"]*"){2})*[^"]*$)(?=(?:(?:[^']*'){2})*[^']*$)/).pop());
            }

            node.value = Statics.fixString(array[i + 1].value);
            node.valueArr = [];
            if (node.value.includes("{")) {
                node.childs = this.createNestedTree(node.value);
                node.value = this.removeChilds(node.value);
            }

            node.value = node.value.replace(/; /g,";");
            node.value = node.value.replace(/ ;/g,";");
            node.valueArr = node.value.split(/;(?=(?:(?:[^"]*"){2})*[^"]*$)(?=(?:(?:[^']*'){2})*[^']*$)/).filter(e =>  e);
            delete node.value;

            nodes.push(node);
        }

        return nodes;
    }


    removeChilds(string) {
        let count = 0;
        let start = -1;
        let semi = 0;
        for (let i = 0; i < string.length; i++) {
            if (string[i] === ";" && count === 0) {
                semi = i;
            }
            if (string[i] === "{") {
                if (count === 0) start = i;

                count++;
            }

            if (string[i] === "}") {
                count--;

                if (count === 0) {
                    string = string.substring(0, semi) + ";" + string.substring(i + 1);
                    i = semi - 1;
                }
            }
        }

        if (string.length < 2) string = "";

        return string;
    }
}

export default CreateTree;