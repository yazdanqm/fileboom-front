class DownloadStyles {
    constructor(mainFile) {
        this.mainFile = mainFile;
    }

    getStyles(){
        let styles = '';
        try {
            styles = this.downloadFile(this.mainFile);
            styles = this.importStyles(styles);
            styles = this.removeComments(styles);
        } catch (ignored) {
            console.log(ignored)
        }

        return styles;
    }

    downloadFile(url) {
        let request = new XMLHttpRequest();
        request.open('GET', url, false);
        request.send(null);

        if (request.status === 200) {
            return request.responseText;
        }

        return "";
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
                    importedFile = this.downloadFile(pathSplit.join("/") + "/" + matchedImportPath + ".mojo") + "\n"
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

export default DownloadStyles;