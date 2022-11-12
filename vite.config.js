import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";

const pageData = {
  "/index.html": {
    title: "Main Page",
  },
  "/mockup-single.html": {
    title: "mockup-single Page",
  },
  "/font-single.html": {
    title: "font-single Page",
  },
  "/mockup-cat.html": {
    title: "mockup-cat Page",
  },
  "/mockup-cat-child.html": {
    title: "mockup-cat-child Page",
  },
  "/font-cat.html": {
    title: "font-cat Page",
  },
  "/plugin-cat.html": {
    title: "plugin-cat Page",
  },
  "/vip.html": {
    title: "vip Page",
  },
  "/download.html": {
    title: "download Page",
  },
  "/contact.html": {
    title: "contact Page",
  },
  "/guide.html": {
    title: "guide Page",
  },
  "/cart-first.html": {
    title: "cart-first Page",
  },
  "/cart-detail.html":{
    title: "cart-detail Page"
  },
  "/cart-order.html" : {
    title : "cart-detail Page"
  }
};

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        nested: resolve(__dirname, "mockup-single.html"),
        nestedq: resolve(__dirname, "font-single.html"),
        nestedw: resolve(__dirname, "mockup-cat.html"),
        nestede: resolve(__dirname, "mockup-cat-child.html"),
        nestedr: resolve(__dirname, "font-cat.html"),
        nestedt: resolve(__dirname, "plugin-cat.html"),
        nestedy: resolve(__dirname, "vip.html"),
        nestedu: resolve(__dirname, "download.html"),
        nestedi: resolve(__dirname, "contact.html"),
        nestedo: resolve(__dirname, "guide.html"),
        nestedoo: resolve(__dirname, "cart-first.html"),
        nestedooo: resolve(__dirname, "cart-detail.html"),
        nestedoooo: resolve(__dirname, "cart-order.html"),
      },
    },
  },
  plugins: [
    handlebars({
      context(pagePath) {
        return pageData[pagePath];
      },
      partialDirectory: resolve(__dirname, "src/sections"),
    }),
  ],
});
