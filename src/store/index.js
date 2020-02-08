import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import ApplicationModule from "./modules/application"
import AuthenticateModule from './modules/authenticate'
import AlertModule from './modules/alerts'

const store = new Vuex.Store({
    modules: {
        application: ApplicationModule,
        authenticate: AuthenticateModule,
        alert: AlertModule,
    }
});

export default store;