<template>
    <div class="word-card">
        <span class="concept-line"/>
        <div class="word-description-wrap">
            <h2>{{ name }}</h2>
            <p>{{ mean}}</p>
        </div>
        <div class="word-keyring-wrap">
            {{number}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "WordCard",
        props: {
            name: String,
            mean: String,
            number: String,
            clickHandle: Function,
        }
    }
</script>

<style scoped lang="scss">
    .word-card {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 85px;
        background: $app-content-color;
        overflow: hidden;
        box-shadow: 0 0px 7px 1px #efefef;

        &:nth-child( n + 1 ) {
            margin-bottom: 7px;
        }

        .concept-line {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            height: 100%;
            width: 3px;
            background: $app-primary-focus-color;
        }

        .word-description-wrap {
            width: 100%;
            padding: 0 40px 5px 23px;
            font-family: system-ui,
                /* macOS 10.11-10.12 */ -apple-system,
                /* Windows 6+ */ Segoe UI,
                /* Android 4+ */ Roboto,
                /* Ubuntu 10.10+ */ Ubuntu,
                /* Gnome 3+ */ Cantarell,
                /* KDE Plasma 5+ */ Noto Sans,
                /* fallback */ sans-serif,
                /* macOS emoji */ "Apple Color Emoji",
                /* Windows emoji */ "Segoe UI Emoji",
                /* Windows emoji */ "Segoe UI Symbol",
                /* Linux emoji */ "Noto Color Emoji";

            h2 {
                font-weight: unset;
                font-size: 18px;
                margin-bottom: 5px;
                color: $default-link-color;
                font-family: unset;
            }

            p {
                font-size: 13px;
                color: #5f6368;
            }
        }

        .word-keyring-wrap {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            width: 35px;
            background: #fbfbfb;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color:  $default-link-color;
            font-size: 11px;
            font-weight: bold;
        }
    }
</style>