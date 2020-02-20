const detectPlugin = store => {
    store.subscribe((mutation, state) => {
        localStorage.setItem('_SESSION', JSON.stringify({auth: state.authenticate}));
        switch (mutation.type) {
            case 'application/SET_TITLE': { //ページ名が更新された
                document.title = state.application.currentPageTitle + " /: WordLink";
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