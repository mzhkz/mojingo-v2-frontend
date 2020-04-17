<template>
    <div>
        <Header/>
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
        name: "Default",
        components: {
            Header,
            Alerts,
        },
    }
</script>

<style lang="scss">
    .app-content-grid {
        padding-top: 75px;
        padding-bottom: 55px;
    }
</style>