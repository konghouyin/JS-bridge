<!-- 首页的歌单 -->

<template>
    <div>
        <div class="title">
            <div class="left">{{titleLeft}}</div>
            <div class="right">{{titleRight}}</div>
        </div>
        <div class="show" v-if="messageList.length==0">抱歉---暂无数据---请检查网络连接</div>
        <songsBlock v-bind:messageList="messageList"></songsBlock>
    </div>
</template>

<script>
    import songsBlock from "./songsBlock"
    export default {
        data() {
            return {
                title: {
                    
                },
                messageList: [{
                    pic: 'http://p3.music.126.net/C1C3F8NRscVG3cIbGGA-HQ==/109951164244445003.jpg?param=200y200',
                    name: '春天应该暗恋一个人，然后夏天和他私奔',
                    num: '544'
                }, {
                    pic: 'http://p3.music.126.net/C1C3F8NRscVG3cIbGGA-HQ==/109951164244445003.jpg?param=200y200',
                    name: '春天应该暗恋一个人，然后夏天和他私奔',
                    num: '544'
                }, {
                    pic: 'http://p3.music.126.net/C1C3F8NRscVG3cIbGGA-HQ==/109951164244445003.jpg?param=200y200',
                    name: '春天应该暗恋一个人，然后夏天和他私奔',
                    num: '544'
                }, {
                    pic: 'http://p3.music.126.net/C1C3F8NRscVG3cIbGGA-HQ==/109951164244445003.jpg?param=200y200',
                    name: '春天应该暗恋一个人，然后夏天和他私奔',
                    num: '544'
                }, {
                    pic: 'http://p3.music.126.net/C1C3F8NRscVG3cIbGGA-HQ==/109951164244445003.jpg?param=200y200',
                    name: '春天应该暗恋一个人，然后夏天和他私奔',
                    num: '544'
                }, {
                    pic: 'http://p3.music.126.net/C1C3F8NRscVG3cIbGGA-HQ==/109951164244445003.jpg?param=200y200',
                    name: '春天应该暗恋一个人，然后夏天和他私奔',
                    num: '544'
                }, {
                    pic: 'http://p3.music.126.net/C1C3F8NRscVG3cIbGGA-HQ==/109951164244445003.jpg?param=200y200',
                    name: '春天应该暗恋一个人，然后夏天和他私奔',
                    num: '544'
                }, {
                    pic: 'http://p3.music.126.net/C1C3F8NRscVG3cIbGGA-HQ==/109951164244445003.jpg?param=200y200',
                    name: '春天应该暗恋一个人，然后夏天和他私奔',
                    num: '544'
                },{
                    pic: 'http://p3.music.126.net/C1C3F8NRscVG3cIbGGA-HQ==/109951164244445003.jpg?param=200y200',
                    name: '春天应该暗恋一个人，然后夏天和他私奔',
                    num: '544'
                }] 
               
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
            }
            //messageList: {}
        },components:{
            songsBlock
        }
    }
</script>

<style scoped>
    .left {
        float: left;
        font-size: 1.3rem;
        font-weight: 600;
        margin: 0 1rem;
    }

    .right {
        float: right;
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

    .item {
        position: relative;
    }

    .pic {
        width: 28vw;
        height: 28vw;
        border-radius: 0.4rem;
    }

    .name {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;

        /* 几行后显示省略号 */
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        width: 28vw;
        color: #666;
        margin: 0.5rem 0;
    }

    .num {
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
        background-color: #c7c7c799;
        color: #fff;
        padding: 0.2rem 0.4rem;
        border-radius: 0.3rem;
        font-size: 0.7rem;
    }
</style>
