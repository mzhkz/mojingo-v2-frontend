<template>
     <span class="verified-budge" title="モデレーターバッジ">
            <span class="contents">
                <i class="fas fa-certificate"/>
                <i class="fas fa-check"/>
            </span>
        </span>
</template>

<script>
    export default {
        name: "VerifiedBadge"
    }
</script>

<style scoped lang="scss">
    .verified-budge {
        display: inline-block;
        width: 24px;
        height: 24px;
        text-align: center;
        padding: 12px 12px 12px 14px;
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
</style>