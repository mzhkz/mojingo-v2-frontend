<template>
    <div>
        <div class="marking-sheet">
           <h2>
               <span class="number">問1.</span>
               decade
               <span class="speech">
                   <i class="fas fa-volume-up"></i>
               </span>
            </h2>
            <button
                    v-show="!showAnswer"
                    @click="showAnswer = true"
                    class="submit-button">答えを開く</button>

            <div v-show="showAnswer" class="answer-wrapper">
                <div class="answer-box">
                    <p>を決める；決心する</p>
                </div>
                <div class="answer-button-field">
                    <button class="submit-button correct">
                        正解
                    </button>
                    <button class="submit-button">
                        不正解
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Marking",
        data() {
            return {
                showAnswer: false,
            }
        }
    }
</script>

<style scoped lang="scss">
    .marking-sheet {
        position: relative;
        background: $app-content-color;
        padding: 30px;
        margin: 60px 0;

        h2 {
            font-size: 24px;
            font-family: 'Times New Roman', sans-serif;

            .number {
                font-size: 18px;
                padding-right: 12px;
                font-weight: 500;
            }

            .speech {
                font-size: 16px;
                padding: 3px;
                margin-left: 10px;
                color: #bdbfcc;
                cursor: pointer;

                &:hover {
                    color: $default-letter-color;
                }

            }
        }

        .submit-button {
            border: none;
            background: $app-primary-focus-color;
            padding: 14px 12px;
            color: $default-link-color;
            font-family: $default-font-family;
            font-size: 14px;
            cursor: pointer;
            text-decoration: none;
            width: 100%;

            &.correct {
                background: #d5e6d8;
            }

            &.incorrect {
               background: #e6d5d5;
            }

        }

        .answer-wrapper {
            .answer-box {
                padding: 15px;
                font-size: 15px;
                font-family: $default-font-family;
            }

            .answer-button-field {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 18px 0;

                button:nth-child(1) {
                    margin-right: 2px;
                }
                button:nth-child(2) {
                    margin-left: 2px;
                }
            }
        }
    }
</style>