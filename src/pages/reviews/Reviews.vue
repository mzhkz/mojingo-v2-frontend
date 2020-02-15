<template>
    <ReviewCard
            name="小テスト 300-400"
            description="確認テスト @ 2020年 02月15日 "
            :correct="100"
            :all="120"
    />
</template>

<script>
    import ReviewCard from "@/components/ReviewCard"
    export default {
        name: "Reviews",
        components: {
            ReviewCard
        }
    }
</script>

<style scoped>

</style>