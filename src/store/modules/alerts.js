const store = {
    state: [],
    mutations: {
        PUSH_ALERT(state, {icon, level, message}) {
            state.push({icon: icon, level: level, message: message})
        },
    },

    actions: {
        PUSH_ALERT({commit}, data) {
            commit('PUSH_ALERT', data);
        },
    }
};

export default store;