<template>
    <div>
        <Header :visibleSideBar="false"/>
        <div class="app-content-grid">
            <sui-container text>
                <Alerts/>
                <router-view name="main"></router-view>
            </sui-container>
        </div>
    </div>
</template>

<script>
    import Header from "@/components/Header"
    import Alerts from "@/components/Alerts"

    export default {
        name: "TopBar",
        components: {
            Header,
            Alerts,
        }
    }
</script>

<style scoped lang="scss">
    .app-content-grid {
        padding-top: 60px;
    }
</style>