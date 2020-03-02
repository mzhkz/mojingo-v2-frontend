<template>
    <div class="word-card">
        <span class="concept-line" :style="{background: borderColor}"/>
       <div class="word-basic-information">
           <div class="word-description-wrap">
               <h2>{{ name }}</h2>
               <p>{{ mean}}</p>
           </div>
           <div class="word-keyring-wrap">
               {{number}}
           </div>
       </div>
        <div v-if="category" class="word-provide-by">
            <p>> {{category}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WordCard",
        props: {
            name: {type: String},
            mean: {type: String},
            number: {type: Number},
            category: {type: String},
            borderColor: {type: String},
            clickHandle: {type: Function},
        }
    }
</script>

<style scoped lang="scss">

    .word-card {
        position: relative;
        background: $app-content-color;
        overflow: hidden;
        box-shadow: 0 0px 7px 1px #efefef;

        &:nth-child( n + 1 ) {
            margin-bottom: 8px;
        }

        .concept-line {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            height: 100%;
            width: 3px;
            background: $app-primary-focus-color;
        }
    }

    .word-provide-by {
        padding: 8px;
        border: 2px dotted #e2e2e2;
        background: $app-primary-color;
        color: #c3c3c3;

        p {
            font-size: 13px;
        }
    }

    .word-basic-information {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 82px;

        .word-description-wrap {
            width: 100%;
            padding: 0 40px 5px 23px;
            font-family: $default-font-family;

            h2 {
                font-weight: unset;
                font-size: 18px;
                margin-bottom: 5px;
                color: $default-link-color;
                font-family: unset;
            }

            p {
                font-size: 13px;
                color: #5f6368;
            }
        }

        .word-keyring-wrap {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            width: 35px;
            background: #fbfbfb;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color:  $default-link-color;
            font-size: 11px;
            font-weight: bold;
        }
    }
</style>