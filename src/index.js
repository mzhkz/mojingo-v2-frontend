import Vue from 'vue';
import { sync } from 'vue-router-sync'
import App from './App'

import router from './router'
import store from "./store";
import API from './api/http'

sync(store, router);

Vue.use(API);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});