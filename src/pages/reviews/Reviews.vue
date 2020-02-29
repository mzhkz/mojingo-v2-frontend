<template>
   <div v-if="REVIEW_DATA">
       <Pagination v-model="page" :maxValue="MAX_PAGE_SIZE"/>
       <router-link
               v-for="(data, index) in REVIEW_DATA"
               :key="data.review.id"
               :to="{name: 'review', params: {id: data.review.id}}">
           <ReviewCard
                   :name="data.review.name"
                   :description="`${data.createAgo}に作成`"
                   :correct="data.correctSize"
                   :all="data.incorrectSize + data.correctSize"
                   :finished="data.review.finished"
           />
       </router-link>
       <Pagination v-model="page" :maxValue="MAX_PAGE_SIZE"/>
       <p v-if="REVIEW_DATA.length === 0" class="not-search-result">検索結果なし</p>
   </div>
</template>

<script>
    import ReviewCard from "@/components/ReviewCard"
    import Pagination from "@/components/Pagination";
    export default {
        name: "Reviews",
        components: {
            ReviewCard,
            Pagination,
        },
        data() {
            return {
                page: 1,
                MAX_PAGE_SIZE: 0,
                REVIEW_DATA: null,
            }
        },
        methods: {
            async fetchData() {
                const {data, message} = await this.$WORDLINKAPI.get(`/reviews/${this.$route.params["which"]}`, {
                    params: {
                        page: this.page,
                    }
                });
                this.REVIEW_DATA = data.reviews;
                this.MAX_PAGE_SIZE = data.pageSize;
            },
        },

        beforeMount() {
            this.fetchData();
        },
        watch: {
            page() {
              this.fetchData()
            },
        }
    }
</script>

<style scoped>

</style>