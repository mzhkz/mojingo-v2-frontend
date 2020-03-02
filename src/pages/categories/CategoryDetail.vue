<template>
    <div v-if="CATEGORY_DATA && WORD_DATA">
        <Modal :show="createReviewModal.modal" title="小テストを作成">
            <sui-form @submit.prevent="">
                <sui-form-fields fields="two">
                    <sui-form-field>
                        <input v-model="createReviewModal.start"
                               type="number"
                               placeholder="From ..." />
                    </sui-form-field>
                    <sui-form-field>
                        <input v-model="createReviewModal.end"
                               type="number"
                               placeholder="To" />
                    </sui-form-field>
                </sui-form-fields>
                <div class="space h30"></div>
                <sui-button type="cancel" @click="createReviewModal.modal=false">キャンセル</sui-button>
                <sui-button @click="submitCreateReview">上記の範囲から作成</sui-button>
            </sui-form>
        </Modal>

        <Modal :show="editCategoryModal.modal" title="辞書を編集">
            <sui-form @submit.prevent="">
                <sui-form-field>
                    <label>辞書名</label>
                    <input v-model="editCategoryModal.name"
                           type="text"
                           placeholder="辞書名" />
                </sui-form-field>
                <sui-form-field>
                    <label>説明</label>
                    <input v-model="editCategoryModal.description"
                           type="text"
                           placeholder="この辞書の説明" />
                </sui-form-field>
                <div class="space h30"></div>
                <sui-button type="cancel" @click="editCategoryModal.modal=false">キャンセル</sui-button>
                <sui-button @click="submitUpdateCategory">更新</sui-button>
            </sui-form>
        </Modal>


        <div class="page-header">
            <div class="category-icon">
                <i class="fas fa-dice-d6"></i>
            </div>
            <div class="category-information">
                <h2>
                    {{CATEGORY_DATA.name}}
                </h2>
                <p>{{CATEGORY_DATA.description}}</p>
                <p class="created-date"><i class="fas fa-history"></i> 日前に作成</p>
            </div>
        </div>
        <div class="page-contents">
            <div v-if="$store.state.authenticate.level >= 2"
                 class="contents-action-button"
                 @click="openUpdateCategory">
                <h2>辞書を編集</h2>
            </div>
            <div class="words">
                <div class="tools-bar">
                    <Search v-model="keyword"
                            @submit="handleChangeWord"
                            placeholder="単語を検索"/>
                    <div class="commands-wrapper">
                        <button @click="createReviewModal.modal = true">
                            <i class="fas fa-play"></i>
                        </button>
                    </div>
                </div>
                <Pagination :maxValue="MAX_PAGE_SIZE" v-model="page"/>
                <WordCard v-for="word in WORD_DATA"
                          :key="word.id"
                          :name="word.name"
                          :mean="word.mean"
                          :number="word.number"/>

                <Pagination :maxValue="MAX_PAGE_SIZE" v-model="page"/>
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
                keyword: null,
                createReviewModal: {
                    modal: false,
                    start: "",
                    end: "",
                },
                editCategoryModal: {
                    modal: false,
                    name: null,
                    description: null,
                },

                MAX_PAGE_SIZE: 0,
                CATEGORY_DATA: null,
                WORD_DATA: null,
            }
        },
        methods: {
            async fetchCategory() {
                const {data, message} = await this.$WORDLINKAPI.get(`/categories/view/${this.$route.params["id"]}`);
                this.CATEGORY_DATA = data.category;
                await this.$store.dispatch('application/SET_TITLE', `辞書「${this.CATEGORY_DATA.name}」`)
            },

            async fetchWords() {
                const {data, message} = await this.$WORDLINKAPI
                    .get(`/categories/view/${this.$route.params["id"]}/words`, {
                        params: {
                            page: this.page,
                            keyword: this.keyword
                        }
                    });
                this.WORD_DATA = data.body;
                this.MAX_PAGE_SIZE = data.pageSize;
            },

            async updateCategory({name, description}) {
                const {data, message} = await this.$WORDLINKAPI
                    .post(`/categories/view/${this.$route.params["id"]}/update`, {
                        name: name,
                        description: description,
                    });
                await this.$store.dispatch('alert/PUSH_ALERT', {
                    icon: "",
                    level: 0,
                    message: `更新しました`,
                });
                await this.fetchCategory();
            },

            async createReview(categoryId, {start, end, shuffle}) {
                const {data, message} = await this.$WORDLINKAPI.post(`/reviews/create/`, {
                    category: categoryId,
                    start: start,
                    end: end,
                    shuffle: shuffle
                });
                await this.$router.push({name: 'marking', params: {id: data.id, which: this.$store.state.authenticate.id}});

                await this.$store.dispatch('alert/PUSH_ALERT', {
                    icon: "",
                    level: 0,
                    message: `${data.name}を作成しました`,
                });
            },

            submitUpdateCategory() {
                this.editCategoryModal.modal = false;
                this.updateCategory({
                    name: this.editCategoryModal.name,
                    description: this.editCategoryModal.description,
                })
            },

            openUpdateCategory() {
                this.editCategoryModal = {
                    modal: true,
                    name: this.CATEGORY_DATA.name,
                    description: this.CATEGORY_DATA.description
                };
            },

            submitCreateReview() {
                this.createReviewModal.modal = false;
                this.createReview(this.CATEGORY_DATA.id, {
                    start: this.createReviewModal.start,
                    end: this.createReviewModal.end,
                    shuffle: true,
                })
            },

            handleChangeWord() {
                this.page = 1;
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

            keyword() {
                this.fetchWords();
                this.page = 1
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