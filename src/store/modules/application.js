const store = {
    namespaced: true,
    state: {
        isBrowsingMenu: false,
        isFetching: false,
        renderLayout: "Default",
        currentPageTitle: "",
    },

    mutations: {
        SET_BROWSING_MENU(state,is) {
            state.isBrowsingMenu = is;
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
        SET_BROWSING_MENU({commit}, data) {
            commit('SET_BROWSING_MENU', data)
        },

        SET_FETCHING({commit}, data) {
            commit('SET_FETCHING', data)
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