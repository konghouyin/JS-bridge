<template>
    <div class="wrap">
        <img src="@/assets/cardLogo.png" alt="芯片图标" class="logo">
        <div class="message">以下将演示H5-Native接口能力</div>
        <div class="message">具体属性参数见</div>
        <a class="link" href="">JS-Bridge开发文档</a>
        <div class="list" v-if="list.length!=0">
            <router-link :to="'/show?id='+each.id" tag='div' class="each" v-for="each in list" v-bind:key="each.id">
                <div class="tittle">{{each.name}}</div>
                <img class="icon" :src="each.icon" alt="">
            </router-link>
        </div>
        <div class="list">
            <a href="http://www.konghouy.cn/H5-app/wangyi.html">
                <div class="each">
                    <div class="tittle" style="color: #333333;">网易云音乐</div>
                    <img class="icon" :src="musicImg" alt="">
                </div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'index',
        data() {
            return {
                list: [],
                musicImg: require('@/assets/music_logo.svg')
            }
        },
        methods: {
            getList() {
                let data = require('@/assets/interface.js')
                this.list = data.default.list
            }
        },
        mounted() {
            this.getList()
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .wrap {
        margin-top: 30px;
    }

    .logo {
        width: 60px;
    }

    .message {
        margin: 5px;
        font-size: 14px;
    }

    .list {
        margin-top: 40px;
    }

    .tittle {
        font-size: 14px
    }

    .each {
        text-align: left;
        background-color: #fff;
        padding: 14px 20px;
        margin: 8px;
        position: relative;
    }

    .icon {
        position: absolute;
        right: 18px;
        top: 11px;
        width: 26px;
    }
</style>
