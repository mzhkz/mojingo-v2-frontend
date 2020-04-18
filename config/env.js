const config = require('./index');

const IS_PRODUCTION =  process.env.NODE_ENV === 'production' || false;

module.exports = {
    ENV_IS_PROD: IS_PRODUCTION, //本番環境かどうか
    ENVS: { //環境変数
        APP_ENV_PROD: IS_PRODUCTION,
        APP_ENV_DEBUG: !IS_PRODUCTION,
        APP_VERSION: config.system.version,

        API_BASE: process.env.MOJINGOV2_API_BASE_URL,
        APP_SERVICE_ACCOUNT: process.env.MOJINGOV2_APP_SERVICE_ACCOUNT,
    },
};