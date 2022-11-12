export default class Utility {
    constructor(config,value) {
        this.config = config;

        if(value.startsWith("(") && value.endsWith(")"))
            this.value = value.substring(1,value.length - 1);
        else {
            if(value.endsWith("-")){
                value = "-" + value.substring(0,value.length - 1);
            }
            this.value = value;
            this.isSemiDynamic = true;
        }

        this.isVariable = this.value.startsWith("--");

        this.funcValues = [];

        if (this.value.includes("(")) {
            if (this.value.includes("hsl") && (this.value.includes("%") || this.value.includes("°"))) {
                this.value = this.value.replace(/%/g, "");
                this.value = this.value.replace(/°/g, "");
            }

            let temp = this.value.split("(").pop();
            temp = temp.substring(0, temp.length - 1);

            this.funcValues = temp.split(",");
        }

    }

    toCss(prop,value) {
        return `${prop}: ${value}`;
    }
}
