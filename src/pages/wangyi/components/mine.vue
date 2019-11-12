<template>
    <div>
        <div class="top">
            <div v-bind:class="[ 'message', {'active': status }]" @click="changeStatus(true)">正在下载</div>
            <div v-bind:class="['message',  {'active': !status }]" @click="changeStatus(false)">已经下载</div>
        </div>
        <div class="list" v-if="musicList.length>0">
            <div class="item" v-for="item in musicList">
                <div class="icon" style=""></div>
                <div class="del"></div>
                <div class="message">
                    <div class="name">{{item.name}}</div>
                    <div class="length" v-if="item.type==1000 && item.allBits!=0">
                        <span class="now">{{changeSize(item.currentNewBits)}}</span><span>/</span><span class="all">{{changeSize(item.allBits)}}</span>
                        <div class="line">
                            <div class="on" v-bind:style="'width:'+item.currentNewBits/item.allBits*100+'%'"></div>
                            <div class="back"></div>
                        </div>
                    </div>
                    <div class="message" v-else-if="item.type==1000 && item.allBits==0">文件大小正在计算</div>
                    <div class="singer" v-else>{{item.singer+"-"+item.album}}</div>
                </div>
            </div>
        </div>
        <div class="no-music" v-else>暂无下载任务</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                status: true,
                timer:null,
                musicList: [{
                    album: 'sad',
                    allBits: 35678897,
                    currentNewBits: 22312322,
                    name: 'xxxname-nametest',
                    singer: 'ssss',
                    songID: 1232313,
                    speed: 250,
                    type: 1000
                }, {
                    album: 'sad',
                    allBits: 0,
                    currentNewBits: 22312322,
                    name: 'xxxname-nametest',
                    singer: 'ssss',
                    songID: 1232313,
                    speed: 250,
                    type: 1000
                }, {
                    album: 'sad',
                    allBits: 35678897,
                    currentNewBits: 22312322,
                    name: 'xxxname-nametest',
                    singer: 'ssss',
                    songID: 1232313,
                    speed: 250,
                    type: 1001
                }]
            }
        },
        methods: {
            changeStatus(type) {
                this.status = type
            },
            changeSize(num) {
                if (num > 1000000) {
                    return (num / 1000000).toFixed(1) + 'M'
                } else if (num > 1000 && num < 1000000) {
                    return (num / 1000).toFixed(1) + 'K'
                } else {
                    return num + 'B'
                }
            }
        },
        mounted() {
            clearInterval(this.timer)
            this.timer = setInterval(() => {
                HN.downLoadNow({
                    success: (res, style) => {
                        this.musicList = res
                    },
                    complete: (res, style) => {
                        console.log('complete')
                    }
                })
            }, 1000)
        },
        activated(){
            clearInterval(this.timer)
            this.timer = setInterval(() => {
                HN.downLoadNow({
                    success: (res, style) => {
                        this.musicList = res
                    },
                    complete: (res, style) => {
                        console.log('complete')
                    }
                })
            }, 1000)
        },
        deactivated(){
            console.log(456)
            clearInterval(this.timer)
        },
        destroyed(){
            console.log(132)
            clearInterval(this.timer)
        }
    }
</script>

<style scoped>
    .top {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .top .message {
        padding: 0.8rem;
    }

    .active {
        color: #f40;
        border-bottom: 2px solid #f40;
    }

    .no-music {
        color: #999;
        text-align: center;
        margin-top: 1rem;
        padding: 1rem;
    }

    .item {
        margin: 1rem 0;
    }

    .name {
        font-size: 1.1rem;
        margin: 0.5rem 0;
    }

    .line {
        width: 100%;
        height: 0.2rem;
        flex-grow: 1;
        margin: 0.5rem 0.6rem;
    }

    .line .back {
        width: 100%;
        height: 0.2rem;
        background-color: #969696;
    }

    .line .on {
        float: left;
        height: 0.2rem;
        background-color: #f40;
    }

    .icon {
        float: left;
        width: 10vw;
        height: 2.5rem;
        background-size: 60%;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url(../assets/playList.svg);
    }

    .del {
        float: right;
        width: 10vw;
        height: 2.5rem;
        background-size: 60%;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url(../assets/del.svg);
    }

    .item>.message {
        margin-left: 12vw;
        margin-right: 12vw;
        width: 76vw;
    }

    .message>.message,
    .length>span {
        font-size: 0.9rem;
    }

    .length {
        display: flex;

    }
</style>
