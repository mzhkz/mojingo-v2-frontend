<template>
    <div v-if="result">
        <div class="page-header">
            <div class="user-icon">
                <i class="fas fa-user"></i>
            </div>
            <div class="user-information">
                <h2>
                   {{result.profile.username}}
                    <VerifiedBadge v-if="result.profile.accessLevel >= 2"/>
                </h2>
                <p>{{`${result.profile.firstName} ${result.profile.lastName}`}}</p>
                <p class="joined-date"><i class="fas fa-history"/> {{result.createdAgo}}に参加</p>
            </div>
        </div>
        <div class="page-contents">
            <div class="reviews">
                <h2>小テスト結果</h2>
                <router-link
                v-for="(data, index) in result.reviews"
                :key="data.review.id"
                :to="{name: 'review', params: {id: data.review.id, which: $route.params['id']}}">
                <ReviewCard
                        :name="data.review.name"
                        :description="`${data.createAgo}に作成`"
                        :correct="data.correctSize"
                        :all="data.incorrectSize + data.correctSize"
                        :finished="data.review.finished"
                />
                </router-link>
                <div class="read-more">
                    <sui-button @click="$router.push({ name: 'reviews', params: { which: $route.params['id']}})">小テスト一覧を見る</sui-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ReviewCard from "@/components/ReviewCard"
    import VerifiedBadge from "@/components/VerifiedBadge"

    export default {
        name: "Profile",
        components: {
            ReviewCard,
            VerifiedBadge,
        },
        data() {
            return {
                result: null
            }
        },
        methods: {
            handleClickReadMore() {
                this.$router.push({})
            },

            async fetchData() {
                const {data, message} = await this.$WORDLINKAPI.get(`/user/profile/${this.$route.params["id"]}`);
                this.result = data;
            }
        },

        beforeMount() {
            this.fetchData();
        }
    }
</script>

<style scoped lang="scss">

    .page-header {
        color: $default-link-color;
        min-height: 150px;

        display: flex;
        align-items: center;

        .user-icon {
            /*width: 90px;*/
            /*height: 90px;*/
            padding: 33px;
            border-radius: 50px;


            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 28px;
            background: $app-primary-focus-color;
        }

        .user-information {
            margin-left: 40px;

            h2 {
                margin: 0 0 4px 0;
                font-size: 20px;

                .verified-budge {
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                    text-align: center;
                    padding: 12px 12px 12px 13px;
                    margin-bottom: -4.2px;

                    .contents {
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        .fa-certificate {
                            position: absolute;
                            color: #4285f4;
                            font-size: 19px;
                        }

                        .fa-check {
                            position: absolute;
                            font-size: 9px;
                            color: #ffffff;
                        }
                    }
                }
            }

            p {
                margin: 0;

                &.joined-date {
                    margin: 12px 0 0 0;
                    font-size: .87rem;
                }
            }
        }

    }

    .page-contents {
        margin: 30px 0 0 0;
        .reviews {
           .read-more {
               width: 100%;
               padding: 20px 0;
               display: flex;
               justify-content: center;
           }
        }
    }

</style>