<template>
    <div class="alerts-wrap">
        <div class="alert" v-for="(alert, index) in $store.state.alert.alerts" :key="index" :class="`level-${alert.level}`">
           <div class="alert-icon">
               <i class="fas" :class="`fa-${alert.icon}`"></i>
           </div>
            <div class="alert-body">
                <h2>{{alert.message}}</h2>
            </div>
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
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: center;

        .alert-icon {
            width: 60px;
            height: 60px;

            display: flex;
            align-items: center;
            justify-content: center;
            color: $app-content-color;
            font-size: 25px;
        }

        .alert-body {
            width: 100%;
        }


        &:nth-child(n+1) {
            margin-bottom: 4px;
        }

        &:last-child {
            margin-bottom: 25px;
        }

        @mixin alert-stage-color($color, $thinColor) {
            background: $thinColor;

            .alert-icon {
                background: $color;
            }

        }
        &.level-0 {
           @include alert-stage-color($app-primary-content-color, lighten($app-primary-content-color, 10%))
        }

        &.level-1 {
            @include alert-stage-color($success-color, lighten($success-color, 10%))
        }

        &.level-2 {
            @include alert-stage-color($warning-color, lighten($warning-color, 10%))
        }

        &.level-3 {
            @include alert-stage-color($danger-color, lighten($danger-color, 10%))
        }

        h2 {
            font-size: 15px;
            color: #ffffff;
            font-weight: bold;
        }
    }
</style>