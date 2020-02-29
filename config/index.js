const path = require('path');

module.exports = {
    system: {
        version: 'PRE ALPHA 1.1',
        api: {
            dev: {
                base: "http://localhost:3000",
            },
            prod: {
                base: "https://api.mojingo.me",
                oauth_redirect: "https://app.mojingo.me",
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
    }
};
