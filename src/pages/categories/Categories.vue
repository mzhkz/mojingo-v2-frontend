<template>
    <div v-if="categories">
        <router-link
                v-for="(category, index) in categories"
                :key="category.raw.id"
                :to="{name: 'category_detail', params: {id: category.raw.id}}">
            <CategoryCard :name="category.raw.name"
                          :description="category.raw.description"
                          :number="category.wordSize"/>
        </router-link>
        <p v-if="categories.length === 0" class="not-search-result">検索結果なし</p>
    </div>
</template>

<script>
    import CategoryCard from '../../components/CatrgoryCard';
    // import Modal from '../../components/Modal';

    export default {
        name: "Category",
        components: {
            CategoryCard,
            // Modal,
        },
        data() {
            return {
                categories: null,
            }
        },
        methods: {
          async fetchData() {
              const {data, message} = await this.$WORDLINKAPI.get(`/categories`);
              this.categories = data;

          }
        },

        beforeMount() {
            this.fetchData();
        }
    }
</script>

<style scoped>

</style>