<template>
    <div>
        <CategoryCard name="ターゲット1900" description="対象: 最難関私立・難関国公立大学志望の方向け" :number="1900"></CategoryCard>
        <CategoryCard name="データベース3000" description="対象: 共通テスト・センター試験・中堅大学" :number="1800"></CategoryCard>
    </div>
</template>

<script>
    import CategoryCard from '../../components/CatrgoryCard';

    export default {
        name: "Category",
        components: {
            CategoryCard
        }
    }
</script>

<style scoped>

</style>