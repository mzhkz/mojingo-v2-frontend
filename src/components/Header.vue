<template>
    <section class="app-topbar-contents">
<!--        <div class="app-header-wrapper">-->
<!--            <div class="app-header-contain">-->
<!--                <div class="title">-->
<!--                    WordLink-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
        <div class="app-sidebar-wrapper">
            <div class="app-sidebar-contain">
                <div class="logo">
                    WORDLINK
                </div>
                <ul>
                    <li class="active">ホーム</li>
                    <li>単語帳</li>
                    <li>小テスト</li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped lang="scss">
    .app-topbar-contents {
        position: relative;
        height: 100%;
    }

    .app-header-wrapper {
        position: absolute;
        z-index: 2;
        top: 0;
        /*height: 60px;*/
        /*width: 100%;*/
        background: $app-content-color;
        box-shadow: 0 0px 7px 1px #d5d5d6;

        .app-header-contain {

            .title {
                padding: 20px 4%;
                font-size: 20px;
                margin: 0 auto;
                width: 98%;
                text-align: center;

                font-family: "Product Sans", sans-serif;
            }
        }
    }

    .app-sidebar-wrapper {
        .app-sidebar-contain {
            position: absolute;
            z-index: 1;
            width: 240px;
            height: 100vh;
            background: $app-secondary-color;
            box-shadow: 0 0px 7px 1px #d5d5d6;
            /*<!--transform: translateY(-70px);-->*/

            .logo {
                font-size: 20px;
                text-align: center;
                padding: 30px 10px;
                font-family: "Product Sans", sans-serif;
            }

           ul {
               list-style: none;
               padding: 0;
               margin: 0;

               li {
                   padding: 20px 25px;
                   font-size: 14px;
                   font-weight: bold;

                   &.active {
                       background: darken($app-secondary-color, 10%);

                       &:before {
                           content: ">　";
                       }
                   }

                   &:hover {
                       background: #252650;
                       color: #ffffff;
                   }
               }
           }
        }
    }
</style>