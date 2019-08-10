<!-- //歌单 -->

<template>
    <div class="all" @scroll="lazyloaded&&lazyLoad($event)" :style="{height:divHeight+'px',overflow:style.overflow,overflowY:style.overflowY}">

        <div class="nav">
            <img src="../assets/播放.svg" />
            <span>播放全部 ( {{songListNum}} )</span>
            <!-- <img class="empty" src="../assets/trash.svg" /> -->
        </div>

        <div class="content">
            <div v-if="out.length==0" style="text-align: center;">
                . . .loading
            </div>

            <div v-else class="item" v-for="(item,index) in getData" @click="addList($event)" :value="item.num-1" :key="item.num-1">
                <img src="../assets/播放.svg" v-if="clickElement==(item.num-1)">
                <div class="roll" v-else>{{item.num}}</div>
                <div class="middle">
                    <p>{{item.name}}</p>
                    <p>{{item.singer}}</p>
                </div>
                <img src="../assets/更多-灰.svg" class="more">
            </div>
        </div>

    </div>
</template>

<script>
    // import songSheet from "./songSheet"
    export default {
        data() {
            return {
                divHeight: 0,
                style: {
                    overflowY: "",
                    overflow: "hidden"
                },
                page: {
                    start: 1,
                    end: 10,
                },
                clickElement: NaN, //播放键当前所点的 下标

            }
        },
        props: {
            out: {
                type: Array,
                default: [],
            },
            lazyloaded: {
                type: Boolean,
                default: true
            },
            songListNum: {
                type: Number,
                default: 0
            }
        },
        methods: {
            lazyLoad(e) { //懒加载
                event = e.currentTarget
                var scrollTop = event.scrollTop;

                if (event.scrollHeight == event.clientHeight + scrollTop) {
                    this.page.start += 10;
                    this.page.end += 10;
                    this.$emit('getPage', this.page);
                }
            },
            scrollhandle() { //监听屏幕滚动效果
                if (window.scrollY < 13.7 * 16) {
                    this.style.overflow = "hidden"
                    this.style.overflowY = ""

                } else if (window.scrollY > 13.7 * 16) {
                    this.style.overflow = ""
                    this.style.overflowY = "auto"
                }
            },
            getScrollHeight() { //获取记算滚动区的高度
                var h = document.documentElement.clientHeight || document.body.clientHeight;
                this.divHeight = h - 3.045 * 16;
            },

            addList(e) { //点击歌曲播放添加到歌单列表
                event = e.currentTarget;
                let value = event.getAttribute("value");
                this.clickElement = value;

                var array = this.$store.state.playList
                let flag = -1;
                for (let i = 0; i < array.length; i++) {
                    if (array[i].link == this.out[value].link) {
                        flag = i;
                        break;
                    }
                }
                console.log(parseInt(this.$store.state.playStyle.num))
                if (flag != -1) { //之前已经存在  
                    if (parseInt(this.$store.state.playStyle.num) == flag) {
                        return;
                    }
                    if (parseInt(this.$store.state.playStyle.num) > flag) {
                        this.$store.state.playStyle.num--;
                    }
                    array.splice(flag, 1);
                }
                //console.log(this.$store.state.playList.length);
                let song = {
                    name: this.out[value].name,
                    singer: this.out[value].singer,
                    album: this.out[value].album,
                    link: this.out[value].link
                }
                this.$store.commit('addPlayList', song);
            }
        },
        computed: {
            getData() {
                return (this.out)
            },
            MonitoringData() { //监听vuex中数据的改变
                //this.clickElement = this.$store.state.playStyle.num;
                return this.$store.state.playStyle.num;
            }

        },
        mounted() {
            window.addEventListener('scroll', this.scrollhandle);
            this.getScrollHeight()

        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.scrollhandle);
        },
        watch:{
            MonitoringData() { //监听vuex中数据的改变
                //this.clickElement = this.$store.state.playStyle.num;
                // console.log()
                // console.log(parseInt(this.$store.state.playStyle.num))
                // this.clickElement= parseInt(this.$store.state.playStyle.num)
                // for(let i=0;i<)
            }
        }

    }
</script>

<style scoped>
    div {
        width: 100%;

    }

    .all {
        height: 41.25rem;
        width: 100%;
        border-top: #AAAAAA solid 2px;
        border-top-right-radius: 1.625rem;
        border-top-left-radius: 1.625rem;
        overflow: hidden;
        background-color: #F8F8F8;
        /* z-index: 4; */
    }

    .all::-webkit-scrollbar {
        display: none;
    }

    .item img,
    .roll {
        width: 1.375rem;
        padding: 0.625rem;
    }

    .more {
        float: right;
        margin-right: 0.625rem;
    }

    .roll {
        display: inline-block;
        font-size: 1rem;
        color: #CCCCCC;
        /* margin-bottom: 0.625rem; */
        /* line-height: 1.25rem; */
    }

    .item {
        padding: 0.75rem 0.325rem;
        height: 2.525rem;
    }

    .nav {
        padding: 1.125rem;
       
    }

    .nav img {
        width: 1.25rem;
        margin-right: 0.625rem;

    }

    .middle {
        width: 17rem;
        display: inline-block;
        overflow: hidden;
        /* margin-left: 0.825rem; */

    }

    .middle p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-height: 1.20rem;
        -webkit-box-orient: vertical;
    }

    .middle p:nth-of-type(2) {
        color: #AAAAAA
    }
</style>
