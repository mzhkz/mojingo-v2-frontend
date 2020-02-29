<template>
    <div v-if="REVIEW_DATA">
        <div class="page-header">
            <div class="review-icon pass">
                <i class="fas fa-undo-alt"></i>
            </div>
            <div class="review-information">
                <h2>
                    {{REVIEW_DATA.review.name}}
                </h2>
                <p>{{REVIEW_DATA.review.description}}</p>
                <p class="created-date">
                    <i class="fas fa-history"></i>  {{REVIEW_DATA.createAgo}}に作成 <br>
                </p>
                <p class="owner-username">
                    {{REVIEW_DATA.review.owner.username}} がオーナー
                </p>
            </div>
        </div>
        <div class="page-contents">
            <div v-if="REVIEW_DATA.review.entries.length !== REVIEW_DATA.review.answers.length"
                 class="contents-action-button"
                 @click="$router.push({name: 'marking', params: {id: REVIEW_DATA.review.id, which: $route.params['which']}})">
                <h2>続きから回答を開始する</h2>
            </div>
            <div class="answers">
                <h2>小テスト結果</h2>
                <WordCard v-for="answer in REVIEW_DATA.review.answers"
                          :key="answer.id"
                          :name="answer.word.name"
                          :mean="answer.word.mean"
                          :number="answer.word.number"
                          :borderColor="judgeColor(judgeCorrect(answer))"/>
                <div class="review-finished">
                    <sui-button :disabled="REVIEW_DATA.review.finished || REVIEW_DATA.review.entries.length !== REVIEW_DATA.review.answers.length"
                                @click="submitFinished">
                        復習テストを完了する
                    </sui-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import WordCard from "@/components/WordCard"
    export default {
        name: "Review",
        components: {
            WordCard,
        },
        data() {
            return {
                REVIEW_DATA: null,
            }
        },
        methods: {
            async fetchData() {
                const {data, message} =
                    await this.$WORDLINKAPI.get(`/reviews/${this.$route.params["which"]}/${this.$route.params["id"]}`);
                this.REVIEW_DATA = data;
                await this.$store.dispatch('application/PRESET_REVIEW', data.review);
                await this.$store.dispatch('application/SET_TITLE', `小テスト「${this.REVIEW_DATA.review.name}」`)

                if (this.isRecodingOtherUser) {
                    await this.$store.dispatch('alert/PUSH_ALERT', {
                        icon: "",
                        level: 2,
                        message: `この小テストのオーナーは${this.REVIEW_DATA.review.owner.username}さんです。`,
                    });
                }
            },

            async postFinished() {
                const {data, message} =
                    await this.$WORDLINKAPI.post(`/reviews/me/${this.$route.params["id"]}/finished`);
                this.REVIEW_DATA.review.finished = true;
                // await this.$router.push({ name: 'reviews', params: { which: 'me'}});
                await this.$store.dispatch('alert/PUSH_ALERT', {
                    icon: "",
                    level: 0,
                    message: `${this.REVIEW_DATA.review.name}の復習が完了しました！お疲れさまです！`,
                });
            },

            submitFinished() {
              this.postFinished();
            },

            judgeCorrect(answer) {
                return answer.histories.filter(history => history.impactReviewId === this.REVIEW_DATA.review.id)[0].result === 1
            },

            judgeColor(judgement) {
                if (judgement) {
                    return "#87e2ab"
                }
                return "#e29887"
            }
        },

        beforeMount() {
            this.fetchData()
        },

        computed: {
            isRecodingOtherUser() {
                return this.REVIEW_DATA.review.owner.id !== this.$store.state.authenticate.id
            }
        }
    }
</script>

<style scoped lang="scss">
    .page-header {
        color: $default-link-color;
        min-height: 150px;

        display: flex;
        align-items: center;

        .review-icon {
            /*width: 90px;*/
            /*height: 90px;*/
            padding: 33px;
            border-radius: 50px;


            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 28px;
            background: $app-primary-focus-color;
        }

        .review-information {
            margin-left: 40px;

            h2 {
                margin: 0 0 4px 0;
                font-size: 20px;
            }

            p {
                margin: 0;

                &.created-date {
                    margin: 10px 0 0 0;
                    font-size: .87rem;
                }

                &.owner-username {
                    margin: 4px 0 0 0;
                    font-size: .89rem;
                }
            }
        }

    }

    .page-contents {
        margin: 30px 0 0 0;
        .answers {
            .review-finished {
                width: 100%;
                padding: 20px 0;
                display: flex;
                justify-content: center;
            }
        }
    }
</style>