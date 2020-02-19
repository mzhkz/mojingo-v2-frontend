<template>
    <div>
        <div class="page-header">
            <div class="user-icon">
                <i class="fas fa-user"></i>
            </div>
            <div class="user-information">
                <h2>
                   sato_rika
                    <span class="admin-budge">
                        <i class="fas fa-wrench"></i>
                    </span>
                </h2>
                <p>Rikako Satou</p>
                <p class="joined-date"><i class="fas fa-history"></i>  14日前に参加</p>
            </div>
        </div>
        <div class="page-contents">
            <div class="reviews">
                <h2>小テスト結果</h2>
                <ReviewCard
                        name="小テスト 300-400"
                        description="確認テスト @ 2020年 02月15日 "
                        :correct="100"
                        :all="120"
                />
                <div class="read-more">
                    <sui-button @click="$router.push({ name: 'reviews', params: { which: 'me'}})">小テスト一覧を見る</sui-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ReviewCard from "@/components/ReviewCard"

    export default {
        name: "Profile",
        components: {
            ReviewCard
        },
        methods: {
            handleClickReadMore() {
                this.$router.push({})
            }
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

                .admin-budge {
                    color: #796f6c;
                    font-size: 13px;
                    text-align: center;
                    padding: 10px;
                    border-radius: 50px;
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