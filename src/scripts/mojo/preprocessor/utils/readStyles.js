import * as fs from 'fs';

class ReadStyles {
    constructor(mainFile) {
        this.mainFile = mainFile;
    }

    getStyles(){
        let styles = '';
        try {
            styles = fs.readFileSync(this.mainFile, "utf8");
            styles = this.importStyles(styles);
            styles = this.removeComments(styles);
        } catch (ignored) {
            console.log(ignored)
        }

        return styles;
    }


    importStyles(styles) {
        styles = this.removeComments(styles);
        let pathSplit = (this.mainFile).split("/");
        pathSplit.pop();


        let regex = RegExp('@import \\"(.*?)\\";', "g");
        let matches = [...styles.matchAll(regex)];
        if (matches.length > 0) {
            for (let i = 0; i < matches.length; i++) {
                let importedFile = "";
                let matchedImport = matches[i][0];
                let matchedImportPath = matches[i][1];

                try {
                    importedFile = fs.readFileSync(pathSplit.join("/") + "/" + matchedImportPath + ".scss", "utf8") + "\n"
                } catch (ignored) {
                    //console.warn(ignored)
                }

                //console.log(importedFile)

                while (matchedImport.includes("  "))
                    importedFile = importedFile.replace(/  /g, " ");

                if (matchedImportPath.includes("/")) {
                    let pathSpl = matchedImportPath.split("/");
                    pathSpl.pop()

                    importedFile = importedFile.replace(/@import "/g, '@import "' + pathSpl.join("/") + "/")
                }

                styles = styles.replace(matchedImport, importedFile);
            }
            styles = this.importStyles(styles)
        }

        return styles;
    }

    removeComments(styles){
        return styles.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
    }
}

export default ReadStyles;