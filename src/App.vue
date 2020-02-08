<template>
    <div>
        <div id="main-display"></div>
        <div id="print-display">
        </div>
    </div>
</template>
<script>

</script>
<style lang="scss">
    #main-display {

    }

    #print-display {
        display: none;
        background-color: #fff;

        @media print {
            @page {
                margin: 8.0mm 2cm;
                size: A4 portrait; //縦向き
            }

            #MainDisplay {
                display: none;
            }

            #PrintDisplay {
                display: block;
            }
        }
    }
</style>