<template>
    <div>
        <div class="page-header">
            <div class="category-icon">
                <i class="fas fa-dice-d6"></i>
            </div>
            <div class="category-information">
                <h2>
                    ターゲット1900
                </h2>
                <p>対象: 最難関私立・難関国公立大学志望の方向け</p>
                <p class="created-date"><i class="fas fa-history"></i>  14日前に作成</p>
            </div>
        </div>
        <div class="page-contents">
            <div class="words">
                <Pagination :maxValue="10" v-model="current"/>
                <h2>小テスト結果</h2>
                <WordCard name="admire" mean="共感する；感心する" :number="1900"/>
                <WordCard name="admire" mean="共感する；感心する" :number="1901"/>
                <WordCard name="admire" mean="共感する；感心する" :number="1902"/>
            </div>
        </div>
    </div>
</template>

<script>
    import WordCard from "@/components/WordCard";
    import Pagination from "@/components/Pagination";

    export default {
        name: "CategoryDetail",
        components: {
            WordCard,
            Pagination,
        },
        data() {
            return({
                current: 1,
            })
        },
    }
</script>

<style scoped lang="scss">
    .page-header {
        color: $default-link-color;
        min-height: 150px;

        display: flex;
        align-items: center;

        .category-icon {
            padding: 33px;
            border-radius: 50%;


            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 28px;
            background: $app-primary-focus-color;
        }

        .category-information {
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
        .words {
            .review-finished {
                width: 100%;
                padding: 20px 0;
                display: flex;
                justify-content: center;
            }
        }
    }
</style>