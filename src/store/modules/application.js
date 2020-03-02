const store = {
    namespaced: true,
    state: {
        isBrowsingMenu: false,
        isFetching: false,
        renderLayout: "Default",
        currentPageTitle: "",
        currentPageCategory: "",
        isMasking: false,
        isDisableScroll: false,
        reservedReview: null,
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

        SET_CATEGORY(state, category) {
            state.currentPageCategory = category;
        },

        SET_MASK(state, mask) {
            state.isMasking = mask;
        },

        SET_DISABLE_SCROLL(state, disable) {
            state.isDisableScroll = disable;
        },

        PRESET_REVIEW(state, review) {
            state.reservedReview = review;
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

        SET_CATEGORY({commit}, data) {
            commit('SET_CATEGORY', data);
        },

        SET_MASK({commit}, data) {
            commit('SET_MASK', data);
        },

        SET_DISABLE_SCROLL({commit}, data) {
            commit('SET_DISABLE_SCROLL', data);
        },

        PRESET_REVIEW({commit}, data) {
            commit('PRESET_REVIEW', data);
        },
    }
};

export default store;