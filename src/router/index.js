import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '@/store'
import * as constants from '@/constants'

Vue.use(Router);

async function goLogin(to, from, next, need) {
    const level = store.state.authenticate.level;
    // console.log(`${need} ${level}`);
   if (need <= level) {
       next();
   } else {
       await store.dispatch('alert/PUSH_ALERT', {
           message: 'ログインしてください。',
           icon: 'exclamation-triangle',
           level: '3'
       });
       await store.dispatch('application/SET_LAYOUT', 'TopBar');
       next({name: 'login', query: {redirect: to.fullPath || '/'}});
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
        beforeEnter: async (to, from, next) => {
            await store.dispatch('alert/CLEAR_ALERT');
            await store.dispatch('application/SET_TITLE', route.title);
            await store.dispatch('application/SET_LAYOUT', route.layout);
            await store.dispatch('application/SET_CATEGORY', route.category);
            await store.dispatch('application/SET_BROWSING_MENU', false);
            return goLogin(to, from, next, route.level);
        },
    })),
});

export default router;