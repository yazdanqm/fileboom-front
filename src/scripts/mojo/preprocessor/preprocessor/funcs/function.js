class Function {
    constructor(name) {
        this.regex = RegExp( name + "\\((.*?)\\)", "g");
    }

    findMatches(str){
        return [...str.matchAll(this.regex)];
    }
}

export default Function;