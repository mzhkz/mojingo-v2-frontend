<template>
    <div>
        <div id="main-display">
            <component :is="renderLayout"></component>
        </div>
        <div id="print-display">
            <router-view name="print"></router-view>
        </div>
        <div id="display-mask"></div>
    </div>
</template>
<script>
    import Default from './layout/Default'
    import TopBar from './layout/TopBar'
    import {mapState, mapActions} from 'vuex'

    export default {
        name: "App",
        components: {
            Default,
            TopBar,
        },

        computed: {
            renderLayout() {
                return this.$store.state.application.renderLayout
            },

            ...mapState({
                masking: state => state.application.isMasking, // // このstateはグローバル。名前空間を掘る。
            })
        }
    }
</script>
<style lang="scss">
    #main-display {

    }

    #print-display {
        display: none;
        background-color: #fff;

        @media print {
            @page {
                margin: 8.0mm 2cm;
                size: A4 portrait; //縦向き
            }

            #MainDisplay {
                display: none;
            }

            #PrintDisplay {
                display: block;
            }
        }
    }

    #display-mask {

    }
</style>