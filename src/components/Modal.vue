<template>
    <div class="modal-wrapper" :class="{ active: active}">
        <div class="modal-content">
            <div class="modal-tools-bar">
                <div class="space"></div>
                <button @click="active = !active">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-contents-wrapper">
                <h2>{{title}}</h2>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Modal",
        props: {
            show: { type: Boolean, default: false,},
            title: { type: String, default: "",},
        },
        data() {
            return {
                active: false,
            }
        },

        watch: {
            show(val) {
                this.active = val;
            },

            active(val) {
                this.$store.dispatch('application/SET_MASK', val);
                this.$store.dispatch('application/SET_DISABLE_SCROLL', val);
            }
        }
    }
</script>

<style scoped lang="scss">
    .modal-wrapper {
        display: none;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        align-items: center;
        justify-content: center;

        z-index: -999;

        &.active {
            display: flex;
            z-index: 200;
        }

        .modal-content {
            background: $app-content-color;
            min-width: 45%;
            min-height: 30%;
            margin: 10px;

            @include sp {
                min-width: 85%;
                min-height: 30%;
            }

            .modal-tools-bar {
                display: flex;
                justify-content: space-between;

                button {
                    border: none;
                    background: $app-primary-focus-color;
                    padding: 10px 14px;
                    color: $default-link-color;
                    cursor: pointer;
                    text-decoration: none;
                    transition: background 200ms ease-out;

                    &:hover {

                    }
                }
            }

            .modal-contents-wrapper {
                color: $default-link-color;
                padding: 15px 30px 20px 15px;
                text-align: center;
                font-family: $default-font-family;

                h2 {
                    font-size: 19px;
                    margin: 0 0 30px 0;
                }
            }

        }
    }
</style>