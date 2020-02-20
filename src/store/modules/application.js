const store = {
    namespaced: true,
    state: {
        isBrowsingMenu: false,
        isFetching: false,
        renderLayout: "Default",
        currentPageTitle: "",
        isMasking: false,
        isDisableScroll: false,
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

        SET_MASK(state, mask) {
            state.isMasking = mask;
        },

        SET_DISABLE_SCROLL(state, disable) {
            state.isDisableScroll = disable;
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

        SET_MASK({commit}, data) {
            commit('SET_MASK', data);
        },

        SET_DISABLE_SCROLL({commit}, data) {
            commit('SET_DISABLE_SCROLL', data);
        },
    }
};

export default store;