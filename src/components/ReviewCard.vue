<template>
    <div class="review-card">
        <div class="review-upper-contents">
            <h2>
                <i class="fas fa-undo-alt"></i>　{{ name }}
            </h2>
            <p>{{ description }}</p>
        </div>
        <div class="review-lower-contents">
            <div>
                <h3>正答率
                    <span class="correct">{{ correct }}</span> / <span class="correct-and-incorrect">{{ all }}　</span>
                    <span v-if="finished" class="review-finished">
                        　<i class="fas fa-check"></i>
                    </span>
                </h3>
            </div>
            <div>
                <h3>もっと見る</h3>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ReviewCard",
        props: {
            name: String,
            description: String,
            correct: Number,
            all: Number,
            percent: Number,
            finished: Boolean,
        }
    }
</script>

<style scoped lang="scss">
    .review-card {
        position: relative;
        min-height: 110px;
        background: $app-content-color;
        overflow: hidden;
        box-shadow: 0 0px 7px 1px #efefef;

        &:nth-child( n + 1 ) {
            margin-bottom: 10px;
        }

        .review-upper-contents {
            width: 100%;
            padding: 20px;
            font-family: $default-font-family;

            h2 {
                font-weight: bold;
                font-size: 18px;
                margin-bottom: 7px;
                font-family: unset;
            }

            p {
                font-size: 13px;
                color: #5f6368;
            }
        }

        .review-lower-contents {
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

                    .review-finished {
                        font-size: 12px;
                        color: #1eb91c;
                    }
                }
            }
        }
    }
</style>