<template>
    <div>
        <div class="page-header">
            <div class="review-icon pass">
                <i class="fas fa-undo-alt"></i>
            </div>
            <div class="review-information">
                <h2>
                    1200-1900
                </h2>
                <p>小テストの結果です</p>
                <p class="created-date"><i class="fas fa-history"></i>  14日前に作成</p>
            </div>
        </div>
        <div class="page-contents">
            <div class="answers">
                <h2>小テスト結果</h2>
                <WordCard name="admire" mean="共感する；感心する" :number="1900" borderColor="#87e2ab"/>
                <WordCard name="admire" mean="共感する；感心する" :number="1901" borderColor="#87e2ab"/>
                <WordCard name="admire" mean="共感する；感心する" :number="1902" borderColor="#e29887"/>
                <div class="review-finished">
                    <sui-button @click="$router.push({ name: 'reviews', params: { which: 'me'}})">復習テストを完了する</sui-button>
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
            width: 90px;
            height: 90px;
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
                    margin: 12px 0 0 0;
                    font-size: .87rem;
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