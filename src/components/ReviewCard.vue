<template>
    <div class="review-card">
        <div class="review-upper-contents">
            <h2>
                <i class="fas fa-undo-alt"></i>　{{ name }}
            </h2>
            <p>{{ description }}</p>
        </div>
        <div class="review-lower-contents">
            <div v-show="finished" class="override-message-bar">
                <p><i class="fas fa-check"></i>　すべて復習済み</p>
            </div>
            <div class="review-card-low-child">
                <h3>正答率
                    <span class="correct">{{ correct }}</span> / <span class="correct-and-incorrect">{{ all }}　</span>
                </h3>
            </div>
            <div class="review-card-low-child">
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
        border-radius: 7px;

        &:nth-child( n + 1 ) {
            margin-bottom: 10px;
        }

        .review-upper-contents {
            width: 100%;
            padding: 24px 24px 10px 24px;
            font-family: $default-font-family;


            p {
                font-size: 13px;
                color: $default-font-secondary-color;
                padding: 8px;
            }
        }

        .review-lower-contents {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;

            &.finished {
                border-color: #ebeefb;
            }

            .override-message-bar {
                position: absolute;
                width: 100%;
                height: 32px;
                top: -32px;
                text-align: center;
                color: $app-content-color;
                background: rgba(2,2,2, 0.147);

                p {
                    padding: 6px;
                    margin: 0;
                    font-size: 13px;
                }
            }

            .review-card-low-child {
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

                    .review-finished {
                        font-size: 12px;
                        color: #1eb91c;
                    }
                }
            }
        }
    }
</style>