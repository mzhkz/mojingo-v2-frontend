import Vue from 'vue'
import Vuex from 'vuex'

import Plugin from './plugin'

Vue.use(Vuex);

import ApplicationModule from "./modules/application"
import AuthenticateModule from './modules/authenticate'
import AlertModule from './modules/alert'

const store = new Vuex.Store({
    modules: {
        application: ApplicationModule,
        authenticate: AuthenticateModule,
        alert: AlertModule,
    },
    plugins: [Plugin]
});

export default store;