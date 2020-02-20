<template>
    <div>
        <router-link :to="{name: 'category_detail', params: {id: 'target1900'}}">
            <CategoryCard name="ターゲット1900" description="対象: 最難関私立・難関国公立大学志望の方向け" :number="1900"></CategoryCard>
        </router-link>
        <router-link :to="{name: 'category_detail', params: {id: 'database3000'}}">
            <CategoryCard name="データベース3000" description="対象: 共通テスト・センター試験・中堅大学" :number="1800"></CategoryCard>
        </router-link>
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