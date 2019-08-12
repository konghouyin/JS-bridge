<!-- 首页的歌单 -->

<template>
    <div>
        <div class="title">
            <div class="left">{{titleLeft}}</div>
            <div class="right">{{titleRight}}</div>
        </div>
        <div class="show" v-if="getMessageList.length==0">loading...</div>
        <songsBlock v-bind:messageList="getMessageList" :showNum="showNum"></songsBlock>
    </div>
</template>

<script>
    import songsBlock from "./songsBlock"
    export default {
        data() {
            return {
                // mainMessage: []
            }
        },
        mounted() {

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
