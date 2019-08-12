<template>
    <div v-if="display">
        <div class="block" @click="disappear($event)">
            <!-- 最外面的遮罩 -->
        </div>
        <transition name="slideDownward">
            <div class="middle">
                <div class="nav">
                    <!-- <img src="../assets/loopList.svg"/> -->
                    <div @click="changePlayType()">
                        <div v-if="playType==1">
                            <img src="../assets/loopList.svg" />
                            <span>循环列表 ( {{playList.length}} )</span>
                        </div>

                        <div v-else-if="playType==2">
                            <img src="../assets/randomPlay.svg" />
                            <span>随机播放 ( {{playList.length}} )</span>
                        </div>

                        <div v-else-if="playType==3">
                            <img src="../assets/singleLoop.svg" />
                            <span>单曲循环 ( {{playList.length}} )</span>
                        </div>

                        <div v-else-if="playType==4">
                            <img src="../assets/listLoop.svg" />
                            <span>列表单次播放 ( {{playList.length}} )</span>
                        </div>

                    </div>
                    <!-- <span v-if="playType==1">循环列表 ( {{playList.length}} )</span>
                    <span v-else-if="playType==2">随机播放 ( {{playList.length}} )</span>
                    <span v-else-if="playType==3">单曲循环 ( {{playList.length}} )</span>
                    <span v-else-if="playType==4">列表单次播放 ( {{playList.length}} )</span> -->

                    <img class="empty" src="../assets/trash.svg" @click=" allcut()" />
                </div>
                <div v-if="playList.length==0" style="text-align: center;height: 50.5vh;background-color: whitesmoke;">
                    亲。。暂无数据
                </div>
                <div v-else style="overflow: auto;height: 50.5vh;background-color: whitesmoke;">
                    <div class="item" v-for="(item,index) in playList" :key="index">
                        <div style="width: 87vw;" @click="play($event)" :value="index+1">
                            <img src="../assets/播放.svg" v-if="parseInt($store.state.playStyle.num)==(index+1)">
                            <!-- {{parseInt($store.state.playStyle.num)}} {{index+1}} -->
                            <span class="text">{{item.name}}-<span class="singer">{{item.singer}}</span></span>
                        </div>
                        <span class="close" :value="index+1" @click="deleteSong($event)">&times;</span>
                    </div>
                </div>
            </div>
        </transition>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                playList: [], //歌单内容
                display: this.displayed, //该页的显示
                playType: NaN //表单播放的类型
            }
        },
        mounted() {
            this.playList = this.$store.state.playList
            this.playType = this.$store.state.playStyle.playType

        },
        computed: {

        },
        methods: {
            disappear(e) {
                event = e.currentTarget;
                // console.log(event)
                let value = event.getAttribute("class");
                if (value == "block") {
                    this.$emit("displayChange", false)
                }
            },
            deleteSong(e) { //在列表中删除歌曲
                event = e.currentTarget;
                let num = event.getAttribute("value"); //歌曲的序号 从1开始
                console.log(num, parseInt(this.$store.state.playStyle.num)) //

                this.playList.splice(num - 1, 1);

                if (this.$store.state.playList.length == 0) { //当前列表没有歌曲播放
                    this.$store.state.playStyle.num = 0;
                } else if (this.$store.state.playList.length + 1 == num && num == parseInt(this.$store.state.playStyle.num)) { //删除最后一个元素 并且最后一个元素在播放
                    this.$store.state.playStyle.num = 1;
                } else if (num > parseInt(this.$store.state.playStyle.num) || parseInt(this.$store.state.playStyle.num) ==0) { //删除了正在播放的歌曲后面的歌曲 或者当前状态没有歌曲播放
                    
                } else if (num < parseInt(this.$store.state.playStyle.num)) { //删除正在播放歌曲前面的歌曲
                    this.$store.state.playStyle.num--;
                }else if(num == parseInt(this.$store.state.playStyle.num)){
                    this.$store.state.playStyle.num=parseInt(this.$store.state.playStyle.num)+ Math.random();
                }
                    console.log(this.$store.state.playStyle.num);
            },
            play(e) { //在播放列表中改变播放曲目
                event = e.currentTarget;
                let num = event.getAttribute("value"); //歌曲的序号 从0开始

                this.$store.state.playStyle.num = (Math.random() + parseInt(num));
            },
            changePlayType() { //改变列表播放的类型
                this.playType = this.playType + 1 == 5 ? 1 : this.playType + 1;
                this.$store.state.playStyle.playType = this.playType;
            },
            allcut() { //删除歌单里面的所有歌曲
                this.playList = [];
                this.$store.commit('setData', {
                    'playList': []
                });

                this.$store.state.playStyle.num = 0
            }
        },
        props: {
            displayed: { //控制子组件的显隐
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style scoped>
    body {
        /* overflow: hidden; */
    }

    .block {
        background-color: #000000;
        opacity: .7;
        position: fixed;
        z-index: 2;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
    }

    .middle {
        z-index: 3;
        width: 100vw;
        position: fixed;
        bottom: 0;
        /* background-color: whitesmoke; */
    }

    .nav {
        display: flex;
        background-color: whitesmoke;
        border-top: #AAAAAA solid 2px;
        border-bottom: #AAAAAA solid .5px;
        border-top-right-radius: 1.625rem;
        border-top-left-radius: 1.625rem;
        align-items: center;
    }

    .nav div {
        display: flex;
        align-items: center;
    }

    .nav img {
        width: 1.375rem;
        padding: 0.75rem;
    }

    .empty {
        position: absolute;
        right: 0;
    }

    .item {
        padding: 1rem 0.9375rem;
    }

    .item img {
        width: 1.25rem;
        display: inline-block;
        vertical-align: middle;
    }

    .text {
        width: 80vw;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .singer {
        font-size: 0.9375rem;
        color: #999999;
    }

    .close {
        color: #999999;
        font-size: 1.5rem;
        float: right;
        line-height: 0;
    }

    .slideDownward-enter-active {
        transition: all 4s ease;
        bottom: 0;
    }

    .slideDownward-leave-active {
        transition: all 4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        bottom: 0;
    }

    .slideDownward-enter,
    .slideDownward-leave-to {
        bottom: 1100px;
    }
</style>
