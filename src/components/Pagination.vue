<template>
    <ul>
        <li v-for="index in maxValue" :key="index" v-if="isVisible(index) === 3" @click="internalValue = index" :class="{active: internalValue === index}">
            <div>
                <p>{{ index }}</p>
            </div>
        </li>
        <li v-else-if="isVisible(index) < 3">
            <div>
                <p>...</p>
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "Pagination",
        props: {
            maxValue: {type: Number},
            value: {type: Number},
        },

        methods: {
            isVisible(pageNumber) {
                const maxShowing = 5;
                if (this.internalValue < maxShowing - 1) {
                    if (pageNumber <= maxShowing || pageNumber === this.maxValue) {
                        return 3;
                    } else if (pageNumber ===this.maxValue - 1) {
                        return 1;
                    }
                } else if (this.internalValue > this.maxValue - maxShowing + 1) {
                    if (pageNumber > this.maxValue - maxShowing || pageNumber === 1) {
                        return 3;
                    } else if (pageNumber === 2) {
                        return 2;
                    }
                } else {
                    if (pageNumber <= this.internalValue + 1 && pageNumber >= this.internalValue - 1 || pageNumber === this.maxValue || pageNumber === 1) {
                        return 3;
                    } else if (pageNumber === this.internalValue + 2 || pageNumber === this.internalValue - 2) {
                        return 2;
                    }
                }
            }
        },
        computed: {
            internalValue: {
                get() {
                    return this.value
                },
                set(newVal) {
                    if (this.value !== newVal) this.$emit('input', newVal)
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    ul {
        text-align: center;
        list-style: none;

        li {
            $size: 38px;
            display: inline-block;

            div {
                height: $size;
                width: $size;
                display: flex;
                align-items: center;
                justify-content: center;

                p {
                    font-size: 14px;
                    cursor: pointer;
                }
            }


            &.active {
               background-color: $app-primary-focus-color;

                p {
                    font-weight: bold;
                }
            }
        }
    }
</style>