<template>
   <div v-if="REVIEW_DATA">
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
       <p v-if="REVIEW_DATA.length === 0" class="not-search-result">検索結果なし</p>
   </div>
</template>

<script>
    import ReviewCard from "@/components/ReviewCard"
    export default {
        name: "Reviews",
        components: {
            ReviewCard
        },
        data() {
            return {
                REVIEW_DATA: null,
            }
        },
        methods: {
            async fetchData() {
                const {data, message} = await this.$WORDLINKAPI.get(`/reviews/${this.$route.params["which"]}`);
                this.REVIEW_DATA = data;
            },
        },

        beforeMount() {
            this.fetchData();
        }


    }
</script>

<style scoped>

</style>