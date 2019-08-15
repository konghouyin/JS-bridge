<template>
    <div class="wrap"   @scroll="lazyloaded&&lazyLoad($event)">
        <div class="nav">
            <img src="../assets/leftArrow.svg" @click="$router.go(-1)" />
            <span>{{content.name}}</span>
        </div>
        <cardturn v-if="getMessageList.length!=0" :autoplay="false" :message="getTopThree" :type="content.type"></cardturn>
        <div v-if="getMessageList.length==0" class="losd">...loading</div>
        <div v-else class="content">
            <div class="songNumber">共( {{allnumber}}首 ）</div>
            <songsBlock :messageList="getLastMessage" :showNum="content.type=='playList'?true:false" :type="content.type"></songsBlock>
            <div v-if="load" class="load">....loading</div>
        </div>
    </div>
</template>

<script>
    import songsBlock from './songsBlock'
    import cardturn from './cardturn'
    import Axios from '../axios'
    export default {
        data() {
            return {
                content: {}, // 该页组件请求的内容
                page: { // 请求的初始 结束页
                    start: 1,
                    end: 30
                },
                sendType: { // 请求的接口类型
                    playList: '/getAllPlayList',
                    album: '/getAllAlbum'
                },
                apilock: 0, // 懒加载的标志位
                getMessageList: [],
                allnumber: 31, // 所有的数量
                lazyloaded: true, // 控制懒加载
                load: true
            }
        },
        methods: {
            send(strType) { // 发送数据请求
                // this.load=false;
                if (this.page.end >= this.allnumber) { // 请求的最大页 超出
                    this.page.end = this.allnumber
                    this.lazyloaded = true // 阻止了懒加载滑动事件的监听
                }
                // console.log(this.sendType.playList,this.content)
                var api = 'http://132.232.169.227:1531/path/' + this.sendType[this.content.type] + '?start=' +
                    this.page.start +
                    '&end=' + this.page.end
                // console.log(api)
                Axios.send(api, 'get').then(res => {
                    this.allnumber = res.all
                    res.list.forEach((data) => {
                        this.getMessageList.push(data)
                    })
                    this.load = false
                }).catch(error => {
                    console.log('Error', error.message)
                })
            },
            lazyLoad(e) { // 懒加载
                let event = e.currentTarget
                var scrollTop = event.scrollTop
                if (event.scrollHeight <= event.clientHeight + scrollTop + 200 && this.apilock < event.scrollHeight) {
                    this.apilock = event.scrollHeight
                    this.page.start += 30
                    this.page.end += 30
                    this.send(this.content.type)
                }
            }
        },
        computed: {
            getTopThree(){
                let back = []
                back.push(this.getMessageList[0])
                back.push(this.getMessageList[1])
                back.push(this.getMessageList[2])
                return back
            },
            getLastMessage(){
                let back = this.getMessageList.slice(3)
                return back
            }
        },
        mounted() {
            this.content = {
                type: this.$route.query.type,
                name: this.$route.query.name

            }
            this.send(this.content.type)
        },
        components: {
            songsBlock,
            cardturn
        }
    }
</script>

<style scoped>
    .wrap{
        height:100vh;
        overflow: scroll;
        background-color: #F8F8F8;

    }
    .nav {
        width: 100vw;
        position: fixed;
        top: 0;
        z-index: 3;
        background-color: whitesmoke;
        display: flex;
        padding: 0.625rem;
        align-items: center;
    }

    .nav span {
        margin-left: 1.25rem;
        font-weight: 700;
    }

    .nav img {
        width: 1.875rem;
    }

    .content {
        margin-top: 1.125rem;
        overflow: scroll;
    }

    .songNumber {
        color: silver;
        padding: 0.8125rem 0.9375rem;
        font-size: 0.875rem;
    }

    .load {
        text-align: center;
    }
</style>
