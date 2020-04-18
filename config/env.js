const config = require('./index');

const IS_PRODUCTION =  process.env.NODE_ENV === 'production' || false;

module.exports = {
    ENV_IS_PROD: IS_PRODUCTION, //本番環境かどうか
    ENVS: { //環境変数
        APP_ENV_PROD: IS_PRODUCTION,
        APP_ENV_DEBUG: !IS_PRODUCTION,
        APP_VERSION: config.system.version,
    },
};