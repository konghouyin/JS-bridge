<template>
    <div class="wrap">
        <div class="buttom" @click="showModal1()">无标题模态弹窗</div>
        <div class="buttom" @click="showModal2()">长文本模态弹窗</div>
        <div class="buttom" @click="showModal3()">单按键模态弹窗</div>
        <div class="buttom" @click="showModal4()">自定义模态弹窗</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                err: false,
                errMessage: '',
                show: false,
                msg: ''
            }
        },
        methods: {
            showModal1() {
                HN.showModal({
                    content: '这个弹窗没有标题',
                    success: (res, style) => {
                        console.log(res)
                    },
                    fail: (res, style) => {
                        console.log(res)
                    },
                    complete: (res, style) => {
                        console.log('complete')
                    }
                })
            },
            showModal2() {
                HN.showModal({
                    title: '长文本模态弹窗',
                    content: '这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长这个文本很长',
                    success: (res, style) => {
                        console.log(res)
                    },
                    fail: (res, style) => {
                        console.log(res)
                    },
                    complete: (res, style) => {
                        console.log('complete')
                    }
                })
            },
            showModal3() {
                HN.showModal({
                    title: '单按键模态弹窗',
                    content: '',
                    showCancel: false,
                    success: (res, style) => {
                        console.log(res)
                    },
                    fail: (res, style) => {
                        console.log(res)
                    },
                    complete: (res, style) => {
                        console.log('complete')
                    }
                })
            },
            showModal4() {
                HN.showModal({
                    title: '自定义模态弹窗',
                    content: '可以根据开发需要设置数据',
                    cancelText: '退下',
                    cancelColor: '#f40',
                    confirmText: '知道了',
                    confirmColor: '#07c160',
                    success: (res, style) => {
                        console.log(res)
                    },
                    fail: (res, style) => {
                        console.log(res)
                    },
                    complete: (res, style) => {
                        console.log('complete')
                    }
                })
            }

        }
    }
</script>

<style>
    .buttom {
        margin-top: 10px;
        font-size: 14px;
        padding: 12px;
        display: block;
        border-radius: 4px;
        border: 1px solid #aaa;
    }
</style>
