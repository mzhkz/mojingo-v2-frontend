const path = require('path');
const config = require('../config');
const env = require('../config/env');

exports.contentsDir = function (_path) {
    return (env.ENV_IS_PROD
        ? config.build.contentsDir
        : config.dev.contentsDir) + '/' + _path ;
};


exports.staticsDir = function (_path) {
    return (env.ENV_IS_PROD
        ? config.build.staticsDir
        : config.dev.staticsDir) + '/' + _path;
};

exports.resolve = function (dir) {
    return path.join(__dirname, '..', dir)
};

exports.srcDir = function (_path) {
    return path.resolve(__dirname + '/../src', _path)
};
