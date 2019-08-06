<template>
    <div class="all">
        <div class="nav">
            <ul>
                <li name="mine" v-bind:class="click=='mine'?'active':''" value="1" @click="switchVue($event)">我的</li>
                <li name="find" v-bind:class="click=='find'?'active':''" value="2" @click="switchVue($event)">发现</li>
                <li name="recommendSong" v-bind:class="click=='recommendSong'?'active':''" value="3" @click="switchVue($event)">推荐</li>
                <li name="rankingList" v-bind:class="click=='rankingList'?'active':''" value="4" @click="switchVue($event)">热度</li>
                <li><img src="../assets/搜索-灰.svg" /></li>
            </ul>
        </div>
        <transition v-bind:name="transName">
            <router-view></router-view>
        </transition>


    </div>
</template>

<script>
    import Axios from 'axios'
    import songSheet from "./songSheet"
    export default {
        data() {
            return {
                click: "find", //当前学则路由的名字
                value: "2", //当前的选取路由的id值
                transName: "slide-left", //当前动画的名称
                allData: {},
            }
        },

        methods: {
            switchVue(event) {

                //console.log(event.currentTarget.getAttribute("value") ,this.value)
                if (event.currentTarget.getAttribute("value") > this.value) {
                    this.transName = "slide-left" //左转
                } else {
                    this.transName = "slide-right" //右转
                }
                this.value = event.currentTarget.getAttribute("value");

                this.click = (event.currentTarget.getAttribute("name"));



                console.log(event.target.getAttribute("value"), this.value)
                if (event.target.getAttribute("value") > this.value) {
                    this.transName = "slide-left" //左转
                } else {
                    this.transName = "slide-right" //右转
                }
                this.value = event.target.getAttribute("value");

                this.click = (event.target.getAttribute("name"));


                this.$router.push({
                    path: this.click
                })
            }
        },
        computed: {

        },
        mounted() {
            var api = "http://localhost:1531/path/getMainMessage"
            Axios.get(api).then(res => {
                console.log(res);
                this.allData = res.data;
                this.$store.commit('setData', {'mainMessage':res.data}) //执行该方法
            }).catch(error => {
                console.log('Error', error.message);
            })
        },
        components: {
            songSheet
        }
    }
</script>

<style scoped>
    .nav {
        margin: 4px 10px;
    }

    .nav ul {
        display: flex;
        color: #AAAAAA;
        justify-content: center;
        height: 40px;
    }

    .nav li {
        display: inline-block;
        margin: auto 10px;

    }

    .nav img {
        margin-left: 20px;
        width: 20px;
    }

    .active {
        font-size: 18px;
        font-weight: 700;
        color: black;
    }

    .slide-right-enter {
        transform: translateX(-400px);
        position: absolute;
        opacity: 0;
    }

    .slide-right-enter-active {

        transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-left-enter-active {
        transition: all .5s ease;
    }

    .slide-right-leave-to {
        transform: translateX(400px);
        position: absolute;
        opacity: 0;
    }

    .slide-left-leave-active {
        transition: all .5s ease;
    }

    .slide-right-leave-active {

        transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-left-leave-to {
        transform: translateX(-400px);
        position: absolute;
        opacity: 0;
    }

    .slide-left-enter {
        transform: translateX(400px);
        position: absolute;
        opacity: 0;
    }
</style>
