<template>
    <div>
        <Header/>
        <div class="app-content-grid">
            <sui-container text>
                <router-view name="main"></router-view>
            </sui-container>
        </div>
    </div>
</template>

<script>
    import Header from "@/components/Header"
    export default {
        name: "TopBar",
        components: {
            Header,
        }
    }
</script>

<style scoped lang="scss">
    .app-content-grid {
        padding-top: 60px;
    }
</style>