const path = require('path');

module.exports = {
    system: {
        version: '2.0',
    },
    build: {
        bundleDir: path.resolve(__dirname, '../dist'),
        contentsDir: '_contents',
        staticsDir: '_statics',
        publicPath: '/',
    },
    dev: {
        contentsDir: '_contents',
        staticsDir: '_statics',
        publicPath: '/',
        host: "localhost",
        port: 3333,
        autoOpenBrowser: true,
        cssSourceMap: true,
    },
};
