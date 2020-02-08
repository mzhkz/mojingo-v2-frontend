const detectPlugin = store => {
    store.subscribe((mutation, state) => {
        localStorage.setItem('_SESSION', JSON.stringify({auth: state.authenticate}));
        switch (mutation.type) {
            case 'application/SET_TITLE': { //ページ名が更新された
                document.title = state.application.currentPageTitle + " /: WordLink";
                break;
            }

            case 'page/setDisableScroll': {
                break;
            }
        }
    })
};

export default detectPlugin;