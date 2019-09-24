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
		<div class="btn">开始下载</div><div class="btn">请求</div>
		<div class="wrap">
            <div class="btn" @click="startLoad()">开始下载</div>
            <div class="btn" @click="startAns()">请求</div>
			<transition v-bind:name="transName">
			    <keep-alive>
			        <router-view></router-view>
			    </keep-alive>
			</transition>
		</div>
        <playMin></playMin>
    </div>
</template>

<script>
    import songSheet from "./songSheet"
    import playMin from "./play_min"
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
                // console.log(event.target.getAttribute("value"), this.value)
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
            },
            startLoad(){
                HN.downLoad({
                    name:'Summer',
                    singer:'Joe Hisaishi',
                    url:'http://www.konghouy.cn/H5-app/Joe%20Hisaishi-Summer.mp3',
                    success: (res, style) => {
                        console.log(res)
                    },
                    complete: (res, style) => {
                        console.log('complete')
                    }
                })
            },
            startAns(){
                setInterval(()=>{
                    HN.downLoadNow({
                        success: (res, style) => {
                            console.log(res)
                        },
                        complete: (res, style) => {
                            console.log('complete')
                        }
                    })
                },1000)
            }
        },
        computed: {

        },
        mounted() {

        },
        components: {
            playMin
        }
    }
</script>

<style scoped>
    .btn{
        text-align: center;
        display: inline-block;
        width: 40%;
        border: 1px solid #ccc;
        padding: 5px;
        margin: 10px auto;
    }
    .nav {
        position: fixed;
        top:0;
        width:100vw;
        background-color: #f8f8f8;
        z-index: 2;
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
	.wrap{
		margin: 2.5rem 0;
	}
</style>
