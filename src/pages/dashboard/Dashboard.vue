<template>
    <div>
        <WordCard v-for="n in 100" name="assume" mean="当然のことだと思う；手に入れる；引き受ける" number="1234"/>
    </div>
</template>

<script>
    import WordCard from "../../components/WordCard";

    export default {
        name: "Dashboard",
        components: {
            WordCard
        }
    }
</script>

<style scoped>

</style>