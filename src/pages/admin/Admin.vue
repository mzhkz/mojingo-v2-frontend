<template>
    <div>
        <Modal :show="registerUserForm.modal" title="ユーザーを追加">
            <sui-form>
                <sui-form-field>
                    <label>Name</label>
                    <sui-form-fields fields="two">
                        <sui-form-field>
                            <input
                                    type="text"
                                    name="name_first"
                                    placeholder="氏名"
                            />
                        </sui-form-field>
                        <sui-form-field>
                            <input
                                    type="text"
                                    name="name-last"
                                    placeholder="名前"
                            />
                        </sui-form-field>
                    </sui-form-fields>
                </sui-form-field>
                <sui-form-field>
                    <label>システム情報</label>
                    <sui-form-fields>
                        <sui-form-field width="twelve">
                            <input
                                    type="text"
                                    name="login_id"
                                    placeholder="ログイン固有ID"
                            />
                        </sui-form-field>
                        <sui-form-field width="four">
                            <input type="text" name="school-yars" placeholder="学年" />
                        </sui-form-field>
                    </sui-form-fields>
                </sui-form-field>
                <sui-form-field>
                    <label>権限</label>
                    <sui-dropdown
                            placeholder="権限"
                            selection
                            :options="setPermissionForm.options"
                            v-model="setPermissionForm.current"></sui-dropdown>
                </sui-form-field>
                <div class="space h30"></div>
                <sui-button @click="editBasicInfoForm.modal = false">キャンセル</sui-button>
                <sui-button type="submit">作成</sui-button>
            </sui-form>
        </Modal>


        <Modal :show="setPermissionForm.modal" title="権限を変更">
            <sui-form-field>
                <label>権限</label>
                <sui-dropdown
                        placeholder="権限"
                        selection
                        :options="setPermissionForm.options"
                        v-model="setPermissionForm.current"></sui-dropdown>
            </sui-form-field>
        </Modal>
        <Modal :show="resetPasswordForm.modal" title="パスワードをリセット">
            <sui-form>
                <sui-form-fields fields="two">
                    <sui-form-field>
                        <input placeholder="新しいパスワード" />
                    </sui-form-field>
                    <sui-form-field>
                        <input placeholder="もう一度入力してください" />
                    </sui-form-field>
                </sui-form-fields>
                <div class="space h30"></div>
                <sui-button @click="resetPasswordForm.modal = false">キャンセル</sui-button>
                <sui-button type="submit">変更</sui-button>
            </sui-form>
        </Modal>
        <Modal :show="editBasicInfoForm.modal" title="基本情報を変更">
            <sui-form>
                <sui-form-field>
                    <label>Name</label>
                    <sui-form-fields fields="two">
                        <sui-form-field>
                            <input
                                    type="text"
                                    name="name_first"
                                    placeholder="氏名"
                            />
                        </sui-form-field>
                        <sui-form-field>
                            <input
                                    type="text"
                                    name="name-last"
                                    placeholder="名前"
                            />
                        </sui-form-field>
                    </sui-form-fields>
                </sui-form-field>
                <sui-form-field>
                    <label>システム情報</label>
                    <sui-form-fields>
                        <sui-form-field width="twelve">
                            <input
                                    type="text"
                                    name="login_id"
                                    placeholder="ログイン固有ID"
                            />
                        </sui-form-field>
                        <sui-form-field width="four">
                            <input type="text" name="school-yars" placeholder="学年" />
                        </sui-form-field>
                    </sui-form-fields>
                </sui-form-field>
                <div class="space h30"></div>
                <sui-button @click="editBasicInfoForm.modal = false">キャンセル</sui-button>
                <sui-button type="submit">変更</sui-button>
            </sui-form>
        </Modal>


        <div class="members">
            <div class="register-user" @click="registerUserForm.modal = true">
                <h2>ユーザーを追加</h2>
            </div>
            <div v-for="i in 10" :key="i" class="user-card">
                <div class="user-upper-contents">
                    <div class="user-icon">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="user-information">
                        <h2>Riku Mochizuki</h2>
                        <p>riku_mochizuki -  20日前に参加</p>
                    </div>
                </div>
                <div class="user-lower-contents">
                    <sui-dropdown text="操作">
                        <sui-dropdown-menu>
                            <sui-dropdown-item>プロフィールを表示</sui-dropdown-item>
                            <sui-dropdown-item @click="editBasicInfoForm.modal = true">基本情報を変更</sui-dropdown-item>
                            <sui-dropdown-item @click="resetPasswordForm.modal = true">パスワードを変更</sui-dropdown-item>
                            <sui-dropdown-item @click="setPermissionForm.modal = true">権限を変更
                                <span class="description">すべてのデータにアクセス可能</span>
                            </sui-dropdown-item>
                        </sui-dropdown-menu>
                    </sui-dropdown>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Modal from '@/components/Modal';

    const parmissions = [
        {
            text: '生徒',
            value: 1,
        },
        {
            text: '管理者',
            value: 2,
        },
        {
            text: '利用制限（ログイン不可）',
            value: 0,
        },
    ];

    export default {
        name: "Admin",
        components: {
            Modal,
        },
        data() {
            return {
                resetPasswordForm: {
                    modal: false,
                },

                editBasicInfoForm: {
                    modal: false,
                },

                setPermissionForm: {
                    modal: false,
                    current: 1,
                    options: Object.assign([], parmissions),
                },

                registerUserForm: {
                    modal: false,
                    options: Object.assign([], parmissions),
                }
            }
        }
    }
</script>

<style scoped lang="scss">

    .register-user {
        padding: 20px;
        text-align: center;
        cursor: pointer;
        border: 2px dotted #e2e2e2;
        margin: 10px 0;

        transition: 200ms;

        &:hover {
            background: $app-primary-focus-color;
            border: 2px dotted $default-link-color;
        }
    }

    .user-card {
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &:nth-child(n + 1) {
            border-bottom: 1px solid #e8e8e8;
        }

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
                color: $default-link-color;

                h2 {
                    margin: 0 0 5px 0;
                }

                p {
                    font-size: 13px;
                }
            }
        }

    }
</style>