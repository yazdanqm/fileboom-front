import path from "path";
import { fileURLToPath } from "url";
import TerserPlugin from 'terser-webpack-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    mode: "production",
    entry: "./window-core.js",
    output: {
        filename: "mojo.js",
        path: path.resolve(__dirname, "dist"),
        /*
        library: {
            type: "module",
        },
         */
    },
    experiments: {
        outputModule: true,
    },
    optimization: {
        moduleIds: 'size',
        mangleWasmImports: true,
        concatenateModules: false,
        /*
        minimizer: [
            new TerserPlugin({
                parallel: true,
                extractComments: false,
                terserOptions: {
                    keep_classnames: false,
                    keep_fnames: false,
                    // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                },
            }),
        ],
         */
    },
};
