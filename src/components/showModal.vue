<template>
     <div class="buttom" @click="getSystemInfo()">模态弹窗</div>
</template>

<script>
     export default {
        data() {
            return {
                err: false,
                errMessage: "",
                show: false,
                msg: ""
            }
        },
        methods: {
            getSystemInfo() {
                HN.showModal({
                    success: (res, style) => {
                        console.log(res)
                    },
                    fail: (res, style) => {
                        console.log(res)
                    },
                    complete: (res, style) => {
                        console.log("complete")
                    }
                });
            }
        }
    }
</script>

<style>
</style>
