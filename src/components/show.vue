<template>
    <div>
        <div class="interface">{{title}}</div>
        <router-link :to="'/#'" tag='div' class="back">返回</router-link>
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
                component: "",
                title: ""
            }
        },
        methods: {
            getTitle() {
                let id = this.$route.query.id
                let data = require('@/assets/interface.js')
                this.title = data.default.list[id].title
                this.component = data.default.list[id].title
            }
        },
        mounted() {
            this.getTitle()
        },
        components: {
            getSystemInfo: components.getSystemInfo,
            showModal: components.showModal,
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
