import Vue from 'vue';
import { sync } from 'vue-router-sync'
import App from './App'

import store from "./store";

new Vue({
    el: '#app',
    store,
    render: h => h(App)
});