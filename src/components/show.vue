<template>
    <div>
        <div class="interface">{{title}}</div>
        <div class="back" @click="windowBack">返回</div>
            <div class="message"></div>
            <component v-bind:is="component"></component>
        </div>
</template>

<script>
    import components from '@/components/allDemoTemplate'

    export default {
        name: 'show',
        data() {
            return {
                component: '',
                title: ''
            }
        },
        methods: {
            getTitle() {
                let data = require('@/assets/interface.js')
                let id = this.$route.query.id
                this.title = data.default.list[id].title
                this.component = data.default.list[id].title
            },
            windowBack() {
                window.history.back()
            }
        },
        mounted() {
            this.getTitle()
        },
        components: {
            getSystemInfo: components.getSystemInfo,
            showModal: components.showModal,
            accelerometer: components.accelerometer
        }
    }
</script>

<style scoped>
    .interface {
        margin: 30px 0;
        display: inline-block;
        padding: 20px;
        border-bottom: 1px solid #aaa;
        color: #aaa;
        font-size: 18px;
    }

    .back {
        position: absolute;
        top: 12px;
        right: 30px;
    }
</style>
