import Vue from 'vue';
import Axios from 'axios';

import store from '@/store'

import * as constant from '@/constants/'

const http = {
    install(Vue, options) {
        const http = Axios.create();
        Vue.prototype.$WORDLINKAPI = Vue.WORDLINKAPI = http;

        this.setDefault();
        this.initHttpCredential();
    },

    setDefault() {
        if (constant.DEBUG) {
            store.dispatch('authenticate/UPDATE', {
                token: 'abc123',
                created: 0,
                updated: 0,

                level: 2,
                name: "開発 ユーザー",
            });
            console.warn("開発用テストトークンを付与")
        }

        Vue.WORDLINKAPI.defaults.baseURL = constant.BASE_URL;
        Vue.WORDLINKAPI.defaults.headers.common["X-Access-Token"] = store.state.authenticate.token;
        Vue.WORDLINKAPI.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        Vue.WORDLINKAPI.defaults.withCredentials = true;

        if (constant.DEBUG) {
            console.log(`X-Access-Token: ${store.state.authenticate.token}`)
        }
    },


    async initHttpCredential() {
        try {
            const response = await Vue.WORDLINKAPI.post(`/authentication/session`, {id: store.authenticate.token});
            const data = response.data;
            const isValid = data.result === 200;

            if (isValid) {
                store.dispatch('authenticate/RESET');
            } else {
                store.update('authenticate/UPDATE', { level: data.level } );
            }
        } catch (e) {
            store.dispatch('authenticate/RESET');
        }
    },
};

export default http;