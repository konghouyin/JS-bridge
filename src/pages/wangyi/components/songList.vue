<template>
    <div style="background-color: skyblue; height: 62.5rem">



        <div class="bg-blur" :style="{backgroundImage:'url('+title.pic+')'}"></div>   <!-- 假的遮罩 -->

        <div class="content content-front"> <!-- 真正的内容 -->
            <div class="nav">
                <img src="../assets/箭头-左.svg" />
                <span v-if="upSlide==true">歌单</span>
                <marquee v-else> <span direction=left scrollamount=.1 scrolldelay=500>上去了</span> </marquee>
                <img src="../assets/搜索-白.svg" />
            </div>

            <div class="top">
                <div class="titlePic" :style="{backgroundImage:'url('+title.pic+')'}">
                    <span>{{title.playbackVolume}}</span>
                    <img src="../assets/播放.svg" />
                </div>

                <div class="title">
                    <p>{{title.name}}</p>
                    <img src="../assets/下载.svg" />
                    <img src="../assets/多选.svg" /> <br />
                    <span>下载</span><span>多选</span>
                </div>
            </div>
        </div>
            
        </div>
    </div>

</template>

<script>
    import songSheet from "./songSheet"
    import {
        Base64
    } from 'js-base64';
    export default {
        data() {
            return {
                upSlide: true,
                out: [{
                    num: 1,
                    name: "hah",
                    long: "3.2",
                    singer: "hah",
                    album: "xiaoming"
                }],
                title: {
                    pic: "https:ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2802409799,1306440791&fm=26&gp=0.jpg",
                    name: "ahahhaha撒大苏打萨达萨达",
                    playbackVolume: 1000
                }

            }
        },
        components: {
            songSheet
        },
        mounted() {

            window.onscroll = () => {
               
                if (window.scrollY > 60) { //文档当前垂直滚动的像素
                    this.upSlide = false
                } else {
                    this.upSlide = true
                }
            }


        },
        methods: {

        }
    }
</script>

<style scoped>
   @import "../css/songList.css";
</style>
