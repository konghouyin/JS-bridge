<template>
    <div>

        <div class="bg-blur" :style="{backgroundImage:'url('+title.pic+')'}"></div> <!-- 假的遮罩 -->

        <div class="content content-front">
            <!-- 真正的内容 -->
            <div class="nav">
                <img src="../assets/箭头-左.svg" />
                <span v-if="upSlide==true">歌单</span>
                <marquee v-else> <span direction=left scrollamount=.1 scrolldelay=500>上去了</span> </marquee>
                <img src="../assets/搜索-白.svg" />
            </div>

            <div class="top">
                <div class="titlePic" :style="{backgroundImage:'url('+title.pic+')'}">
                    <span>{{title.num}}</span>
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


        <songTable :out="out"></songTable>
    </div>
  

</template>

<script>
    import songTable from "./songTable"
    import Axios from '../axios'
    import {
        Base64
    } from 'js-base64';
    export default {
        data() {
            return {
                upSlide: true,
                heighttop: "",
                out: "",
                title: "",
                allSend: ""
            }
        },
        components: {
            songTable
        },
        mounted() {
            this.send(this.$route.query.id) //发送请求

            window.onscroll = () => {
                // if(document.body.offsetHeight+)
                if (window.scrollY > 60) { //文档当前垂直滚动的像素
                    this.upSlide = false
                } else {
                    this.upSlide = true
                }
            }
        },
        methods: {
            send(str) {

                var api = "http://192.168.1.35:1531/path/getPlayListMain?link=" + str
                Axios.send(api, 'get').then(res => {
                    this.out = res.taste.out;
                    this.title = res.title;
                    console.log(res);
                }).catch(error => {
                    console.log('Error', error.message);
                })
            }
        }
    }
</script>

<style scoped>
    @import "../css/songList.css";
</style>
