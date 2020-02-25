<template>
    <div class="alerts-wrap">
        <div class="alert" v-for="(alert, index) in $store.state.alert.alerts" :key="index">
            <h2>{{alert.message}}</h2>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Alerts"
    }
</script>

<style scoped lang="scss">
    .alerts-wrap {
        margin: 0 0 30px 0;
    }
    .alert {
        background: #f44336!important;
        text-align: center;
        padding: 16px;

        h2 {
            color: $app-content-color;
        }
    }
</style>