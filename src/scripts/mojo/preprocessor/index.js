import ReadStyles from "./utils/readStyles.js";
import CreateTree from "./preprocessor/createTree.js";
import Process from "./preprocessor/process.js";
import CreateCSS from "./preprocessor/createCSS.js";
import tinycolor from "../lib/tinycolor.js";

class ProcessorModule {
    init(args = {}) {
        this.mainFile = args.mainFile;
        this.config = args.config;
        this.cssModule = args.cssModule;

        return this;
    }

    compile() {
        let styles = new ReadStyles(this.mainFile).getStyles();
        let t1 = Date.now();
        let stylesTree = new CreateTree(styles);
        let processedStyles = new Process({
            config: this.config,
            cssModule: this.cssModule,
            tinycolor,
        }).process(stylesTree);
        styles = new CreateCSS({
            config: this.config,
            cssModule: this.cssModule,
        }).createCssSting(processedStyles);
        let t2 = Date.now();

        return {
            css: styles,
            time: t2 - t1
        }
    }
}

const processorModule = new ProcessorModule();
export default processorModule;
