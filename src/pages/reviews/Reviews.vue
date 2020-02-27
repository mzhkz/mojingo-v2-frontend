<template>
   <div v-if="result">
       <ReviewCard
               v-for="(data, index) in result"
               :key="index"
               :name="data.review.name"
               :description="data.review.description"
               :correct="data.correctSize"
               :all="data.incorrectSize"
       />
       <p v-if="result.length === 0" class="not-search-result">検索結果なし</p>
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
                result: null,
            }
        },
        methods: {
            async fetchData() {
                const {data, message} = await this.$WORDLINKAPI.get(`/review/${this.$route.params["which"]}`);
                this.result = data;
            },
        },

        beforeMount() {
            this.fetchData();
        }


    }
</script>

<style scoped>

</style>