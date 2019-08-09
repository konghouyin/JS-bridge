<template>
    <div class="wrap-btn">
        <div class="item">
            <div class="pic" :style="'backgroundImage:url('+playPic+')'"></div>
            <marquee class="name message" :text="playName"></marquee>
            <marquee class="album message" :text="playSinger"></marquee>
        </div>
        <div class="list"></div>
        <div class="btn" @click="playerCtrl" :style="'backgroundImage:url('+playerCtrlBtn+')'"></div>
    </div>
</template>

<script>
    import marquee from './marquee'
    export default {
        data() {
            return {

            }
        },
        computed: {
            playNow() {
                return this.$store.state.playNow;
            },
            playerCtrlBtn() {
                if (this.$store.state.playStyle.playStatus) {
                    return require('../assets/pause_btn_min.svg')
                } else {
                    return require('../assets/play_btn_min.svg')
                }
            },
            playPic() {
                return this.$store.state.playNow.pic != "" ? this.$store.state.playNow.pic : require(
                    '../assets/music_logo.svg')
            },
            playName() {
                return this.$store.state.playNow.name != "" ? this.$store.state.playNow.name : 'H5-Native播放器'
            },
            playSinger() {
                return this.$store.state.playNow.singer != "" ? this.$store.state.playNow.singer : '享受音乐，感悟生活'
            }
        },
        methods: {
            playerCtrl() {
                let obj = this.$store.state.playStyle;
                obj.playStatus = !obj.playStatus
                this.$store.commit('setData', {
                    'playStyle': obj
                })
            }
        },
        components: {
            marquee
        }
    }
</script>

<style scoped>
    .wrap-btn {
        padding: 0.5rem;
        box-sizing: border-box;
        width: 100vw;
        position: fixed;
        bottom: 0;
        background-color: #fff;
    }

    .pic {
        margin-right: 0.7rem;
        width: 10vw;
        height: 10vw;
        background-size: 100%;
        float: left;
        border-radius: 5rem;
    }

    .message {
        float: left;
        width: 50vw;
        overflow: hidden;
    }

    .btn,
    .list {
        float: right;
        width: 10vw;
        height: 10vw;
        background-size: 80%;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url(../assets/playList.svg);
    }

    .btn {
        background-size: 90%;

    }

    .name {
        color: #333;
        font-size: 1rem;
        margin-bottom: 0.4rem;
    }

    .album {
        color: #999;
        font-size: 0.8rem;
    }

    .item {
        overflow: hidden;
        display: inline-block;
        width: 74vw;
    }
</style>
