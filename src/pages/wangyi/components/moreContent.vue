<template>
    <div>
        <div class="nav">
            <img src="../assets/leftArrow.svg" @click="$router.go(-1)"/>
            <span>{{content.name}}</span>
        </div>
        <div v-if="getMessageList.length==0" class="losd">...loading</div>
        <div v-else class="content" @scroll="lazyloaded&&lazyLoad($event)">
            <div class="songNumber">共( {{allnumber}}首 ）</div>
            <songsBlock :messageList="getMessageList" :showNum="content.showNum" :type="content.type"></songsBlock>
            <div v-if="load" class="load">....loading</div>
        </div>
        <cardturn :autoplay="false"></cardturn>
    </div>
</template>

<script>
    import songsBlock from "./songsBlock"
    import cardturn from "./cardturn"
    import Axios from '../axios'
    export default {
        data() {
            return {
                content: {}, //该页组件请求的内容
                page: { //请求的初始 结束页
                    start: 1,
                    end: 30,
                },
                sendType: { //请求的接口类型
                    playList: "/getAllPlayList",
                    album: "/getAllAlbum"
                },
                apilock: 0,     //懒加载的标志位
                getMessageList: [],
                allnumber: 31,   //所有的数量
                lazyloaded:true,  //控制懒加载
                load:true
            }
        },
        computed: {

        },
        methods: {
            send(strType) { //发送数据请求
                // this.load=false;
                if (this.page.end >= this.allnumber) { //请求的最大页 超出
                    this.page.end = this.allnumber
                    this.lazyloaded = true; //阻止了懒加载滑动事件的监听
                }
                // console.log(this.sendType.playList,this.content)
                var api = "http://132.232.169.227:1531/path/" + this.sendType[this.content.type] + "?start=" +
                    this.page.start +
                    "&end=" + this.page.end
                // console.log(api)
                Axios.send(api, 'get').then(res => {

                    this.allnumber = res.all;
                    res.list.forEach((data) => {
                        data.pic+="?param=140y140par"
                        this.getMessageList.push(data)
                    })
                    this.load=false;
                }).catch(error => {
                    console.log('Error', error.message);
                })
            },
            lazyLoad(e) { //懒加载
                // console.log("n,mkn,")
                event = e.currentTarget
                var scrollTop = event.scrollTop
                // console.log(event.scrollHeight, event.clientHeight, scrollTop + 100, this.apilock)
                if (event.scrollHeight <= event.clientHeight + scrollTop + 100 && this.apilock < event.scrollHeight) {
                    this.apilock = event.scrollHeight
                    this.page.start += 30
                    this.page.end += 30
                    this.send(this.content.type);
                    // this.$emit('getPage', this.page)
                }
            },

        },
        mounted() {
            // console.log(this.$route.query.moreContent)

            this.content = this.$route.query.moreContent;

            this.send(this.content.type)


        },
        components: {
            songsBlock,
            cardturn
        }
    }
</script>

<style scoped>
    .nav {
        width: 100vw;
        position: fixed;
        top: 0;
        z-index: 3;
        background-color: whitesmoke;
        /*  background-color:pink; */
        /* margin: 0.625rem; */
        /* margin-bottom:3.125rem; */
        display: flex;
        padding: 0.625rem;
        align-items: center;
        /* margin-bottom: 3.125rem; */
    }

    .nav span {
        margin-left: 1.25rem;
        font-weight: 700;
    }

    .nav img {
        width: 1.875rem;
    }

    .content {
        margin-top: 3.125rem;
        overflow: scroll;
        height: calc(100vh - 3.125rem);
        /* height: 50vh; */
    }
    .songNumber{
        color: silver;
        padding: 0.8125rem 0.9375rem;
        font-size: 0.875rem;
    }
    .load{
        text-align: center;
    }
</style>
