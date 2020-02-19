<template>
    <div>
        <Search v-model="valueBasic" placeholder="単語を検索"/>
        <Pagination :maxValue="2" v-model="current"/>
        <WordCard v-for="n in 20" :key="n" name="assume" mean="当然のことだと思う；手に入れる；引き受ける" number="1234"/>
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
            return({
                current: 1,
                valueBasic: null,
            })
        },
    }
</script>

<style scoped>

</style>