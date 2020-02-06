// Debug
export const DEBUG = process.env.APP_ENV_DEBUG;

//Backend API endpoint
export const BASE_URL = process.env.API_BASE_URL;
export const OAUTH_REDIRECT_HOST = process.env.API_OAUTH_REDIRECT_HOST;

export const REFRESH_TOKEN_URL = '/account/token/refresh';

//Storage keys
export const AUTH_STORAGE_KEY = "_auth_session";

export const ACCESS_TOKEN_HEADER_NAME = "X-Access-Token";

export const CURRENT_APP_VERSION = process.env.APP_VERSION;