class Statics {
    static fixString(str) {
        let string = str.replace(/\r\n/g, "");
        string = string.replace(/\n/g, " ");
        string = string.replace(/\r/g, "");
        string = string.replace(/\t/g, "");

        while (string.startsWith(" ")) string = string.substring(1);

        while (string.endsWith(" ")) string = string.substring(0, string.length - 1);

        while (string.includes("  ")) string = string.replace(/\ \ /g, " ");

        string = string.replace(/ {/g, "{");
        string = string.replace(/{ /g, "{");
        string = string.replace(/ }/g, "}");

        return string;
    }
}

export default Statics;