<template>
    <div>
        <div class="wrap" :style="'width:'+getAll+'px;'">
            <div class="text" ref="text" :style="'marginLeft:'+left+'px; marginRight:'+distance+'px'">{{text}}</div>
            <div class="text" ref="text">{{text}}</div>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                left: 0,
                wrapWidth: 0,
                textWidth: 0,
                distance: 100
            }
        },
        props: {
            text: {
                type: String,
                default: 'text'
            },
            direction: {
                type: String,
                default: 'scroll'
            },
            starttype: {
                type: String,
                default: 'over'
            },
            scrollamount: {
                type: Number,
                default: 5
            },
            scrolldelay: {
                type: Number,
                default: 1500
            },
            loop: {
                type: Number,
                default: Infinity
            },
        },
        mounted() {
            this.wrapWidth = this.$el.scrollWidth
            this.textWidth = this.$refs.text.scrollWidth
            if (this.starttype == 'none') {
                return;
            }
            if (this.wrapWidth >= this.textWidth) {
                return
            }
            this.startTimer();

        },
        methods: {
            startTimer() {
                if (this.loop > 0) {
                    setTimeout(() => {
                        this.loop--
                        if (this.direction == "left") {
                            this.move()
                        } else {
                            this.scroll()
                        }
                    }, this.scrolldelay)
                }
            },
            move() {
                this.timer = setInterval(() => {
                    this.left -= this.scrollamount / 10
                    if (this.left <= -this.textWidth - this.distance) {
                        clearInterval(this.timer);
                        this.left = 0;
                        this.startTimer();
                    }
                }, 10)
            },
            scroll() {
                let speed = this.scrollamount / 10
                let flag = 0;
                this.timer = setInterval(() => {
                    this.left -= speed
                    if (this.left <= this.wrapWidth - this.textWidth && flag == 0) {
                        speed = 0;
                        flag = 1;
                        setTimeout(() => {
                            speed = -this.scrollamount / 10
                        }, this.scrolldelay)
                    } else if (this.left > 0) {
                        clearInterval(this.timer);
                        this.left = 0;
                        this.startTimer();
                    }
                }, 10)
            }
        },
        computed: {
            getAll() {
                return this.textWidth * 2 + this.distance
            }
        }
    }
</script>

<style scoped>
    .wrap {
        overflow: hidden;
    }

    .text {
        float: left;
        display: inline-block;
        width: max-content;
    }
</style>
