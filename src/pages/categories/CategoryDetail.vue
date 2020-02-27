<template>
    <div v-if="categoryData && wordData">
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
                    {{categoryData.name}}
                </h2>
                <p>{{categoryData.description}}</p>
                <p class="created-date"><i class="fas fa-history"></i> 日前に作成</p>
            </div>
        </div>
        <div class="page-contents">
            <div class="words">
                <div class="tools-bar">
                    <Search v-model="keyword" placeholder="単語を検索"/>
                    <div class="commands-wrapper">
                        <button @click="openModal = !openModal">
                            <i class="fas fa-pen"></i>
                        </button>
                    </div>
                </div>
                <Pagination :maxValue="maxPageSize" v-model="page"/>
                <WordCard v-for="word in wordData"
                          :key="word.id"
                          :name="word.name"
                          :mean="word.mean"
                          :number="word.number"/>

                <Pagination :maxValue="maxPageSize" v-model="page"/>
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
            return {
                page: 1,
                maxPageSize: 0,
                keyword: null,
                openModal: false,

                categoryData: null,
                wordData: null,
            }
        },
        methods: {
            async fetchCategory() {
                const {data, message} = await this.$WORDLINKAPI.get(`/categories/view/${this.$route.params["id"]}`);
                this.categoryData = data.category;
                this.maxPageSize = data.maxPageSize
            },

            async fetchWords() {
                const {data, message} = await this.$WORDLINKAPI
                    .get(`/categories/view/${this.$route.params["id"]}/words`, {
                        params: {
                            page: this.page,
                            keyword: this.keyword
                        }
                    });
                this.wordData = data;
            }
        },

        beforeMount() {
            this.fetchWords();
            this.fetchCategory()
        },

        watch: {
            page() {
              this.fetchWords();
            },
        }
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