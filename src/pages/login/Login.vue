<template>
    <div>
        <sui-form @submit.prevent="loginRequest(form.username, form.password)">
            <sui-form-field>
                <label>ユーザネーム</label>
                <input placeholder="Username" v-model="form.username"/>
<!--                <sui-label basic color="red" pointing>ユーザー名が無効です。</sui-label>-->
            </sui-form-field>
            <sui-form-field>
                <label>パスワード</label>
                <input type="password" placeholder="Password" v-model="form.password"/>
            </sui-form-field>
<!--            <sui-form-field>-->
<!--                <sui-checkbox label="ログイン情報を保存する" />-->
<!--            </sui-form-field>-->
            <sui-button type="submit" primary>ログイン</sui-button>
        </sui-form>
    </div>
</template>

<script>
    import DummyItem from '@/components/DummyItem';

    export default {
        name: "Login",
        components:{
            DummyItem
        },
        data() {
            return {
                form: {
                    username: null,
                    password: null,
                }
            }
        },

        methods: {
            async loginRequest(username, password) {
                const params = new URLSearchParams();
                const response = await this.$WORDLINKAPI.post(`/authentication/credential`, {
                    base64Email: username,
                    base64Password: password,
                });

                const {data, message} = response;

                await this.$store.dispatch('authenticate/UPDATE', {
                    token: message,
                    id: data.id,
                    username: data.username,
                    created: data.createdAt,
                    updated: data.updatedAt,
                    level: data.accessLevel,
                    name: `${data.firstName} ${data.lastName}`,
                });


                const redirect = this.$route.params["redirect"];
                await this.$router.push(redirect ? redirect : "/");

                await this.$store.dispatch('alert/PUSH_ALERT', {
                    icon: "sign-in-alt",
                    level: 1,
                    message: "ログインしました"
                });
            }
        }
    }
</script>

<style scoped>

</style>