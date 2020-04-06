const path = require('path');

module.exports = {
    system: {
        version: '2.0',
        api: {
            dev: {
                base: "http://localhost:8000",
            },
            prod: {
                base: "https://api-v2.mojingo.me",
            }
        }
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
    express: {
        host: '10.146.0.2',
        port: 8888,
    }
};
