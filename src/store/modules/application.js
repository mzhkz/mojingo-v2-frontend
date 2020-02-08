const store = {
    namespaced: true,
    state: {
        isMenuBrowsing: false,
        isFetching: false,
        renderLayout: "Default",
        currentPageTitle: "",
    },

    mutation: {
        setMenuBrowsing(state,is) {
            state.isMenuBrowsing = is;
        },

        setFetching(state, is) {
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

        setFetching({commit}, data) {
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