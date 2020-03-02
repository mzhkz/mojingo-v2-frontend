<template>
    <div class="search-wrapper"  :class="{focus: isFocusing}">
        <div class="search-icon">
            <i class="fas fa-search"></i>
        </div>
        <input v-model="internalValue"
               @focus="isFocusing = true"
               @blur="isFocusing = false"
               :placeholder="placeholder"
               class="search-input"/>
        <div v-if="internalValue" @click="internalValue = null" class="close-icon">
            <i class="fas fa-times"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Search",
        data() {
            return ({
                isFocusing: false,
            })
        },
        props: {
            value: {type: String},
            placeholder: {type: String},
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
    .search-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: $default-link-color;
        border-radius: 6px;
        transition: background 50ms ease-in;

        &.focus {
            background: $app-content-color;

            .search-input {

            }
        }

        .search-icon {
           padding: 12px 20px;
        }

        .close-icon {
            padding: 12px 20px;
            cursor: pointer;
        }

        .search-input {
            width: 100%;
            height: 100%;

            border: none;
            outline: none;
            background: transparent;
            font-size: 15px;
            color: $default-link-color;

            font-family: unset;
        }
    }
</style>