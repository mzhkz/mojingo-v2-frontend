const detectPlugin = store => {
    store.subscribe((mutation, state) => {
        localStorage.setItem('_SESSION', JSON.stringify({auth: state.authenticate}));
        switch (mutation.type) {
            case 'application/updateTitle': { //ページ名が更新された
                document.title = state.page.title;
                break;
            }

            case 'page/setDisableScroll': {
                $('body').css('overflow-y', state.app.disableBodyScroll ? 'hidden' : 'visible');
                break;
            }
        }
    })
};