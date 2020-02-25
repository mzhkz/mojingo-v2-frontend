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
        },

        RESET(state) {
            state = Object.assign({}, initState)
        },
    },

    actions: {
        UPDATE({commit}, data) {
            commit('UPDATE', data);
        },

        RESET({commit}, data) {
            commit('RESET', data);
        }
    },
};

export default store;
