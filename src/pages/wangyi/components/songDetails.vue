<template>
    <div v-if="display">
        <div class="block" @click="disappear($event)">
            <!-- 最外面的遮罩 -->
        </div>
        <transition name="slideDownward">
            <div class="middle">
                <div class="nav">
                    <img v-if="pic==''" src="../assets/music_logo.svg"/>
                    <img v-else :src="pic" />
                    <div>
                        <span>歌曲： ( {{song.name}} )</span>
                        <p>{{song.singer}}</p>
                    </div>
                </div>
               <!-- <div v-if="song=='{}'" style="text-align: center;height: 50.5vh;background-color: whitesmoke;">
                    亲。。暂无数据
                </div> -->
                <div class="content">
                    <div @click="playNextSong()">
                        <img src="../assets/nextSong.svg"/>
                        <p>下一首播放</p>
                    </div>
                    
                     <div>
                        <img src="../assets/collection.svg"/>
                        <p>收藏到歌单</p>
                    </div>
                    
                     <div>
                        <img src="../assets/download.svg"/>
                        <p>下载</p>
                    </div>
                    <div>
                        <img src="../assets/singer.svg"/>
                        <p>歌手: {{song.name}}</p>
                    </div>
                    <div>
                        <img src="../assets/album.svg"/>
                        <p>专辑: {{song.album}}</p>
                    </div>
                </div>
            </div>
        </transition>
    </div>

</template>

<script>
        import Axios from '../axios'
    export default {
        data() {
            return {
                playList: [],
                display: this.displayed,
                pic:""
                // pic:require("../assets/loopList.svg")
            }
        },
        mounted() {
            console.log(this.getSongPic)
            // console.log(this.song)
            this.playList = this.$store.state.playList

        },
        computed: {
            getSongPic(){  //查询歌曲的图片
                var api = "http://132.232.169.227:1531/path//getSongPic?link=" + this.song.link
                console.log(api)
                Axios.send(api, 'get').then(res => {
                    // console.log(res);
                  // return({pic:res.pic});
                  // return res;
                  
                  console.log(res.pic);
                  this.pic=res.pic
                }).catch(error => {
                    console.log('Error', error.message);
                })
            }
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
//             deleteSong(e) { //在列表中删除歌曲
//                 event = e.currentTarget;
//                 let num = event.getAttribute("value"); //歌曲的序号 从1开始
//                 console.log(num, parseInt(this.$store.state.playStyle.num)) //
// 
//                 this.playList.splice(num - 1, 1);
// 
//                 if (this.$store.state.playList.length == 0) { //当前列表没有歌曲播放
//                     this.$store.state.playStyle.num = 0;
//                 } else if (this.$store.state.playList.length + 1 == num && num == parseInt(this.$store.state.playStyle.num)) { //删除最后一个元素 并且最后一个元素在播放
//                     this.$store.state.playStyle.num = 1;
//                 } else if (num > parseInt(this.$store.state.playStyle.num) || parseInt(this.$store.state.playStyle.num) ==
//                     0) { //删除了正在播放的歌曲 或者当前状态没有歌曲播放
//                 } else if (num < parseInt(this.$store.state.playStyle.num)) { //删除正在播放歌曲后面的歌曲
//                     this.$store.state.playStyle.num--;
//                 }
// 
//             },
//             play(e) { //在播放列表中改变播放曲目
//                 event = e.currentTarget;
//                 let num = event.getAttribute("value"); //歌曲的序号 从0开始
// 
//                 this.$store.state.playStyle.num = (Math.random() + parseInt(num));
//             },
            playNextSong(){   //下一首播放
                // event = e.currentTarget;
                // let value = event.getAttribute("value");
                // this.clickElement = value;
                
                var array = this.$store.state.playList
                let flag = -1;
                for (let i = 0; i < array.length; i++) {
                    if (array[i].link == this.song.link) {
                        flag = i;
                        break;
                    }
                }
                 // getSongPic()
                 let nextSong={
                      pic: "",
                      name: this.song.name,
                      album: this.song.album,
                      singer: this.song.singer,
                      link: this.song.link,
                 }
                 
                 // console.log("jhjhj")
                if(this.$store.state.playList.length==0){  //当前歌单内没有歌曲 加入下一首直接播放
                //console.log("jhjjkhjk")
                    this.$store.state.playList.splice(parseInt(this.$store.state.playStyle.num), 0, nextSong);
                    this.$store.state.playStyle.num=1;
                    return;
                }
                // console.log("和第几个标签相同", flag);
                // console.log(parseInt(this.$store.state.playStyle.num))
                else if (flag != -1) { //之前已经存在
                    // console.log(parseInt(this.$store.state.playStyle.num), flag)
                    if (parseInt(this.$store.state.playStyle.num) == flag + 1) {
                        return;
                    }
                    if (parseInt(this.$store.state.playStyle.num) > flag + 1) {
                        this.$store.state.playStyle.num--;
                    }
                    array.splice(flag, 1);
                }
                console.log(this.$store.state.playList.length);
                // let song = {
                //     name: this.song.name,
                //     singer: this.song.singer,
                //     album: this.song.album,
                //     link: this.song.link
                // }
                this.$store.commit('nextPlaySong', nextSong);
            },
            
        },
        props: {
            displayed: { //控制子组件的显隐
                type: Boolean,
                default: true
            },
            song:{
                type: Object,
                default: ""
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
        height: 5.625rem;
        background-color: whitesmoke;
        border-top: #AAAAAA solid 1px;
        border-bottom: #AAAAAA solid .1px;
        border-top-right-radius: 1.625rem;
        border-top-left-radius: 1.625rem;
        align-items: center;
        
    }
    .nav p{
        color: #AAAAAA;
        font-size: 0.875rem;
        margin-top: 0.5rem;
    }
    .nav img {
        width: 3.125rem;
        /* padding: 0.625rem; */
        padding: 1.25rem 0.9375rem;
    }
    .nav span{
        width: 70vw;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .empty {
        position: absolute;
        right: 0;
    }
    .content{
        width: 100vw;
        height: 50vh;
        background-color: whitesmoke;
    }
    .content div{
        
        display: flex;
        align-items: center; 
       /* background-color: whitesmoke; */
    }
    .content img{
        width: 1.25rem;
        padding: 1.0625rem;
    }
    .content p{
        padding: 0.625rem;
        width: auto;
        width: 75vw;
        border-bottom: gainsboro solid .1px;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
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
