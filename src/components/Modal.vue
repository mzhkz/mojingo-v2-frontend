<template>
    <div class="modal-wrapper" :class="{ active: active}">

    </div>
</template>

<script>
    export default {
        name: "Modal",
        props: {
            showing: { type: Boolean, default: false,},
        },
        data() {
            return {
                active: false,
            }
        },

        watch: {
            show(val) {
                this.$store.dispatch('application/SET_DISABLE_SCROLL', val);
                this.active = val;
            }
        }
    }
</script>

<style scoped lang="scss">
    .modal-wrapper {
        display: flex;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        align-items: center;
        justify-content: center;

        z-index: -999;

        &.active {
            z-index: 200;
        }
    }
</style>