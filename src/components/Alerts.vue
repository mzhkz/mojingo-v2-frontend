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
    .alert {
        text-align: center;
        padding: 14px;

        &:nth-child(n+1) {
            margin-bottom: 4px;
        }

        &:last-child {
            margin-bottom: 25px;
        }

        &.level-0 {
            background: $app-content-color!important;

            h2 {
                color: #5f6368;
            }
        }

        &.level-1 {
            background: #4CAF50!important
        }

        &.level-2 {
            background: #ff9800!important
        }

        &.level-3 {
            background: #f44336!important;
        }

        h2 {
            font-size: 15px;
            color: #ffffff;
            font-weight: bold;
        }
    }
</style>