const config = require('./index');

const IS_PRODUCTION =  process.env.NODE_ENV === 'production' || false;

module.exports = {
    ENV_IS_PROD: IS_PRODUCTION, //本番環境かどうか
    ENVS: { //環境変数
        APP_ENV_PROD: IS_PRODUCTION,
        APP_ENV_DEBUG: !IS_PRODUCTION,
        APP_VERSION: config.system.version,
        API_BASE_URL: IS_PRODUCTION ? config.system.api.prod.base : config.system.api.dev.base,
        API_OAUTH_REDIRECT_HOST:  IS_PRODUCTION ? config.system.api.prod.oauth_redirect : `http://${config.dev.host}:${config.dev.port}`
    },
};