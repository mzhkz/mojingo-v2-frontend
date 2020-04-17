<template>
    <div class="word-card" :class="doPaintByLevel(WORD_DATA.rank)">
        <span class="appeal-level" :style="{'border-color': borderColor}"></span>
        <div class="word-basic-information">
            <div class="word-description-wrap">
                <h2>
                    <a @click="openWebDictionary('webilio')"> {{ WORD_DATA.name }}</a>
                    <span @click="playSpeech(WORD_DATA.id)" class="speech">
                        <i class="fas fa-volume-up"></i>
                    </span>
                </h2>
                <p>{{ WORD_DATA.mean}}</p>
            </div>
            <div class="word-keyring-wrap">
                {{WORD_DATA.number}}
            </div>
        </div>
        <div v-if="displayDescription && WORD_DATA.description" class="word-descriptions">
            <p v-html="WORD_DATA.description"> </p>
        </div>
        <div v-if="displayCategory" class="word-descriptions">
            <p>> {{WORD_DATA.category.name}}</p>
        </div>
    </div>
</template>

<script>
    import Modal from '@/components/Modal';

    export default {
        name: "WordCard",
        components: {
            Modal,
        },
        props: {
            WORD_DATA: {type: Object},
            displayCategory: {type: Boolean, default: false},
            displayDescription: {type: Boolean, default: true},
            borderColor: {type: String},
        },
        data() {
            return {
                audioBuffer: null //音声データをリセット
            }
        },
        methods: {
            /** 再生 */
            async playSpeech(word_id) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                const audioContent = new AudioContext();
                audioContent.createBufferSource().start(0);
                const instance = this; //Safari対応策
                if (!this.audioBuffer) { //mp3のbufferをすでにロード済みかどうか
                    const audioData = await this.$WORDLINKAPI.get(`/words/${word_id}/pronounce`, {responseType: "arraybuffer"}); //mp3を取得
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

            /**
             * web辞書サービスのミニウインドウを開く
             * @param service
             */
            openWebDictionary(service) {
                const keyword = this.WORD_DATA.name;
                let url = '';
                switch (service) {
                    case 'webilio': {
                        url = `https://ejje.weblio.jp/content/${keyword}`;
                        break;
                    }
                }
                window.open(url, "DescriptiveWindowName",
                    "resizable=no,width=600,height=670,scrollbars=yes,status=no")
            },

            /** ランクごとに色分けするクラスを適用 */
            doPaintByLevel(rank) {
                return {
                    "stage-1": rank < 2 && rank > 0,
                    "stage-2": 2 <= rank && rank <= 4,
                    "stage-3": 5 <= rank,
                }
            },
        },
    }
</script>

<style lang="scss">

    .word-card {
        position: relative;
        background: $app-content-color;
        overflow: hidden;
        box-shadow: 0 0px 7px 1px #efefef;
        border-radius: 6px;

        &:nth-child( n + 1 ) {
            margin-bottom: 8px;
        }

        @mixin stage-color($theme-color) {
            .concept-line {
                background: $theme-color;
            }

            .appeal-level {
                border-color: lighten( $theme-color, 20%);
                background: $theme-color;
            }
        }
        &.stage-0 {
            @include stage-color($app-primary-focus-color);
        }
        &.stage-1 {
            @include stage-color($warning-color);
        }
        &.stage-2 {
            @include stage-color($success-color);
        }
        &.stage-3 {
            @include stage-color($info-color);
        }

        .appeal-level {
            position: absolute;
            width: 19px;
            height: 19px;
            background: $app-primary-color;
            border: 3px solid $app-primary-focus-color;
            border-radius: 10px;
            top: 33px;
            left: -10px;
        }

        .concept-line {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            height: 100%;
            width: 2px;
            background: $app-primary-focus-color;
        }


        .word-descriptions {
            padding: 8px;
            background: $app-primary-color;
            color: lighten( $default-link-color, 15%);
            border-bottom: 10px solid $app-content-color;
            border-left: 10px solid $app-content-color;

            p {
                font-size: 13px;

                .verb-block {
                    cursor: pointer;
                    background: lighten( $accent-thin-color, 3%);
                    color: lighten( $default-link-color, 5%);
                    border-radius: 3px;
                    padding: 1px 3px;
                    margin: 0 5px;
                }
            }
        }

        .word-basic-information {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 82px;

            .word-description-wrap {
                width: 100%;
                padding: 0 40px 5px 31px;
                font-family: $default-font-family;

                h2 {
                    font-weight: unset;
                    font-size: 18px;
                    margin-bottom: 5px;
                    color: $default-link-color;
                    font-family: unset;

                    a {
                        cursor: pointer;
                    }

                    .speech {
                        font-size: 15px;
                        padding: 3px;
                        margin-left: 10px;
                        color: #bdbfcc;
                        cursor: pointer;

                        &:hover {
                            color: $default-letter-color;
                        }
                    }
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
                color: $default-link-color;
                font-size: 11px;
                font-weight: bold;
            }
        }
    }
</style>