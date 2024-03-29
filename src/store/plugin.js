const detectPlugin = store => {
    store.subscribe((mutation, state) => {
        switch (mutation.type) {
            case 'application/SET_TITLE': { //ページ名が更新された
                document.title = state.application.currentPageTitle + " - Mojingo";
                break;
            }

            case 'application/SET_DISABLE_SCROLL': {
                $('body').css('overflow-y', state.application.isDisableScroll ? 'hidden' : 'visible');
                break;
            }
        }
    })
};

export default detectPlugin;