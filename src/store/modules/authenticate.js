const initState = {
    token: false,
    created: 0,
    updated: 0,

    level: 0,
    name: "",
    username: "",
    id: "",
};

const store = {
    namespaced: true,
    state: Object.assign({}, initState),

    mutations: {
        UPDATE(state, diff) {
            state = Object.assign(state, diff);
            localStorage.setItem('_SESSION', JSON.stringify({auth: state}));
        },
    },

    actions: {
        UPDATE({commit}, data) {
            commit('UPDATE', data);
        },

        RESET({commit}) {
            commit('UPDATE', {
                token: false,
                created: 0,
                updated: 0,

                level: 0,
                name: "",
                username: "",
                id: "",
            });
        }
    },
};

export default store;
