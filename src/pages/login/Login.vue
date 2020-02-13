<template>
    <div>
        <sui-form>
            <sui-form-field>
                <label>ユーザネーム</label>
                <input placeholder="Username" />
<!--                <sui-label basic color="red" pointing>ユーザー名が無効です。</sui-label>-->
            </sui-form-field>
            <sui-form-field>
                <label>パスワード</label>
                <input type="password" placeholder="Password" />
            </sui-form-field>
            <sui-form-field>
                <sui-checkbox label="ログイン情報を保存する" />
            </sui-form-field>
            <sui-button type="submit" primary>ログイン</sui-button>
        </sui-form>
    </div>
</template>

<script>
    export default {
        name: "Login"
    }
</script>

<style scoped>

</style>