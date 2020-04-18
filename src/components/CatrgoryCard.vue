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
            name: {type: String},
            description: {type: String},
            number: {type: Number},
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
        border-radius: 7px;

        &:nth-child( n + 1 ) {
            margin-bottom: 15px;
        }

        .category-upper-contents {
            width: 100%;
            padding: 24px 24px 10px 24px;
            font-family: $default-font-family;

            p {
                font-size: 13px;
                color: $default-font-secondary-color;
                padding: 5px;
            }
        }

        .category-lower-contents {
            display: flex;
            align-items: center;
            justify-content: space-between;

            div {
                padding: 10px 25px;
                color: $default-link-color;

                h3 {
                    background:  $app-primary-color;
                    padding: 10px;
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