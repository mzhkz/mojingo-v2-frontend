<template>
    <section class="app-topbar-contents">
        <div class="app-header-wrapper">
            <div class="app-header-contain">
                <div class="logo">
<!--                    <img :src="logoImage4" class="logo-img">-->
                </div>
                <div v-if="visibleSideBar"
                     class="hamburger-menu"
                     @click="handleClick">
                    <i class="fas fa-align-justify"/>
                </div>
<!--                <div class="print-menu"-->
<!--                     @click="print">-->
<!--                    <i class="fas fa-print"/>-->
<!--                </div>-->
            </div>
        </div>
        <div v-if="visibleSideBar" class="app-sidebar-wrapper">
            <div class="app-sidebar-contain" :class="{ active: browsing }">
                <div class="logo">
                    <img class="logo-img" :src="logoImage3">
                </div>
                <ul>
                    <router-link :to="{ name: 'dashboard', params: { }}">
                        <li :class="{ active: currentPageCategory === 'dashboard'}">ダッシュボード</li>
                    </router-link>
                    <router-link :to="{ name: 'reviews', params: { which: 'me' }}">
                        <li :class="{ active: currentPageCategory === 'reviews'}">小テスト</li>
                    </router-link>
                    <router-link :to="{ name: 'categories', params: {}}">
                        <li :class="{ active: currentPageCategory === 'categories'}">単語カテゴリー</li>
                    </router-link>
                    <router-link :to="{name: 'profile', params: { id: 'me'}}">
                        <li :class="{ active: currentPageCategory === 'profile'}">
                            プロフィール
                        </li>
                    </router-link>
                    <router-link :to="{name: 'admin'}">
                        <li v-if="$store.state.authenticate.level >= 2"
                            :class="{ active: currentPageCategory === 'admin'}"
                            class="bound">
                            <i class="fas fa-lock"></i>　管理者
                        </li>
                    </router-link>
                </ul>
                <ul v-if="$store.state.authenticate.token !== false">
                    <li @click="logout">
                        <i class="fas fa-sign-out-alt"></i>　ログアウト
                    </li>
                </ul >
            </div>
        </div>
    </section>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import LogoImage3 from "@/assets/images/WordLink_03.png";
    import LogoImage4 from "@/assets/images/WordLink_04.png";

    export default {
        name: "Header",
        data() {
            return {
                logoImage3: LogoImage3,
                logoImage4: LogoImage4,
            }
        },
        props: {
            visibleSideBar: {type: Boolean, default: true },
        },
        computed: {
            ...mapState({
                browsing: state => state.application.isBrowsingMenu, // このstateはグローバル。名前空間を掘る。
                currentPageCategory: state => state.application.currentPageCategory,
            })
        },
        methods: {
            ...mapActions([
                'application/SET_BROWSING_MENU'
            ]),

            handleClick() {
                console.log(this.browsing);
                this.$store.dispatch('application/SET_BROWSING_MENU', !this.browsing);
            },

            logout() {
                this.$store.dispatch('authenticate/RESET');
                this.$router.push({name: "login"});
                this.$store.dispatch('alert/PUSH_ALERT', {icon: "none", level: 2, message: "ログアウトしました。"});
            },

            print() {
                window.print();
            }
        }
    }
</script>

<style scoped lang="scss">
    .logo {
        width: 240px;
        font-size: 20px;
        text-align: center;
        padding: 20px 5px;
        font-family: "Product Sans", sans-serif;
    }

    .logo-img {
        width: 130px;
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
        background: transparent;
        padding: 0 35px 0 0;

        @include tab() {
            padding: 0 25px 0 0;
        }

        .app-header-contain {
            position: relative;
            height: 60px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .logo {
               text-align: left;
                padding-left: 30px;
            }

            .hamburger-menu {
                display: none;
                background: rgba(247, 247, 248, 0.8);
                padding: 10px;
            }


            @include tab() {
                .hamburger-menu {
                    display: block;
                }
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
            transform: translateX(0);
            transition: 100ms transform;

            @include tab() {
                transform: translateX(-240px);

                &.active {
                    transform: translateX(0);
                }
            }

            .logo {
                color: $app-primary-color;
            }


            .logo-space {
                height: 60px;
            }

            .user-information-wrapper {
                margin-left: 14px;
                position: absolute;
                bottom: 0;
                padding: 30px;
                color: $app-primary-color;

                .user-information {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                }
                .user-icon {
                    font-size: 15px;
                    text-align: center;
                }
                h4 {
                    color: unset;
                    margin: 0;
                    padding: 15px;
                    font-weight: 100;
                }
            }

            ul {
                list-style: none;
                padding: 10px;
                margin: 0;
                background: $app-primary-content-color;

                li {
                    margin: 3px;
                    padding: 17px 25px;
                    font-size: 12px;
                    font-weight: bold;
                    border-radius: 4px;
                    color: $app-primary-color;

                    &.active {
                        background: darken($app-primary-content-color, 10%);

                        &:before {
                            /*content: ">　";*/
                        }
                    }

                    &:hover {
                        background: darken($app-primary-content-color, 6.5%);
                    }
                }
            }
        }
    }
</style>