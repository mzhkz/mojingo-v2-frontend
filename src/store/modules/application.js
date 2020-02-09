const store = {
    namespaced: true,
    state: {
        isMenuBrowsing: false,
        isFetching: false,
        renderLayout: "Default",
        currentPageTitle: "",
    },

    mutations: {
        setMenuBrowsing(state,is) {
            state.isMenuBrowsing = is;
        },

        SET_FETCHING(state, is) {
            state.isFetching = is;
        },

        SET_LAYOUT(state, layout) {
            state.renderLayout = layout;
        },

        SET_TITLE(state, title) {
            state.currentPageTitle = title;
        },
    },

    actions: {
        setMenuBrowsing({commit}, data) {
            commit('setMenuBrowsing', data)
        },

        SET_FETCHING({commit}, data) {
            commit('setFetching', data)
        },

        SET_LAYOUT({commit}, data) {
            commit('SET_LAYOUT', data);
        },

        SET_TITLE({commit}, data) {
            commit('SET_TITLE', data);
        },
    }
};

export default store;