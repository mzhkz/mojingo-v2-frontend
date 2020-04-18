<template>
    <div class="recommended-card">
        <div class="recommended-upper-contents">
            <h2><i class="fas fa-stopwatch"></i>　{{ category }} 　[{{entries}}単語]</h2>
            <p>コツコツ復習して、定着を図ろう！</p>
        </div>
        <div class="recommended-lower-contents">
            <div>
                <h3>全 <span class="number">{{ review }}</span> 回の構成</h3>
            </div>
            <div>
                <button @click="$emit('createReviewHandle', id)" class="start-button">テストを開始する</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RecommendedCard",
        props: {
            category: {type: String},
            id: {type: String},
            entries: {type: Number},
            review: {type: Number},
        }
    }
</script>

<style scoped lang="scss">
    .recommended-card {
        position: relative;
        min-height: 110px;
        background: $app-content-color;
        overflow: hidden;
        box-shadow: 0 0px 7px 1px #efefef;
        border-radius: 7px;

        &::before {
            content: ' ';
            position: absolute;
            left: 0;
            bottom: 0;
            top: 0;
            width: 4px;
            /*background: #ead77a;*/
        }

        &:nth-child( n + 1 ) {
            margin-bottom: 15px;
        }

        .recommended-upper-contents {
            width: 100%;
            padding: 24px;
            font-family: $default-font-family;

            p {
                font-size: 13px;
                color: $default-font-secondary-color;
            }
        }

        .recommended-lower-contents {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid #efefef;

            @keyframes placeholderShimmer {
                0% {
                    background-position: -100% 0
                }

                100% {
                    background-position: 1000px 0
                }
            }

            background: linear-gradient(to right, #eee 8%, #ddd 18%, #eee 33%);
            animation-duration: 3s;
            animation-fill-mode: forwards;
            animation-iteration-count: infinite;
            animation-name: placeholderShimmer;
            animation-timing-function: linear;

            div {
                padding: 10px 25px;
                color: $default-link-color;

                h3 {
                    font-size: 12px;
                    padding: 10px;

                    .number {
                        font-size: 14px;
                        font-weight: unset;
                    }
                }

                .start-button {
                    cursor: pointer;
                    border: none;
                    font-size: 12px;
                    border-radius: 2px;
                    color: $default-letter-color;
                    padding: 13px;
                    font-weight: 700;
                    background: $app-primary-color;
                }
            }
        }
    }
</style>