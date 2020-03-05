const path = require('path');

module.exports = {
    system: {
        version: 'PRE ALPHA 0.1',
        api: {
            dev: {
                base: "http://localhost:9000",
            },
            prod: {
                base: "https://wordlink-demo-b2.mozhok.me",
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
        port: 3000,
        autoOpenBrowser: true,
        cssSourceMap: true,
    },
    express: {
        host: '0.0.0.0',
        port: 8888,
    }
};
