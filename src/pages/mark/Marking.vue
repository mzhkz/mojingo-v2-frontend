<template>
    <div v-if="QUESTION">
        <div class="marking-sheet">
           <h2>
               <span class="number">問{{QUESTION.number}}.</span>
               {{QUESTION.name}}
               <span @click="playSpeech(QUESTION.wordId)" class="speech">
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
                    <small v-if="QUESTION.description">{{QUESTION.description}}</small>
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

                audioBuffer: null, //音声キャッシュ
                enableAutoSpeechWord: false, //単語を読み上げるか
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

                this.playSpeech(this.QUESTION.wordId)
            },

            async postResult({target, result}) {
                await this.$store.dispatch('alert/CLEAR_ALERT');
                const {data, message} =
                    await this.$WORDLINKAPI
                        .post(`/reviews/${this.$route.params["which"]}/${this.$route.params["id"]}/let/mark/${this.MARKER_ID}`, {
                        target: target,
                        result: result,
                    });
                this.showAnswer = this.onlyRecord;
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

                    this.audioBuffer = null; //音声データをリセット
                    this.playSpeech(this.QUESTION.wordId);
                }
            },

            submitAnswer({target, result}) {
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
            },

            /** 再生 */
            async playSpeech(word_id) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                const audioContent = new AudioContext();
                audioContent.createBufferSource().start(0);
                const instance = this; //Safari対応策
                if (!this.audioBuffer) { //mp3のbufferをすでにロード済みかどうか
                    const audioData = await this.$WORDLINKAPI.get(`/words/${word_id}/pronounce`, { responseType: "arraybuffer" }); //mp3を取得
                    audioContent.decodeAudioData(audioData, function (audioBuffer) { //SafariがPromise対応のため
                        instance.audioBuffer = audioBuffer;
                        instance.createAudioSourceAndPlay(audioContent, audioBuffer);
                    });
                } else {
                    this.createAudioSourceAndPlay(audioContent, this.audioBuffer);//再生
                }
            },

            createAudioSourceAndPlay(audioContent, audioBuffer) {
                const audioSource = audioContent.createBufferSource();
                audioSource.buffer = audioBuffer;
                audioSource.loop = false;
                audioSource.connect(audioContent.destination);
                audioSource.start(0);　//再生
            },
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