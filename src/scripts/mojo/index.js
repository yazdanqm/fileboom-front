import mojo from "./bridges/core.js";

export default function m(config, urls = undefined) {
    mojo(config,urls);
}

if(window !== undefined)
    window.mojo = m;