<template>
    <div v-if="QUESTION">
        <div class="marking-sheet">
           <h2>
               <span class="number">問{{QUESTION.number}}.</span>
               {{QUESTION.name}}
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
                    <p>{{QUESTION.mean}}</p>
                </div>
                <div class="answer-button-field">
                    <button @click="submitAnswer({target: MARKER_WORD_ID, result: 1})"
                            class="submit-button correct">
                        正解
                    </button>
                    <button @click="submitAnswer({target: MARKER_WORD_ID, result: 0})"
                            class="submit-button">
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
                onlyRecord: false,

                MARKER_ID: null,
                MARKER_WORD_ID: null,
                MARKER_CORRECT_REPRESENT: null,
                MARKER_INCORRECT_REPRESENT: null,
                QUESTION: null,
            }
        },
        methods: {
            async fetchData() {
              const {data, message} =
                  await this.$WORDLINKAPI.post(`/reviews/${this.$route.params["which"]}/${this.$route.params["id"]}/let`);
                this.QUESTION = data;
                this.MARKER_ID = data.id;
                this.MARKER_WORD_ID = data.wordId;
                this.MARKER_CORRECT_REPRESENT = data.representCorrect;
                this.MARKER_INCORRECT_REPRESENT = data.representIncorrect;

                if (this.isRecodingOtherUser) {
                    await this.$store.dispatch('alert/PUSH_ALERT', {
                        icon: "",
                        level: 2,
                        message: `この小テストのオーナーは${data.owner.username}さんです。`,
                    });
                }
            },

            async postResult({target, result}) {
                await this.$store.dispatch('alert/CLEAR_ALERT');
                const {data, message} =
                    await this.$WORDLINKAPI
                        .post(`/reviews/${this.$route.params["which"]}/${this.$route.params["id"]}/let/mark/${this.MARKER_ID}`, {
                        target: target,
                        result: result,
                    });
                if (data === "finished") {
                    this.$router.replace({
                        name: 'review',
                        params: {
                            id: this.$route.params["id"],
                            which: this.$route.params["which"],
                        }
                    })
                } else {
                    this.QUESTION = data;
                    this.MARKER_WORD_ID = data.wordId;
                    this.MARKER_CORRECT_REPRESENT = data.representCorrect;
                    this.MARKER_INCORRECT_REPRESENT = data.representIncorrect;
                }
            },

            submitAnswer({target, result}) {
                this.showAnswer = this.onlyRecord;
                switch (result) {
                    case 1 : {
                        this.postResult({
                            target: target,
                            result: this.MARKER_CORRECT_REPRESENT,
                        });
                        break;
                    }
                    case 0 : {
                        this.postResult({
                            target: target,
                            result: this.MARKER_INCORRECT_REPRESENT,
                        });
                        break;
                    }
                }
            }
        },

        beforeMount() {
            this.onlyRecord = this.$route.query['onlyRecord'] !== undefined;
            this.showAnswer = this.onlyRecord;
            if (this.onlyRecord) {
                this.$store.dispatch('alert/PUSH_ALERT', {
                    icon: "",
                    level: 2,
                    message: `現在、回答記録モードです`,
                });
            }
            this.fetchData()
        },

        computed: {
            isRecodingOtherUser() {
                return this.QUESTION.owner.id !== this.$store.state.authenticate.id
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