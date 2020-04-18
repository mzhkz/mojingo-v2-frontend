<template>
    <div v-if="$store.state.application.reservedReview">
        <div class="logo">
        </div>
        <table class="question-print-table">
            <tbody>
            <tr>
                <th class="number-field">問.</th>
                <th class="question-field">問題</th>
                <th class="answer-field">回答</th>
            </tr>
            <tr v-for="(question, index) in $store.state.application.reservedReview.entries" :key="index">
                <td class="number-field">{{index+1}}</td>
                <td class="question-field">{{question.name}}</td>
                <td class="answer-field"></td>
            </tr>
            </tbody>
        </table>
        <section class="question-print-answer-link">
            <div>
                <p>
                    答え合わせはQRコードから行ってください。回答記録は一回限り有効です。<br>
                </p>
            </div>
            <img :src="qrCodeLink" class="question-print-qrcode">
        </section>
    </div>
</template>

<script>
    import LogoImage from "@/assets/images/MojingoV2.png";

    export default {
        name: "Print",
        data() {
            return {
                logoImage: LogoImage,
            }
        },
        computed: {
            qrCodeLink() {
                return `${this.$MOJINGO_V2_API.defaults.baseURL}/reviews/${this.$route.params["which"]}/${this.$route.params["id"]}/qrcode?appDomain=${process.env.API_BASE_URL}`
            }
        }
    }
</script>

<style scoped lang="scss">

    .question-print-logo {
        width: 110px;
        padding: 10px 0;
    }

    .question-print-table {
        font-family: 'Times New Roman', sans-serif;
        font-weight: bold;
        table-layout: fixed;
        border-collapse: collapse;
        width: 100%;
        page-break-inside: auto;
        tr {
            page-break-inside: avoid;
            page-break-after: always;
        }
        th, td {
            border:solid 1px $app-primary-content-color;
            padding: 5px;
        }
        th {
            font-weight: 100;
        }
        .question-print-table-space {
            border-bottom: 60px solid transparent;
        }
        .number-field {
            width: 60px;
        }
        .question-field {
            min-width: 30%;
        }
        .answer-field {
            width: 60%;
        }
    }

    .question-print-answer-link {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        page-break-inside:avoid;

        .question-print-qrcode {
            width: 100px;
            height: 100px;
            margin-top: 10px;
        }
    }

</style>