<template>
    <section>
        <div>
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
                    <sui-form-field>
                        <label>CSVファイル 形式: {No,Name,Mean}</label>
                        <input type="file"
                               @change="handleChangeCSVFile"
                               name="csv-file"
                        />
                    </sui-form-field>
                    <div class="space h30"></div>
                    <sui-button @click="registerCategoryForm.modal = false">キャンセル</sui-button>
                    <sui-button @click="submitCreateCategory">作成</sui-button>
                </sui-form>
            </Modal>


            <div v-if="categories">
                <div v-if="$store.state.authenticate.level >= 2" class="contents-action-button" @click="registerCategoryForm.modal = true">
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
    </section>
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
                    csvBody: [],
                },
            }
        },
        methods: {
            async fetchData() {
              const {data, message} = await this.$WORDLINKAPI.get(`/categories`);
              this.categories = data;
            },

            async createCategory({name, description, csvBody}) {
                const nameCached = this.registerCategoryForm.name;
                const {data, message} = await this.$WORDLINKAPI.post(`/categories/create`, {
                  name: this.registerCategoryForm.name,
                  description: this.registerCategoryForm.description,
                  csvBody: this.registerCategoryForm.csvBody,
                });
                await this.$store.dispatch('alert/PUSH_ALERT', {
                    icon: "",
                    level: 0,
                    message: `${nameCached}を作成しました`,
                });
                this.fetchData();
            },

            submitCreateCategory() {
                this.createCategory({
                    name: this.registerCategoryForm.name,
                    description: this.registerCategoryForm.description,
                    csvBody: this.registerCategoryForm.csvBody,
                });
                this.registerCategoryForm = {
                    modal: false,
                    name: null,
                    description: "",
                    csvBody: [],
                };
            },

            handleChangeCSVFile(event) {
              event.preventDefault();
              const files = event.target.files;
              this.readCSV(files[0]);
            },

            readCSV(fileData) {
                // CSVファイル以外は処理を止める
                if(!fileData.name.match('.csv$')) {
                    alert('CSVファイルを選択してください');
                    return;
                }
                this.registerCategoryForm.csvBody = [];
                // FileReaderオブジェクトを使ってファイル読み込み
                const reader = new FileReader();
                // ファイル読み込みに成功したときの処理
                reader.onload = () => {
                    const cols = reader.result.split('\n');
                    const data = [];
                    let response = "";
                    for (let i = 0; i < cols.length; i++) {
                        data[i] = cols[i];
                    }
                    this.registerCategoryForm.csvBody = data;
                    alert(`${data.length - 1}個の単語を検出しました`)
                };
                reader.readAsText(fileData);
            }
        },

        beforeMount() {
            this.fetchData();
        }
    }
</script>

<style scoped lang="scss">
</style>