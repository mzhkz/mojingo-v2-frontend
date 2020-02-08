import Vue from 'vue';
import SuiVue from 'semantic-ui-vue';
import { sync } from 'vuex-router-sync';

import 'semantic-ui-css/semantic.min.css';

import App from './App'
//
import router from './router'
import store from "./store";
import http from './api/http'
//
import * as constants from './constants'

// Sync router to store, as `store.state.route`.
sync(store, router);

Vue.use(SuiVue);
Vue.use(http);
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});

console.log(`Welcome to Wordlink ${constants.CURRENT_APP_VERSION}`);
