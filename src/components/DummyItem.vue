<template>
    <div class="dummy-contents-wrapper" :style="{width: width, height: height}">
        <div class="dummy-placeholder"></div>
    </div>
</template>

<script>
    export default {
        name: "DummyItem",
        props: {
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '25px'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .dummy-contents-wrapper {
        position: relative;
        margin-bottom: 8px;
        border-radius: 2px;
        overflow: hidden;


        @keyframes placeholderShimmer {
            0% {
                background-position: -100% 0
            }

            100% {
                background-position: 1000px 0
            }
        }

        .dummy-placeholder {
            background: #f6f7f8;
            background: linear-gradient(to right, #eee 8%, #ddd 18%, #eee 33%);
            width: 100%;
            height: 100%;

            animation-duration: 3s;
            animation-fill-mode: forwards;
            animation-iteration-count: infinite;
            animation-name: placeholderShimmer;
            animation-timing-function: linear;

        }
    }
</style>