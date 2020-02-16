<template>
    <section class="app-topbar-contents">
        <div class="app-header-wrapper">
            <div class="app-header-contain">
                <div class="logo">
                    WORDLINK
                </div>
                <div @click="handleClick">
                    <i class="fas fa-align-justify"></i>
                </div>
            </div>
        </div>
        <div class="app-sidebar-wrapper">
            <div class="app-sidebar-contain" :class="{ active: !browsing }">
                <div class="logo">
                    WORDLINK
                </div>
                <ul>
                    <router-link :to="{ name: 'dashboard', params: { }}">
                        <li class="active">ダッシュボード</li>
                    </router-link>
                    <router-link :to="{ name: 'reviews', params: { which: 'me' }}">
                        <li >小テスト</li>
                    </router-link>
                    <router-link :to="{ name: 'categories', params: {}}">
                        <li >単語カテゴリー</li>
                    </router-link>
                    <li v-if="$store.state.authenticate.level >= 2" class="bound">
                        <i class="fas fa-lock"></i>　管理者
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        name: "Header",
        computed: {
            ...mapState({
                browsing: state => state.application.isBrowsingMenu // このstateはグローバル。名前空間を掘る。
            })
        },
        methods: {
            ...mapActions([
                'application/SET_BROWSING_MENU'
            ]),

            handleClick() {
                console.log(this.browsing);
                this.$store.dispatch('application/SET_BROWSING_MENU', !this.browsing);
            }
        }
    }
</script>

<style scoped lang="scss">
    .logo {
        width: 240px;
        font-size: 20px;
        text-align: center;
        padding: 30px 10px;
        font-family: "Product Sans", sans-serif;
    }

    .app-topbar-contents {
        position: relative;
        height: 100%;
    }

    .app-header-wrapper {
        position: fixed;
        z-index: 2;
        top: 0;
        right: 0;
        left: 0;
        background: $app-primary-color;
        padding: 0 35px 0 0;

        .app-header-contain {
            height: 60px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .logo {
                width: 240px;
                font-size: 20px;
                text-align: center;
                padding: 30px 10px;
                font-family: "Product Sans", sans-serif;
            }
        }
    }

    .app-sidebar-wrapper {
        .app-sidebar-contain {
            position: fixed;
            z-index: 3;
            width: 240px;
            height: 100vh;
            background: $app-primary-content-color;
            transform: translateX(-240px);
            transition: 100ms transform;

            .logo {
                color: $app-primary-color;
            }

            &.active {
                transform: translateX(0);
            }



            .logo-space {
                height: 60px;
            }

            ul {
                list-style: none;
                padding: 10px;
                margin: 0;
                height: 100%;
                background: $app-primary-content-color;

                li {
                    margin: 3px;
                    padding: 17px 25px;
                    font-size: 12px;
                    font-weight: bold;
                    border-radius: 4px;
                    color: $app-primary-color;

                    &.active {
                        background: $app-focus-primary-content-color;

                        &:before {
                            content: ">　";
                        }
                    }

                    &:hover {
                        background: darken($app-primary-content-color, 10%);
                    }
                }
            }
        }
    }
</style>