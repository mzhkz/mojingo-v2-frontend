<template>
    <div>
        <Modal :show="openModal" title="小テストを作成">
            <sui-form>
                <sui-form-fields fields="two">
                    <sui-form-field>
                        <input placeholder="From ..." />
                    </sui-form-field>
                    <sui-form-field>
                        <input placeholder="To" />
                    </sui-form-field>
                </sui-form-fields>
                <div class="space h30"></div>
                <sui-button type="submit">上記の範囲から作成</sui-button>
            </sui-form>
        </Modal>
        <div class="page-header">
            <div class="category-icon">
                <i class="fas fa-dice-d6"></i>
            </div>
            <div class="category-information">
                <h2>
                    ターゲット1900
                </h2>
                <p>対象: 最難関私立・難関国公立大学志望の方向け</p>
                <p class="created-date"><i class="fas fa-history"></i> 14日前に作成</p>
            </div>
        </div>
        <div class="page-contents">
            <div class="words">
                <div class="tools-bar">
                    <Search v-model="valueBasic" placeholder="単語を検索"/>
                    <div class="commands-wrapper">
                        <button @click="openModal = !openModal">
                            <i class="fas fa-pen"></i>
                        </button>
                    </div>
                </div>
                <Pagination :maxValue="10" v-model="current"/>
                <WordCard name="emerge" mean="現れる；出てくる" number="1900"/>
                <WordCard name="engage" mean="雇う；従事する；従事させる" number="1900"/>
                <WordCard name="atmosphere" mean="大気；雰囲気" number="1901"/>
                <WordCard name="admire" mean="共感する；感心する" number="1902"/>
                <WordCard name="atmosphere" mean="大気；雰囲気" number="1901"/>
                <WordCard name="atmosphere" mean="大気；雰囲気" number="1901"/>
                <WordCard name="atmosphere" mean="大気；雰囲気" number="1901"/>
                <WordCard name="atmosphere" mean="大気；雰囲気" number="1901"/>
                <WordCard name="atmosphere" mean="大気；雰囲気" number="1901"/>

                <Pagination :maxValue="10" v-model="current"/>
            </div>
        </div>
    </div>
</template>

<script>
    import WordCard from "@/components/WordCard";
    import Pagination from "@/components/Pagination";
    import Search from "@/components/Search";
    import Modal from '@/components/Modal';

    export default {
        name: "CategoryDetail",
        components: {
            WordCard,
            Pagination,
            Search,
            Modal,
        },
        data() {
            return ({
                current: 1,
                valueBasic: null,
                openModal: false,
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
            .tools-bar {
                margin: 10px 0;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .search-wrapper {
                    width: 100%;
                }

                .commands-wrapper {
                    button {
                        border: none;
                        background: transparent;
                        padding: 10px 12px;
                        color: $default-link-color;
                        cursor: pointer;
                        text-decoration: none;
                        transition: background 200ms ease-out;

                        &:hover {

                        }
                    }
                }
            }

            .review-finished {
                width: 100%;
                padding: 20px 0;
                display: flex;
                justify-content: center;
            }
        }
    }
</style>