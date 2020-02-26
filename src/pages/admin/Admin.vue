<template>
    <div>
        <Modal :show="registerUserForm.modal" title="ユーザーを追加">
            <sui-form @submit.prevent="">
                <sui-form-field>
                    <label>Name</label>
                    <sui-form-fields fields="two">
                        <sui-form-field>
                            <input
                                    type="text"
                                    v-model="registerUserForm.firstName"
                                    name="name_first"
                                    placeholder="氏名"
                            />
                        </sui-form-field>
                        <sui-form-field>
                            <input
                                    type="text"
                                    v-model="registerUserForm.lastName"
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
                                    v-model="registerUserForm.username"
                                    name="login_id"
                                    placeholder="ログイン固有ID"
                            />
                        </sui-form-field>
                        <sui-form-field width="four">
                            <input
                                    v-model="registerUserForm.schoolYears"
                                    type="text"
                                    name="school-years" p
                                    laceholder="学年" />
                        </sui-form-field>
                    </sui-form-fields>
                </sui-form-field>
                <sui-form-field>
                    <label>権限</label>
                    <sui-dropdown
                            placeholder="権限"
                            selection
                            :options="registerUserForm.options"
                            v-model="registerUserForm.accessLevel"/>
                </sui-form-field>
                <sui-form-field>
                    <label>パスワード</label>
                    <input
                            v-model="registerUserForm.password"
                            type="password"
                            placeholder="新しいパスワード" />
                </sui-form-field>
                <div class="space h30"></div>
                <sui-button @click="registerUserForm.modal = false">キャンセル</sui-button>
                <sui-button
                        @click="submitEnrollUser"
                >作成</sui-button>
            </sui-form>
        </Modal>


        <Modal :show="setPermissionForm.modal" title="権限を変更">
            <sui-form-field>
                <label>権限</label>
                <sui-dropdown
                        placeholder="権限"
                        selection
                        :options="setPermissionForm.options"
                        v-model="setPermissionForm.accessLevel"/>
            </sui-form-field>
            <sui-button @click="setPermissionForm.modal = false">キャンセル</sui-button>
            <sui-button
                    @click="submitSetPermission">更新</sui-button>
        </Modal>


        <Modal :show="resetPasswordForm.modal" title="パスワードをリセット">
            <sui-form @submit.prevent="">
                <sui-form-fields fields="two">
                    <sui-form-field>
                        <input
                                v-model="resetPasswordForm.password"
                                placeholder="新しいパスワード" />
                    </sui-form-field>
                    <sui-form-field>
                        <input
                                v-model="resetPasswordForm.password_confirm"
                                placeholder="もう一度入力してください" />
                    </sui-form-field>
                </sui-form-fields>
                <div class="space h30"></div>
                <sui-button @click="resetPasswordForm.modal = false">キャンセル</sui-button>
                <sui-button @click="submitResetPassword">変更</sui-button>
            </sui-form>
        </Modal>


        <Modal :show="editBasicInfoForm.modal" title="基本情報を変更">
            <sui-form @submit.prevent="">
                <sui-form-field>
                    <label>Name</label>
                    <sui-form-fields fields="two">
                        <sui-form-field>
                            <input
                                    v-model="editBasicInfoForm.firstName"
                                    type="text"
                                    name="name_first"
                                    placeholder="氏名"
                            />
                        </sui-form-field>
                        <sui-form-field>
                            <input
                                    v-model="editBasicInfoForm.lastName"
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
                                    v-model="editBasicInfoForm.username"
                                    type="text"
                                    name="login_id"
                                    placeholder="ログイン固有ID"
                            />
                        </sui-form-field>
                        <sui-form-field width="four">
                            <input
                                    v-model="editBasicInfoForm.schoolYears"
                                    type="text"
                                    name="school-years"
                                    placeholder="学年" />
                        </sui-form-field>
                    </sui-form-fields>
                </sui-form-field>
                <div class="space h30"></div>
                <sui-button @click="editBasicInfoForm.modal = false">キャンセル</sui-button>
                <sui-button @click="submitEditBasicInfo">変更</sui-button>
            </sui-form>
        </Modal>


        <div class="members">
            <div class="register-user" @click="registerUserForm.modal = true">
                <h2>ユーザーを追加</h2>
            </div>
            <div v-for="user in users" :key="user.id" class="user-card">
                <div class="user-upper-contents">
                    <div class="user-icon">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="user-information">
                        <h2>{{user.username}}</h2>
                        <p>{{user.firstName + " " + user.lastName}}</p>
                    </div>
                </div>
                <div class="user-lower-contents">
                    <sui-dropdown text="操作">
                        <sui-dropdown-menu>
                            <sui-dropdown-item
                                    @click="$router.push({name: 'profile', params: {which: user.username}})">プロフィールを表示</sui-dropdown-item>
                            <sui-dropdown-item
                                    @click="openEditBasicInfo(user)">基本情報を変更</sui-dropdown-item>
                            <sui-dropdown-item
                                    @click="openResetPassword(user)">パスワードを変更</sui-dropdown-item>
                            <sui-dropdown-item
                                    @click="openSetPermission(user)">権限を変更
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
                users: null,
                focusingUser: null, //Edit

                resetPasswordForm: {
                    modal: false,
                    password: null,
                    password_confirm: null,
                },

                editBasicInfoForm: {
                    modal: false,
                    username: null,
                    firstName: null,
                    lastName: null,
                    schoolYears: null,
                },

                setPermissionForm: {
                    modal: false,
                    accessLevel: 1,
                    options: Object.assign([], parmissions),
                },

                registerUserForm: {
                    modal: false,
                    options: Object.assign([], parmissions),
                    accessLevel: 1,
                    username: null,
                    firstName: null,
                    lastName: null,
                    schoolYears: null,
                    password: null,
                },
            }
        },
        methods: {
            async fetchData() {
                const response = await this.$WORDLINKAPI.get(`/user/list`);
                const {data, message} = response;
                this.users = data;
            },

            async updateUser(id, {username, firstName, lastName}) {
                const {message} = await this.$WORDLINKAPI.post(`/user/profile/${id}/update`, {
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                });

                await this.$store.dispatch('alert/PUSH_ALERT', {
                    icon: "",
                    level: 0,
                    message: `${username}を更新しました`,
                });
            },

            /** Register a user */
            async enrollUser({username, accessLevel, firstName, lastName, password}) {
                const {message} = await this.$WORDLINKAPI.post(`/user/enroll`, {
                    username: username,
                    accessLevel: accessLevel,
                    firstName: firstName,
                    lastName: lastName,
                    password: password
                });

                await this.$store.dispatch('alert/PUSH_ALERT', {
                    icon: "",
                    level: 0,
                    message: `${username}を登録しました`,
                });
            },

            async resetPasswordUser(id, {password}) {
                const {message} = await this.$WORDLINKAPI.post(`/user/profile/${id}/reset-pass`, {
                   password: password
                });

                await this.$store.dispatch('alert/PUSH_ALERT', {
                    icon: "",
                    level: 0,
                    message: `パスワードを更新しました`,
                });
            },

            async setPermissionUser(id, {accessLevel}) {
                const {message} = await this.$WORDLINKAPI.post(`/user/profile/${id}/qualify`, {
                    applyLevel: accessLevel
                });

                await this.$store.dispatch('alert/PUSH_ALERT', {
                    icon: "",
                    level: 0,
                    message: `権限を更新しました`,
                });
            },



            submitEnrollUser() {
                this.enrollUser({
                    username: this.registerUserForm.username,
                    accessLevel: this.registerUserForm.accessLevel,
                    firstName: this.registerUserForm.firstName,
                    lastName: this.registerUserForm.lastName,
                    schoolYears: this.registerUserForm.schoolYears,
                    password: this.registerUserForm.password
                });
                this.registerUserForm.modal = false;
                this.fetchData()
            },

            openEditBasicInfo(user) {
                this.focusUser(user);
                this.editBasicInfoForm = {
                    modal: true,
                    username: this.focusingUser.username,
                    firstName: this.focusingUser.firstName,
                    lastName: this.focusingUser.lastName,
                    schoolYears: this.focusingUser.schoolYears,
                }
            },

            submitEditBasicInfo() {
                this.updateUser(this.focusingUser.id, {
                    username: this.editBasicInfoForm.username,
                    firstName: this.editBasicInfoForm.firstName,
                    lastName: this.editBasicInfoForm.lastName,
                    schoolYears: this.editBasicInfoForm.schoolYears,
                });

                this.editBasicInfoForm.modal = false;
                this.fetchData(); //Data fetching..
            },

            openResetPassword(user) {
                this.focusUser(user);
                this.resetPasswordForm = {
                    modal: true,
                    password: null,
                    password_confirm: null,
                }
            },

            submitResetPassword() {
                this.resetPasswordUser(this.focusingUser.id, {
                    password: this.resetPasswordForm.password,
                });
                this.resetPasswordForm.modal = false;
            },

            openSetPermission(user) {
                this.focusUser(user);
                this.setPermissionForm = {
                    modal: true,
                    options: Object.assign([], parmissions),
                    accessLevel: this.focusingUser.accessLevel,
                }
            },

            submitSetPermission() {
                this.setPermissionUser(this.focusingUser.id, {
                    accessLevel: this.setPermissionForm.accessLevel,
                });
                this.setPermissionForm.modal = false;
                this.fetchData(); //Data fetching..
            },

            focusUser(user) {
                this.focusingUser = Object.assign({}, user); //copy
            },
        },

        beforeMount() {
            this.fetchData()
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