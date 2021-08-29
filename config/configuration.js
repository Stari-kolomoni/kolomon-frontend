const path = require("path");

const baseConfig = {
    srcDirectory: path.resolve(__dirname, "..", "src"),
    distDirectory: path.resolve(__dirname, "..", "dist"),
};

const mainConfig = {
    isProductionEnv: process.env.NODE_ENV === "production",

    src: {
        indexHtml: path.resolve(baseConfig.srcDirectory, "html", "index.html"),
        appEntrypoint: path.resolve(baseConfig.srcDirectory, "app", "index.tsx")
    },

    dist: {
        htmlFilename: "index.html",
        bundleFilename: "bundle.js",
    }
};

module.exports = {
    baseConfig, mainConfig,
};
