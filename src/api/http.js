import Vue from 'vue';
import Axios from 'axios';

import store from '@/store'

import * as constant from '@/constants/'

export const http = {
    install(Vue, options) {
        const http = Axios.create();
        Vue.prototype.$WORDLINKAPI = Vue.WORDLINKAPI = http;

        this.setDefault();
        this.initHttpcredential();
    },

    setDefault() {
        Vue.http.defaults.baseURL = constant.BASE_URL;
        Vue.http.defaults.headers.common["X-Access-Token"] = store.state.authenticate.token;
        Vue.http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        Vue.http.defaults.withCredentials = true;

        if (constant.DEBUG) {
            console.log(`X-Access-Token: ${store.state.authenticate.token}`)
        }
    },


    async initHttpcredential() {
        const response = await Vue.$WORDLINKAPI.post(`/authentication/session`);
        const isValid = response.data.result === 200;

        if (isValid) {
            store.dispatch('authenticate/reset')
        } else {
            store.update('authenticate/update', { active: true } );
        }
    },
};