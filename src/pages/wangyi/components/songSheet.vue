<!-- 首页的歌单 -->

<template>
    <div>
        <div class="title">
            <div class="left">{{titleLeft}}</div>
            <div class="right" @click="moreContentRouter()">{{titleRight}}</div>
        </div>
        <div class="show" v-if="getMessageList.length==0">loading...</div>
        <songsBlock v-bind:messageList="getMessageList" :showNum="showNum" :type="type"></songsBlock>
    </div>
</template>

<script>
    import songsBlock from './songsBlock'
    export default {
        data() {
            return {}
        },
        mounted() {

        },
        methods: {
            moreContentRouter() {
                this.$router.push({
                    path: '/moreContent',
                    query: {
                        type: this.type,
                        name: this.titleRight
                    }
                })
            },
            send(strType) { // 发送数据请求
                // if (this.page.end >= this.title.all) { //请求的最大页 超出
                //     this.page.end = this.title.all
                //     //this.lazyloaded = false; //阻止了懒加载滑动事件的监听
                // }
                // console.log(this.sendType.playList,this.content)
                var api = 'http://132.232.169.227:1531/path/' + this.sendType[this.content.type] + '?start=' +
                    this.page.start +
                    '&end=' + this.page.end
                // console.log(api)
                Axios.send(api, 'get').then(res => {
                    this.allnumber = res.all
                    this.getMessageList = res.list
                }).catch(error => {
                    console.log('Error', error.message)
                })
            }
        },
        computed: {
            getMessageList() {
                // console.log(this.$store.state.mainMessage[this.type])
                return this.$store.state.mainMessage[this.type]
            }
        },
        props: {
            titleLeft: {
                type: String,
                default: '推荐'
            },
            titleRight: {
                type: String,
                default: '更多'
            },
            showNum: {
                type: Boolean,
                default: true
            },
            type: {
                type: String,
                default: ''
            }
        },
        components: {
            songsBlock
        }
    }
</script>

<style scoped>
    .left {
        float: left;
        font-size: 1rem;
        font-weight: 600;
        margin: 0 1rem;
    }

    .right {
        float: right;
        font-size: 0.7rem;
        border: 1px solid #ccc;
        border-radius: 5rem;
        padding: 0.3rem 0.6rem;
        margin: 0 1rem;
    }

    .title {
        overflow: hidden;
        margin: 0.8rem;
    }

    .show {
        text-align: center;
        margin: 1rem;
    }

    .main {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
</style>
