<template>
    <div class="wrap">
        <img src="@/assets/cardLogo.png" alt="芯片图标" class="logo">
        <div class="message">以下将演示H5-Native接口能力，具体属性参数见</div>
        <a href="">JS-Bridge开发文档</a>
        <div class="list">
            <router-link :to="'/main?id='+each.id" tag='div' class="each" v-for="each in list" v-bind:key="each.id">
                <div class="tittle">{{each.title}}</div>
                <img class="icon" :src="each.icon" alt="">
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
                list: [{
                    title: '获取系统信息',
                    icon: require('@/assets/phone.png'),
                    id: '1'
                }, {
                    title: '弹窗',
                    icon: require('@/assets/modal.png'),
                    id: '2'
                }, {
                    title: '重力感应',
                    icon: require('@/assets/weight.png'),
                    id: '2'
                }, {
                    title: '定位',
                    icon: require('@/assets/gps.png'),
                    id: '2'
                }, {
                    title: '蓝牙',
                    icon: require('@/assets/blueteeth.png'),
                    id: '2'
                }]
            }
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

    .each {
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
