const path = require('path');

module.exports = {
    system: {
        version: 'PRE ALPHA 0.1',
        api: {
            dev: {
                base: "http://localhost:3000",
            },
            prod: {
                base: "https://api.wordlink.biz",
                oauth_redirect: "https://app.wordlink.biz",
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
