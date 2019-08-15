<template>
    <div class="wrap" v-swiper="{move,end}">
        <div class="card" :style="styleList['style'+(index%3)]" ref="card1">
            <cardMain :message="message[0]" :type="type"></cardMain>
        </div>
        <div class="card" :style="styleList['style'+((index+1)%3)]" ref="card2">
            <cardMain :message="message[1]" :type="type"></cardMain>
        </div>
        <div class="card" :style="styleList['style'+((index+2)%3)]" ref="card3">
            <cardMain :message="message[2]" :type="type"></cardMain>
        </div>
    </div>
</template>

<script>
    import cardMain from './cardMain'
    export default {
        data() {
            return {
                styleList: {
                    'style0': {
                        transform: 'scale(1.3)',
                        opacity: '1',
                        zIndex: '2'
                    },
                    'style1': {
                        transform: 'translateX(-25vw)',
                        opacity: '0.5'
                    },
                    'style2': {
                        transform: 'translateX(25vw)',
                        opacity: '0.5'
                    }
                },
                index: 10000
            }
        },
        props: {
            type: {
                type: String
            },
            message: {
                type: Array
            },
            autoplay: {
                type: Boolean,
                default: false
            },
            interval: {
                type: Number,
                default: 1000
            },
            duration: {
                type: Number,
                default: 500
            }
        },
        mounted() {
            if (this.autoplay) {
                this.timer = setTimeout(() => {
                    this.end(undefined, 1)
                }, this.interval)
            }
        },
        methods: {
            move(e, start, x) {
                clearTimeout(this.timer)
                this.stopTransition()
                this.animation(x)
            },
            end(e, num) {
                clearTimeout(this.timer)
                if (this.autoplay) {
                    this.timer = setTimeout(() => {
                        this.end(undefined, 1)
                    }, this.interval)
                }
                this.initStyle()
                this.startTransition()
                this.index += num
            },
            animation(num) {
                let step = num / 300
                if (num < 0) {
                    this.styleList = Object.assign({}, {
                        'style0': {
                            transform: 'scale(' + (1.3 - Math.abs(step) * 0.3 < 1 ? '1' : 1.3 - Math.abs(step) *
                                0.3 + '') + ') translateX(' + (step * 25 < -25 ? '-25' : step * 25) + 'vw)',
                            opacity: 1 - Math.abs(step) * 0.5 < 0.5 ? '0.5' : 1 - Math.abs(step) * 0.5 + ''
                        },
                        'style1': {
                            transform: 'translateX(' + (-step * 50 - 25 > 25 ? '25' : -step * 50 - 25) + 'vw)',
                            opacity: '0.5'
                        },
                        'style2': {
                            transform: 'scale(' + (1 + Math.abs(step) * 0.3 > 1.3 ? '1.3' : 1 + Math.abs(step) *
                                    0.3 + '') + ') translateX(' + (25 + step * 25 < 0 ? '0' : 25 + step * 25) +
                                'vw)',
                            opacity: 0.5 + Math.abs(step) * 0.5 > 1 ? '1' : 0.5 + Math.abs(step) * 0.5 + ''
                        }
                    })
                } else {
                    this.styleList = Object.assign({}, {
                        'style0': {
                            transform: 'scale(' + (1.3 - Math.abs(step) * 0.3 < 1 ? '1' : 1.3 - Math.abs(step) *
                                0.3 + '') + ') translateX(' + (step * 25 > 25 ? '25' : step * 25) + 'vw)',
                            opacity: 1 - Math.abs(step) * 0.5 < 0.5 ? '0.5' : 1 - Math.abs(step) * 0.5 + ''
                        },
                        'style1': {
                            transform: 'scale(' + (1 + Math.abs(step) * 0.3 > 1.3 ? '1.3' : 1 + Math.abs(step) *
                                    0.3 + '') + ') translateX(' + (-25 + step * 25 > 0 ? '0' : -25 + step * 25) +
                                'vw)',
                            opacity: 0.5 + Math.abs(step) * 0.5 > 1 ? '1' : 0.5 + Math.abs(step) * 0.5 + ''
                        },
                        'style2': {
                            transform: 'translateX(' + (25 - step * 50 < -25 ? '-25' : 25 - step * 50) + 'vw)',
                            opacity: '0.5'
                        }
                    })
                }
            },
            stopTransition() {
                this.$refs.card1.style.transition = 'none'
                this.$refs.card2.style.transition = 'none'
                this.$refs.card3.style.transition = 'none'
            },
            startTransition() {
                this.$refs.card1.style.transition = 'all ' + this.duration + 'ms'
                this.$refs.card2.style.transition = 'all ' + this.duration + 'ms'
                this.$refs.card3.style.transition = 'all ' + this.duration + 'ms'
            },
            initStyle() {
                this.styleList = Object.assign({}, {
                    'style0': {
                        transform: 'scale(1.3)',
                        opacity: '1',
                        zIndex: '2'
                    },
                    'style1': {
                        transform: 'translateX(-25vw)',
                        opacity: '0.5'
                    },
                    'style2': {
                        transform: 'translateX(25vw)',
                        opacity: '0.5'
                    }
                })
            }
        },
        components: {
            cardMain
        }
    }
</script>

<style scoped>
    .wrap {
        position: relative;
        overflow: hidden;
        height: 73vw;
    }

    .card {
        height: 30vw;
        width: 30vw;
        background-color: #F8F8F8;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -15vw;
        margin-top: -15vw;
        transition: all 0.5s;
    }

    .style1 {
        transform: scale(1.3);
    }

    .style2 {
        transform: translateX(-25vw) translateY(0px);
        opacity: 0.5;
    }

    .style3 {}
</style>
