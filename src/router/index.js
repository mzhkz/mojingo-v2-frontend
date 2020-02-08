import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '@/store'
import * as constants from '@/constants'

Vue.use(Router);

async function goLogin(to, from, next, need) {
    const level = store.state.authenticate.level;
   if (need > level) {
       await store.dispatch('alert/PUSH_ALERT', {
           message: 'ログインしてください。',
           icon: 'close',
           level: 'danger'
       });
       await store.dispatch('application/SET_LAYOUT', 'TopBarLayout');
       next({name: 'login', query: {redirect: to.fullPath || '/'}});
   } else {
       next();
   }
}

const router = new Router({
    history: true,
    base: '/',
    mode: constants.DEBUG ? 'hash' : 'history',
    routes: routes.map(route => ({
        name: route.name,
        path: route.path,
        components: route.components,
        beforeEnter: (to, from, next) => {
            store.dispatch('application/SET_TITLE', route.title);
            return goLogin(to, from, next, route.level);
        },
    })),
});

export default router;