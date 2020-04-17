<template>
    <div class="dashboard">
        <Search v-model="keyword" placeholder="単語を検索"/>
        <div v-if="keyword">
            <p v-if="WORD_DATA.length <= 0" class="not-search-result">{{WORD_DATA.length}}件の単語が見つかりました</p>
            <p v-else class="not-search-result">{{RESULT_WORD_SIZE}}件の単語が見つかりました。</p>
            <Pagination :maxValue="MAX_PAGE_SIZE" v-model="page"/>
            <WordCard v-for="word in WORD_DATA"
                      :key="word.id"
                      :displayCategory="true"
                      :WORD_DATA="word"/>
            <Pagination :maxValue="MAX_PAGE_SIZE" v-model="page"/>
        </div>
        <div v-else>
            <div class="space h30"></div>
            <p v-if="RECOMMENDED.length <= 0" class="not-search-result">復習する単語はありません</p>
            <p v-else class="not-search-result">ようこそ！{{$store.state.authenticate.name}}さん。</p>
            <RecommendedCard v-for="(data, index) in RECOMMENDED"
                             :key="data.category.id"
                             @createReviewHandle="createReview"
                             :id="data.category.id"
                             :category="data.category.name"
                             :entries="data.entriesSize"
                             :review="data.reviewSize"/>
        </div>
    </div>
</template>

<script>
    import WordCard from "../../components/WordCard";
    import Pagination from "@/components/Pagination";
    import Search from "@/components/Search";
    import RecommendedCard from '@/components/RecommendedCard';

    export default {
        name: "Dashboard",
        components: {
            WordCard,
            Pagination,
            Search,
            RecommendedCard,
        },
        data() {
            return {
                page: 1,
                keyword: null,

                MAX_PAGE_SIZE: 0,
                RESULT_WORD_SIZE: 0,
                WORD_DATA: [],

                RECOMMENDED: [],
            }
        },
        methods: {
            async fetchWords() {
                const {data, message} = await this.$WORDLINKAPI
                    .get(`/words/search`, {
                        params: {
                            page: this.page,
                            keyword: this.keyword
                        }
                    });
                this.WORD_DATA = data.body;
                this.MAX_PAGE_SIZE = data.pageSize;
                this.RESULT_WORD_SIZE = data.resultSize;

            },

            async fetchRecommended() {
                const {data, message} = await this.$WORDLINKAPI
                    .get(`/words/recommended`);
                this.RECOMMENDED = data;
            },

            async createReview(categoryId) {
                const {data, message} = await this.$WORDLINKAPI.post(`/words/recommended`, {
                    categoryId: categoryId,
                });
                await this.$router.push({name: 'review', params: {id: data.id, which: this.$store.state.authenticate.id}});

                await this.$store.dispatch('alert/PUSH_ALERT', {
                    icon: "check",
                    level: 1,
                    message: `${data.name}を作成しました`,
                });
            },
        },

        watch: {
            page() {
                this.fetchWords();
            },

            keyword() {
                this.fetchWords();
                this.page = 1
            }
        },
        beforeMount() {
            this.fetchRecommended();
        }
    }
</script>

<style lang="scss">
    .dashboard {
        .not-search-result {
            margin: 30px 10px;
            font-size: 13px;
            text-align: center;
            color: $default-link-color;
        }
    }
</style>