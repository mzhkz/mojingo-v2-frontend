<template>
    <div class="members">
        <div class="user-card">
            <div class="user-upper-contents">
                <div class="user-icon">
                    <i class="fas fa-user"></i>
                </div>
                <div class="user-information">
                    <h2>Riku Mochizuki</h2>
                    <p>riku_M @ </p>
                </div>
            </div>
            <div class="user-lower-contents">
                <sui-dropdown text="操作">
                    <sui-dropdown-menu>
                        <sui-dropdown-item>プロフィールを表示</sui-dropdown-item>
                        <sui-dropdown-item>基本情報を変更</sui-dropdown-item>
                        <sui-dropdown-item>パスワードを変更</sui-dropdown-item>
                        <sui-dropdown-item>管理権限を付与
                            <span class="description">すべてのデータにアクセス可能</span>
                        </sui-dropdown-item>
                    </sui-dropdown-menu>
                </sui-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Admin"
    }
</script>

<style scoped lang="scss">
    .user-card {
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .user-upper-contents {
            display: flex;
            align-items: center;

            .user-icon {
                text-align: center;
                padding: 20px 24px;
                border-radius: 50px;
                background: $app-primary-content-color;
                color: $app-content-color;
            }

            .user-information {
                padding: 0 0 0 30px;
            }
        }

    }
</style>