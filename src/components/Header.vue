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

        .app-header-contain {
            height: 60px;
            width: 100%;
            /*border-bottom: 1px solid #e0e1e2;*/
            border-top: 3px solid #005bb9;

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