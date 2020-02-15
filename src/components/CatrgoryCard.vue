<template>
    <div class="category-card">
        <div class="category-upper-contents">
            <h2><i class="fas fa-dice-d6"></i>　{{ name }}</h2>
            <p>{{ description }}</p>
        </div>
        <div class="category-lower-contents">
            <div>
                <h3>単語数 <span class="number">{{ number }}</span> 単語</h3>
            </div>
            <div>
                <h3>もっと見る</h3>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CategoryCard",
        props: {
            name: String,
            description: String,
            number: Number,
        }
    }
</script>

<style scoped lang="scss">
    .category-card {
        position: relative;
        min-height: 110px;
        background: $app-content-color;
        overflow: hidden;
        box-shadow: 0 0px 7px 1px #efefef;

        &:nth-child( n + 1 ) {
            margin-bottom: 15px;
        }

        .category-upper-contents {
            width: 100%;
            padding: 20px;
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
                margin-bottom: 7px;
                color: $default-link-color;
                font-family: unset;
            }

            p {
                font-size: 13px;
                color: #5f6368;
            }
        }

        .category-lower-contents {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid #efefef;

            div {
                padding: 15px 25px;
                color: $default-link-color;

                h3 {
                    font-size: 12px;

                    .number {
                        font-size: 14px;
                        font-weight: unset;
                    }
                }
            }
        }
    }
</style>