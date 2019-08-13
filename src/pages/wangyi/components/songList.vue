<template>
    <div>
        <div v-if="out.length!=0">
            <div class="bg-blur" :style="{backgroundImage:'url('+title.pic+')'}" ref="bg"></div> <!-- 假的遮罩 -->

            <div class="content content-front">
                <!-- 真正的内容 -->
                <div class="nav">
                    <img src="../assets/箭头-左.svg" @click="$router.go(-1)" />
                    <span v-if="upSlide==true">
                        {{topTitle[type]}}
                    </span>
                    <marquee v-else> <span direction=left scrollamount=.1 scrolldelay=500>{{title.name}}</span>
                    </marquee>

                    <img src="../assets/搜索-白.svg" />
                </div>
                <div class="top">
                    <div class="titlePic" :style="{backgroundImage:'url('+title.pic+')'}">
                        <span>{{title.num}}</span>
                        <img src="../assets/播放.svg" v-if="type=='playList'" />
                    </div>

                    <div class="title">
                        <p v-if="type=='playList'">{{title.name}}</p>
                        <div v-if="type=='album'">
                            <p class="top-title">{{title.name}}</p>
                            <p id="top-second">歌手: {{out[0].singer}}</p>
                        </div>
                        <img src="../assets/下载.svg" />
                        <img src="../assets/多选.svg" /> <br />
                        <span>下载</span><span>多选</span>
                    </div>
                </div>
            </div>
            <songTable :lazyloaded="lazyloaded" :out="out" :songListNum="title.all" v-on:getPage="handlePage"></songTable>
            <!-- 子组件 -->
        </div>

        <div v-else style="text-align: center;">...loading</div> <!-- 未加载出来时 的动画效果 -->

        <!-- 父元素向子元素传值，控制显隐 子元素传值通知父元素 -->

        <playMin></playMin>
    </div>


</template>

<script>
    import playMin from "./play_min"
    import songTable from "./songTable"
    import Axios from '../axios'
    import {
        Base64
    } from 'js-base64';
    export default {
        data() {
            return {
                upSlide: true, //是否出现歌曲循环播放效果
                heighttop: "",
                out: [], //加载的数据
                title: "",
                allSend: "",
                page: { //请求的初始 结束页
                    start: 1,
                    end: 10,
                },
                lazyloaded: true,
                showSongList: false,
                showType: {
                    album: "getAlbumListMain",
                    swiper: "",
                    playList: "getPlayListMain"
                },
                topTitle: {
                    album: "专辑",
                    swiper: "",
                    playList: "歌单"
                },
                type: ""
            }
        },
        mounted() {


            this.type = this.$route.query.type
            this.send(this.$route.query.id, this.$route.query.type) //发送请求
            window.addEventListener('scroll', this.scrollhandle); //走马灯

        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.scrollhandle);
        },

        methods: {
            scrollhandle() { //走马灯效果的监听
                if (window.scrollY > 60) { //文档当前垂直滚动的像素
                    this.upSlide = false
                } else {
                    this.upSlide = true
                }
            },
            handlePage(data) { //懒加载监听page的改变
                this.page = Object.assign({}, data); //重构对象
            },
            send(str, strType) { //发送数据请求
                if (this.page.end >= this.title.all) { //请求的最大页 超出
                    this.page.end = this.title.all
                    this.lazyloaded = false; //阻止了懒加载滑动事件的监听
                }

                var api = "http://132.232.169.227:1531/path/" + this.showType[strType] + "?link=" + str + "&start=" +
                    this.page.start +
                    "&end=" + this.page.end
                console.log(api)
                Axios.send(api, 'get').then(res => {
                    // console.log(res);
                    res.list.forEach((data) => {
                        this.out.push(data)
                    })
                    this.title = res.title;
                }).catch(error => {
                    console.log('Error', error.message);
                })
            },
        },
        computed: {

        },
        props: {

        },
        components: {
            songTable,
            playMin
        },
        watch: {
            page: {
                handler: function() {
                    this.send(this.$route.query.id, this.$route.query.type);
                }
            }
        }
    }
</script>

<style scoped>
    @import "../css/songList.css";
</style>
