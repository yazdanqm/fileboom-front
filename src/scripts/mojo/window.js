import mojo from "./bridges/core.js";
import loader from "./bridges/preprocessor.js";

function m(config, urls = undefined) {
    mojo(config, function (core) {
        console.log(loader)
        loader(urls, core);
    });
}

window.mojo = m;