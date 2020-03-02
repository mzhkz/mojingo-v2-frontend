<template>
    <div>
        <Search v-model="keyword" placeholder="単語を検索"/>
        <p v-if="WORD_DATA.length <= 0" class="not-search-result">検索結果なし</p>
        <p v-else class="not-search-result">{{RESULT_WORD_SIZE}}件の単語が見つかりました。</p>
        <Pagination :maxValue="MAX_PAGE_SIZE" v-model="page"/>
        <WordCard v-for="word in WORD_DATA"
                  :key="word.id"
                  :name="word.name"
                  :mean="word.mean"
                  :number="word.number"
                  :category="word.category.name"/>
        <Pagination :maxValue="MAX_PAGE_SIZE" v-model="page"/>
    </div>
</template>

<script>
    import WordCard from "../../components/WordCard";
    import Pagination from "@/components/Pagination";
    import Search from "@/components/Search";

    export default {
        name: "Dashboard",
        components: {
            WordCard,
            Pagination,
            Search,
        },
        data() {
            return {
                page: 1,
                keyword: null,

                MAX_PAGE_SIZE: 0,
                RESULT_WORD_SIZE: 0,
                WORD_DATA: [],
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
    .not-search-result {
        margin: 30px 10px;
        font-size: 13px;
        text-align: center;
        color: $default-link-color;
    }
</style>