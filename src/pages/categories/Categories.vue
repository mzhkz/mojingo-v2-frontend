<template>
    <div class="categories">
        <Modal :show="registerCategoryForm.modal" title="辞書を追加">
            <sui-form @submit.prevent="">
                <sui-form-field>
                    <label>辞書名</label>
                    <input
                            type="text"
                            v-model="registerCategoryForm.name"
                            name="name"
                            placeholder="辞書名"
                    />
                </sui-form-field>
                <sui-form-field>
                    <label>説明</label>
                    <input
                            type="text"
                            v-model="registerCategoryForm.description"
                            name="description"
                            placeholder="説明"
                    />
                </sui-form-field>
                <sui-form-field class="google-spreadsheet-id">
                    <label>Google Spreadsheet ID</label>
                    <p>{{ $store.state.application.serviceAccount }}</p>
                    <input
                            type="text"
                            v-model="registerCategoryForm.sheetId"
                            name="sheet_id"
                            placeholder="https://docs.google.com/spreadsheets/d/[ID]/"
                    />
                </sui-form-field>
                <div class="space h30"></div>
                <sui-button @click="registerCategoryForm.modal = false">キャンセル</sui-button>
                <sui-button @click="submitCreateCategory">作成</sui-button>
            </sui-form>
        </Modal>


        <div v-if="categories">
            <div class="contents-action-button" @click="registerCategoryForm.modal = true">
                <h2>辞書を追加</h2>
            </div>
            <router-link
                    v-for="(data, index) in categories"
                    :key="data.category.id"
                    :to="{name: 'category_detail', params: {id: data.category.id}}">
                <CategoryCard :name="data.category.name"
                              :description="data.category.description"
                              :number="data.wordCount"/>
            </router-link>
            <p v-if="categories.length === 0" class="not-search-result">検索結果なし</p>
        </div>
    </div>
</template>

<script>
    import CategoryCard from '../../components/CatrgoryCard';
    import Modal from '@/components/Modal';
    import DummyItem from '@/components/DummyItem';

    export default {
        name: "Category",
        components: {
            DummyItem,
            CategoryCard,
            Modal,
        },
        data() {
            return {
                categories: null,
                registerCategoryForm: {
                    modal: false,
                    name: null,
                    description: "",
                    sheetId: null,
                },
            }
        },
        methods: {
            async fetchData() {
              const {data, message} = await this.$MOJINGO_V2_API.get(`/categories`);
              this.categories = data;
            },

            async createCategory({name, description, sheetId}) {
                const nameCached = this.registerCategoryForm.name;
                const {data, message} = await this.$MOJINGO_V2_API.post(`/categories/create`, {
                    name: name,
                    description: description,
                    sheetId: sheetId,
                    private: true,
                });
                await this.$store.dispatch('alert/PUSH_ALERT', {
                    icon: "check",
                    level: 1,
                    message: `${nameCached}を作成しました`,
                });
                this.fetchData();
            },

            submitCreateCategory() {
                this.createCategory({
                    name: this.registerCategoryForm.name,
                    description: this.registerCategoryForm.description,
                    sheetId: this.registerCategoryForm.sheetId,
                });
                this.registerCategoryForm = {
                    modal: false,
                    name: null,
                    description: "",
                    sheetId: null,
                };
            },

        },

        beforeMount() {
            this.fetchData();
        }
    }
</script>

<style lang="scss">
    .categories {
        .google-spreadsheet-id {
            background:  $app-primary-color;
            padding: 10px;
            border-radius: 4px;
        }
    }
</style>