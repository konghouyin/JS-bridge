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

            <div v-else class="item" v-for="(item,index) in getData" :key="item.num-1">
                <div class="left" @click="addList($event)" :value="item.num-1">
                    <img src="../assets/播放.svg" v-if="MonitoringData==item.link">
                    <div class="roll" v-else>{{item.num}}</div>
                    <div class="middle">
                        <span>{{item.name}}</span>
                        <span>{{item.singer}}</span>
                    </div>
                </div>
                <img src="../assets/更多-灰.svg" class="more" @click="songDetail($event)" :value="item.num-1">  <!-- 点击之后显示纤细歌单 -->

            </div>

        </div>

       <!-- 请求详细的歌单信息 -->
        <songDetails v-if="showSongDetails"  :song="song" :displayed="showSongDetails" v-on:displayChange="changeDetail($event)"></songDetails>
        <!-- <songDetails></songDetails> -->
    </div>
</template>

<script>
    import songDetails from "./songDetails"
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
                showSongDetails:false,  //点击显示歌曲的详细信息
                song:{}   //父向子传值 一个歌曲相信的信息
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
        components:{
            songDetails
        },
        methods: {
            lazyLoad(e) { //懒加载
                event = e.currentTarget
                var scrollTop = event.scrollTop

                if (event.scrollHeight == event.clientHeight + scrollTop) {
                    this.page.start += 10
                    this.page.end += 10
                    this.$emit('getPage', this.page)
                }
            },
            scrollhandle() { //监听屏幕滚动效果
                if (window.scrollY < 13.7 * 16) {
                    this.style.overflow = 'hidden'
                    this.style.overflowY = ''

                } else if (window.scrollY > 13.7 * 16) {
                    this.style.overflow = ''
                    this.style.overflowY = 'auto'
                }
            },
            getScrollHeight() { //获取记算滚动区的高度
                var h = document.documentElement.clientHeight || document.body.clientHeight;
                this.divHeight = h - 3.045 * 16
            },

            addList(e) { //点击歌曲播放添加到歌单列表
                event = e.currentTarget
                let value = event.getAttribute('value')
                this.clickElement = value

                var array = this.$store.state.playList
                let flag = -1
                for (let i = 0; i < array.length; i++) {
                    if (array[i].link == this.out[value].link) {
                        flag = i
                        break
                    }
                }
                // console.log("和第几个标签相同", flag);
                // console.log(parseInt(this.$store.state.playStyle.num))
                if (flag != -1) { //之前已经存在
                    // console.log(parseInt(this.$store.state.playStyle.num), flag)
                    if (parseInt(this.$store.state.playStyle.num) == flag + 1) {
                        return;
                    }
                    if (parseInt(this.$store.state.playStyle.num) > flag + 1) {
                        this.$store.state.playStyle.num--;
                    }
                    array.splice(flag, 1)
                }
                this.$store.state.playStyle.playStatus = true
                let song = {
                    name: this.out[value].name,
                    singer: this.out[value].singer,
                    album: this.out[value].album,
                    link: this.out[value].link
                }

                this.$store.commit('addPlayList', song);


                // let obj = this.$store.state.playStyle;
                // obj.num = 1+Math.random()
                // this.$store.commit('setData', {playStyle:obj});

            },changeDetail(e){
                // console.log(e)
                this.showSongDetails=false
            },songDetail(e){   //请求歌曲的详细信息
                 event = e.currentTarget;
                let num = event.getAttribute("value"); //歌曲的序号 从0开始
                // console.log(num)
                // console.log(this.out[num]);

                this.song={
                     pic: "",
                     name: this.out[num].name,
                     album: this.out[num].album,
                     singer: this.out[num].singer,
                     link: this.out[num].link,
                }

                this.showSongDetails=true
            }
        },
        computed: {
            getData() {
                return (this.out)
            },
            MonitoringData() { //监听vuex中数据的改变
                //this.clickElement = this.$store.state.playStyle.num;
                return this.$store.state.playNow.link;
            }

        },
        mounted() {
            window.addEventListener('scroll', this.scrollhandle);
            this.getScrollHeight()

        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.scrollhandle);
        },
        watch: {
            // MonitoringData() { //监听vuex中数据的改变
            //     let i = 0;
            //     for (; i < this.out.length; i++) {
            //         // console.log(this.out[i].link,this.$store.state.playList[parseInt(this.$store.state.playStyle.num)-1].link)
            //         if (this.out[i].link == this.$store.state.playList[parseInt(this.$store.state.playStyle.num) - 1].link) {
            //             this.clickElement = i;
            //         }
            //     }
            //     // if (i == this.out.length) {   ????????
            //     //     this.clickElement = NaN;
            //     // }
            // }
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
    .left img{
        padding: 0 0.625rem;
    }
    .middle {
        width: 17rem;
        display: inline-block;

    }

    .left {
        width: 80vw;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .middle span:nth-of-type(2) {
        color: #AAAAAA
    }
</style>
