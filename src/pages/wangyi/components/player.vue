<template>
    <audio :src="getUrl" controls></audio>
</template>

<script>
    import Axios from '../axios'
    export default {
        data() {
            return {
                playnum: -1
            }
        },
        mounted() {
            this.initStore() // 初始化vuex
        },
        methods: {
            async changeSong() {
                if (this.$store.state.playList[Math.floor(this.$store.state.playStyle.num)]) {
                    //确保歌曲列表中有此音乐
                    let music = this.$store.state.playList[Math.floor(this.$store.state.playStyle.num)];
                    let string = await this.JSgetString() // 进行js-bridge 通信
                    let api = "http://132.232.169.227:1531/path/getSongMain"
                    Axios.send(api, 'post', {
                        link: music.link,
                        string: JSON.parse(string).data
                    }).then(res => {
                        this.$store.commit('setData', {
                            'playNow': {
                                pic: res.pic,
                                url: res.url,
                                name: music.name,
                                albun: music.album,
                                singer: music.singer,
                                link: music.link,
                                backgroundColor: ""
                            }
                        });
                    }).catch(error => {
                        console.log('Error', error.message);
                    })
                }
            },
            JSgetString() {
                return new Promise(function(resolve, reject) {
                    HN.webviewConnect({
                        num: 2,
                        msg: `jx("songMain",1325897190,0)`,
                        success: function(res, type) {
                            resolve(res, type)
                        },
                        fail: function(res, type) {
                            console.log(res, type)
                        }
                    })
                })
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
                return this.$store.state.playNow.url ? this.$store.state.playNow.url : ""
            },
            getStyle() {
                return this.$store.state.playStyle;
            }
        },
        watch: {
            getStyle() {
                this.playCtrl()
                if (this.$store.state.playStyle.num != this.playnum) {
                    this.playnum = this.$store.state.playStyle.num
                    this.changeSong()
                }
            }
            // 是否可以监控具体的某个变量
        }
    }
</script>

<style>
</style>
