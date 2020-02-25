const store = {
    namespaced: true,
    state: {
        alerts: []
    },
    mutations: {
        PUSH_ALERT(state, {icon, level, message}) {
            state.alerts.push({icon: icon, level: level, message: message})
        },
    },

    actions: {
        PUSH_ALERT({commit}, data) {
            commit('PUSH_ALERT', data);
        },

        CLEAR_ALERT({state}) {
            state.alerts = [];
        }
    }
};

export default store;