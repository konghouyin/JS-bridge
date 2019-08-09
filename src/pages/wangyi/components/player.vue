<template>
   <!-- <audio :src="getUrl.url" controls></audio> -->
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        mounted() {
            this.initStore() // 初始化vuex
            this.changeSong() // 切歌
            this.$el.src = this.$store.state.playNow.url;
        },
        methods: {
            changeSong() {
                if (this.$store.state.playList[this.$store.state.playStyle.num]) {
                    //确保歌曲列表中有此音乐

                    // 进行js-bridge 通信

                    HN.webviewConnect({
                        num: 2,
                        msg: `jx("songMain",1325897190,0)`,
                        success: function(res, type) {
                            console.log(res, type)
                        },
                        fail: function(res, type) {
                            console.log(res, type)
                        }
                    })
//
//                     Axios.send(api, 'get').then(res => {
//                         console.log(res)
//                     }).catch(error => {
//                         console.log('Error', error.message);
//                     })
//                     //网络请求


                }
            },
            initStore() {
                // if (localStorage.playList) {
                //     this.$store.commit('setData', {
                //         'playList': localStorage.playList
                //     });
                // } else {
                //     this.$store.commit('setData', {
                //         'playList': []
                //     });
                // }

                if (localStorage.playNow) {
                    this.$store.commit('setData', {
                        'playNow': localStorage.playNow
                    });
                } else {
                    this.$store.commit('setData', {
                        'playNow': {
                            pic: "",
                            url: "",
                            name: "",
                            albun: "",
                            singer: "",
                            link: "",
                            backgroundColor: ""
                        }
                    });
                }

                if (localStorage.playStyle) {
                    this.$store.commit('setData', {
                        'playStyle': {
                            playStatus: false,
                            playDuration: 0,
                            now: 0,
                            num: 0,
                            playType: localStorage.playStyle
                        }
                    });
                } else {
                    this.$store.commit('setData', {
                        'playStyle': {
                            playStatus: false,
                            playDuration: 0,
                            now: 0,
                            num: 0,
                            playType: 1
                        }
                    });
                }
            },
            playCtrl() {
                if (this.$store.state.playStyle.playStatus) {
                    setTimeout(() => {
                        this.$el.play()
                    }, 1)

                } else {
                    setTimeout(() => {
                        this.$el.pause()
                    }, 1)
                }
            }
        },
        computed: {
            getUrl() {
                return this.$store.state.playNow;
            },
            getStyle() {
                return this.$store.state.playStyle;
            }
        },
        watch: {
            getStyle() {
                this.playCtrl()
                this.changeSong()
            }
            // 是否可以监控具体的某个变量
        }
    }
</script>

<style>
</style>
