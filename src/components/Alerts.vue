<template>
    <div class="alerts-wrap">
        <div class="alert" v-for="(alert, index) in $store.state.alert.alerts" :key="index" :class="`level-${alert.level}`">
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
        text-align: center;
        padding: 16px;

        &.level-0 {
            background: #4CAF50!important
        }

        &.level-1 {
            background: #4CAF50!important
        }

        &.level-2 {
            background: #4CAF50!important
        }

        &.level-3 {
            background: #f44336!important;
        }

        h2 {
            color: $app-content-color;
        }
    }
</style>