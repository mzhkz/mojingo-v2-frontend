import Vue from 'vue';
import Axios from 'axios';

import store from '@/store'
import router from '@/router'

import * as constant from '@/constants/'

const http = {
    install(Vue, options) {
        Vue.prototype.$WORDLINKAPI = Vue.WORDLINKAPI = Axios.create();

        this.setDefault();
        this.addInterceptors();
        // this.initHttpCredential()
    },

    setDefault() {
        if (constant.DEBUG) {
            // store.dispatch('authenticate/UPDATE', {
            //     token: 'abc123',
            //     created: 0,
            //     updated: 0,
            //
            //     level: 2,
            //     name: "Hanako Saitou",
            // });
            // console.warn("開発用テストトークンを付与")
        }
        const cache = JSON.parse(localStorage.getItem('_SESSION'));
        if (cache) {
            store.dispatch('authenticate/UPDATE', cache.auth);
        }

        store.state.application.serviceAccount = constant.GOOGLE_SERVICE_ACCOUNT;

        Vue.WORDLINKAPI.defaults.baseURL = constant.BASE_URL;
        Vue.WORDLINKAPI.defaults.headers.common["X-Access-Token"] = store.state.authenticate.token;
        Vue.WORDLINKAPI.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        Vue.WORDLINKAPI.defaults.withCredentials = true;

        if (constant.DEBUG) {
            console.log(`X-Access-Token: ${store.state.authenticate.token}`)
        }
    },


    addInterceptors() {
        Vue.WORDLINKAPI.interceptors.request.use((config) => {
            if (constant.DEBUG) console.log(config);
            store.dispatch('application/SET_FETCHING', true);

            return Promise.resolve(config);
        });

        Vue.WORDLINKAPI.interceptors.response.use((response) => {
            if (constant.DEBUG) console.log(response);
            store.dispatch('application/SET_FETCHING', false);
            // store.dispatch('alert/CLEAR_ALERT');
            const responseData = response.data;
            const {result, message, data} = responseData;
            if (result !== 200 && response.headers["content-type"].indexOf('application/json') > -1) {
                if (result === 401) {
                    store.dispatch('authenticate/UPDATE', {});
                    router.push({ name: 'login'});
                }
                const icon = result === 500 ? "bug" : "exclamation-triangle";
                store.dispatch('alert/PUSH_ALERT', {icon: icon, level: 3, message: message});
                return Promise.reject();
            }
            return Promise.resolve(responseData);

        }, (error => {
            if (!this.isInvalidToken(error)) {
                store.dispatch('alert/PUSH_ALERT', {icon: "exclamation-triangle", level: 3, message: error});
            } else {
                store.dispatch('authenticate/UPDATE', { active: false });
                router.push({ name: 'login'});
                store.dispatch('alert/PUSH_ALERT', {icon: "exclamation-triangle", level: 3, message: error});
            }
            return Promise.reject(error);
        }));

        store.watch((state) => state.authenticate.token, () => {
            Vue.WORDLINKAPI.defaults.headers.common["X-Access-Token"] = store.state.authenticate.token;
        });
    },

    isInvalidToken(response) {
        if (response === undefined) return false;
        const status = response.status || 402;
        return status === 401;
    },

    async initHttpCredential() {
        try {
            const response = await Vue.WORDLINKAPI.post(`/authentication/session`, {id: store.authenticate.token});
            const data = response.data;
            const isValid = data.result === 200;

            if (isValid) {
                store.dispatch('authenticate/RESET');
            } else {
                store.update('authenticate/UPDATE', {level: data.level});
            }
        } catch (e) {
            store.dispatch('authenticate/RESET');
        }
    },
};

export default http;