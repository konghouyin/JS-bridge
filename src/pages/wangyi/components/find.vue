<template>
    <div>
        <swiper :indicatorDots="true" indicatorActiveColor="#f40" :autoplay="false" :interval="3000">
            <div class="swiper_item" @click="addList(each.url)" v-for="each in allData.swiper" :style="'background-image: url('+each.picUrl+');'"></div>
        </swiper>
        <hr>
        <songSheet titleLeft="推荐歌单" titleRight="歌单广场" type="playList"></songSheet>
        <hr>
        <songSheet titleLeft="专辑" titleRight="更多专辑" type="album" :showNum="false"></songSheet>
    </div>
</template>

<script>
    import Axios from '../axios'
    import songSheet from './songSheet'
    import swiper from './swiper.vue'
    export default {
        data() {
            return {
                allData: []
            }
        },
        components: {
            songSheet,
            swiper
        },
        mounted() {
            if (!this.$store.state.mainMessage.swiper.length) {
                var api = 'http://132.232.169.227:1531/path/getMainMessage'
                Axios.send(api, 'get').then(res => {
                    console.log(res)
                    this.allData = res
                    this.$store.commit('setData', {
                        'mainMessage': res
                    })
                }).catch(error => {
                    console.log('Error', error.message)
                })
            } else {
                this.allData = this.$store.state.mainMessage
            }
        },
        methods: {
            addList(link) {
                var array = this.$store.state.playList
                let flag = -1
                for (let i = 0; i < array.length; i++) {
                    if (array[i].link == link) {
                        flag = i
                        break
                    }
                }
                if (flag == -1) {
                    var api = 'http://132.232.169.227:1531/path/getSongMsg?link=' + link
                    Axios.send(api, 'get').then(res => {
                        console.log(res)
                        let song = {
                            name: res.msg.name,
                            singer: res.msg.singer,
                            album: res.msg.album,
                            link: link
                        }
                        this.$store.commit('addPlayList', song)
                        this.$store.state.playStyle.playStatus = true
                    }).catch(error => {
                        console.log('Error', error.message)
                    })

                    // 没有这首歌
                } else {
                    // 有这首歌，并且playList下标为flag
                    if (parseInt(this.$store.state.playStyle.num) == flag + 1) {
                        return
                    }
                    if (parseInt(this.$store.state.playStyle.num) > flag + 1) {
                        this.$store.state.playStyle.num--
                    }
                    array.splice(flag, 1)
                    this.$store.state.playStyle.playStatus = true
                }
            }
        }
    }
</script>

<!--
HN.webviewConnect({
                        num: 2,
                        msg: `jx("search",${songid},0)`,   //1页30   第一次  无参数
                        success: function(res, type) {
                            resolve(res, type)
                        },
                        fail: function(res, type) {
                            console.log(res, type)
                        }
                    })
 -->

<style scoped>
    .swiper_item {
        background-size: 100% 100% !important;
        box-sizing: border-box;
        width: 92vw !important;
        height: 40vw !important;
        margin: 0 4vw;
        border-radius: 0.5rem;
        background-clip: padding-box;
    }

    hr {
        background-color: #ccc;
        height: 1px;
        border: none;
        margin: 1rem 0;
    }
</style>
