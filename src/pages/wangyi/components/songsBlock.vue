<!-- 歌曲块  传入一个数组 动态根据数组的长度渲染 -->


<template>
    <div class="main" @scroll="lazyLoad($event)">
        <div class="item" v-for="(each,index) in messageList" :key="index" @click="routerSongList(each.link)">
            <div class="pic" :style="'background-image: url('+ each.pic.split('?')[0]+'?param=140y140);'"></div>
            <div class="name">{{each.name}}</div>
            <div v-if="showNum" class="num">▷ {{each.num}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        components: {
            // songSheet
        },

        props: {
            messageList: {
                type: Array,
                default: new Array()
            },
            showNum: {
                type: Boolean,
                default: true
            },
            type:{
                type:String,
                default:'playList'
            }
        },
        methods: {
            routerSongList(target) {
                // console.log(target)
                this.$router.push({
                    path: '/songList',
                    query: {
                        id: target,
                        type:this.type,
                    }
                });
            }
        },
        mounted() {


        }
    }
</script>

<style scoped>
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
        background-size: 100%;
    }

    .name {
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        font-size: 0.8rem;
        /* 几行后显示省略号 */
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        width: 28vw;
        color: #666;
        margin: 0.4rem 0 1.2rem 0;
        line-height: 1.2rem;
    }

    .num {
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
        background-color: #68686896;
        color: #fff;
        padding: 0.2rem 0.4rem;
        border-radius: 0.3rem;
        font-size: 0.7rem;
    }
</style>
