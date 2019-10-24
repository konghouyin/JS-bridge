<template>
    <audio :src="getUrl"></audio>
    <!-- <audio :src="getUrl" controls></audio> -->
</template>

<script>
    import Axios from '../axios'
    export default {
        data() {
            return {
                playnum: -1,
                playLink: '',
                firstTime: 0
            }
        },
        mounted() {
            this.initStore() // 初始化vuex
            this.initPlayer() // 初始化播放器
        },
        methods: {
            async changeSong() {
                if (Math.floor(this.$store.state.playStyle.num) - 1 >= 0 && this.$store.state.playList[Math.floor(
                        this.$store.state.playStyle.num) - 1]) {
                    // 确保歌曲列表中有此音乐
                    console.log('changemore')
                    let music = this.$store.state.playList[Math.floor(this.$store.state.playStyle.num) - 1]
                    let string = await this.JSgetString(music.link.split('id=')[1]) // 进行js-bridge 通信
                    let api = 'http://132.232.169.227:1531/path/getSongMain'
                    console.log('send')
                    Axios.send(api, 'post', {
                        link: music.link,
                        string: JSON.parse(string).data
                    }).then(res => {
                        if (res.url == null) {
                            HN.showModal({
                                title: '没有这首歌的资源',
                                content: '我们正在全力获取这首歌的资源，敬请期待',
                                showCancel: false,
                                confirmText: '知道了',
                                confirmColor: '#07c160',
                                success: (res, style) => {
                                    this.$store.state.playList.splice(this.$store.state.playStyle
                                        .num - 1, 1)
                                    this.$store.state.playStyle.num = this.$store.state.playStyle
                                        .num - 1 + Math.random()
                                    if (this.$store.state.playList.length != 0) {
                                        this.playNext()
                                    } else {
                                        this.$store.state.playStyle.num = Math.random()
                                    }
                                },
                                fail: (res, style) => {
                                    console.log(res)
                                },
                                complete: (res, style) => {
                                    console.log('complete')
                                }
                            })
                        }
                        this.$store.commit('setData', {
                            'playNow': {
                                pic: res.pic,
                                url: res.url,
                                name: music.name,
                                album: music.album,
                                singer: music.singer,
                                link: music.link,
                                backgroundColor: ''
                            }
                        })
                        try {
                            let obj = this.$store.state.playStyle
                            obj.playStatus = true
                            this.$store.commit('setData', {
                                'playStyle': obj
                            })
                        } catch (e) {
                            // TODO handle the exception
                        }

                        localStorage.setItem('playNow', JSON.stringify({
                            pic: res.pic,
                            url: res.url,
                            name: music.name,
                            album: music.album,
                            singer: music.singer,
                            link: music.link,
                            backgroundColor: ''
                        }))
                    }).catch(error => {
                        console.log('Error', error.message)
                    })
                } else {
                    this.$store.commit('setData', {
                        'playNow': {
                            pic: '',
                            url: '',
                            name: '',
                            album: '',
                            singer: '',
                            link: '',
                            backgroundColor: ''
                        }
                    })
                }
            },
            JSgetString(songid) {
                return new Promise(function(resolve, reject) {
                    HN.webviewConnect({
                        num: 2,
                        msg: `jx("songMain",${songid},0)`,
                        success: function(res, type) {
                            resolve(res, type)
                        },
                        fail: function(res, type) {
                            console.log(res, type)
                        }
                    })
                })
            },
            initPlayer() {
                this.$el.addEventListener('timeupdate', () => {
                    this.$store.state.playStyle.now = this.$el.currentTime
                })
                this.$el.addEventListener('ended', () => {
                    this.playNext()
                })
                this.$el.addEventListener('durationchange', () => {
                    this.$store.state.playStyle.playDuration = this.$el.duration
                })
            },
            playNext() {
                if (this.$store.state.playStyle.playType == 1) {
                    if (Math.floor(this.$store.state.playStyle.num) == this.$store.state.playList.length) {
                        if (this.$store.state.playList.length == 1) {
                            this.$store.state.playStyle.playStatus = false
                            this.$store.state.playStyle.playStatus = true
                        } else {
                            this.$store.state.playStyle.num = 1 + Math.random()
                        }
                    } else {
                        this.$store.state.playStyle.num = Math.floor(this.$store.state.playStyle.num) + 1 + Math.random()
                    }
                } else if (this.$store.state.playStyle.playType == 2) {
                    this.$store.state.playStyle.num = Math.random() * (this.$store.state.playList.length) + 1
                } else if (this.$store.state.playStyle.playType == 3) {
                    this.$store.state.playStyle.playStatus = false
                    this.$store.state.playStyle.playStatus = true
                } else if (this.$store.state.playStyle.playType == 4) {
                    if (this.$store.state.playStyle.num == this.$store.state.playList.length) {
                        this.$store.state.playStyle.num = 0 + Math.random()
                    } else {
                        this.$store.state.playStyle.num = this.$store.state.playStyle.num + 1 + Math.random()
                    }
                }
            },
            initStore() {
                if (localStorage.playList) {
                    this.$store.commit('setData', {
                        'playList': JSON.parse(localStorage.playList)
                    })
                } else {
                    this.$store.commit('setData', {
                        'playList': []
                    })
                }
                if (localStorage.playNow) {
                    this.$store.commit('setData', {
                        'playNow': JSON.parse(localStorage.playNow)
                    })
                } else {
                    this.$store.commit('setData', {
                        'playNow': {
                            pic: '',
                            url: '',
                            name: '',
                            album: '',
                            singer: '',
                            link: '',
                            backgroundColor: ''
                        }
                    })
                }
                if (localStorage.playStyle) {
                    this.$store.commit('setData', {
                        'playStyle': {
                            playStatus: false,
                            playDuration: 0,
                            now: 0,
                            jump: 0,
                            num: 0,
                            playType: localStorage.playStyle
                        }
                    })
                } else {
                    this.$store.commit('setData', {
                        'playStyle': {
                            playStatus: false,
                            playDuration: 0,
                            now: 0,
                            jump: 0,
                            num: 0,
                            playType: 1
                        }
                    })
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
                return this.$store.state.playNow.url ? this.$store.state.playNow.url : ''
            },
            getStyle() {
                return this.$store.state.playStyle.num
            },
            getStatus() {
                return this.$store.state.playStyle.playStatus
            },
            getTimeJump() {
                return this.$store.state.playStyle.jump
            }
        },
        watch: {
            getStatus: {
                deep: true,
                handler() {
                    this.playCtrl()
                }
            },
            getStyle: {
                deep: true,
                handler() {
                    if (this.$store.state.playStyle.num != this.playnum &&
                        this.$store.state.playList.length > 0 &&
                        this.$store.state.playList[Math.floor(this.$store.state.playStyle.num) - 1] &&
                        this.playLink != this.$store.state.playList[Math.floor(this.$store.state.playStyle.num) - 1].link
                    ) {
                        this.playnum = this.$store.state.playStyle.num
                        this.playLink = this.$store.state.playList[Math.floor(this.$store.state.playStyle.num) - 1].link
                        this.changeSong()
                    }
                }
            },
            getTimeJump(e) {
                this.$el.currentTime = e
            }
        }
    }
</script>

<style>
</style>
