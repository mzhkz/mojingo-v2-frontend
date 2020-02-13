<template>
    <div class="app-header-wrapper">
        <div class="app-header-contain">
            <div class="title">
                WordLink
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped lang="scss">
    .app-header-wrapper {
        background: $app-secondary-color;
        box-shadow: 0 0px 7px 1px #d5d5d6;

        .app-header-contain {
            height: 60px;
            width: 100%;

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
</style>