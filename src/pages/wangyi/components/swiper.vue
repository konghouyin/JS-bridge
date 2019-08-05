<template>
    <div class="wrap">
        <div class="swiper_wrap" v-swiper="{move,end}" ref="swiper_wrap" :style="{marginLeft:swiperLeft,transition:'all '+duration+'ms'}">
            <slot></slot>
        </div>
        <div class="load" v-show="indicatorDots">
            <div class="point" v-for="item in allNum" :style="{backgroundColor:item==index || (item==allNum&&index==0) || (item==1&&index==allNum+1)? indicatorActiveColor:indicatorColor}"
                :key="item"></div>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                allNum: 0,
                index: 1,
            }
        },
        props: {
            indicatorDots: {
                type: Boolean,
                default: false
            },
            indicatorColor: {
                type: String,
                default: "rgba(0, 0, 0, .3)"
            },
            indicatorActiveColor: {
                type: String,
                default: "#000000"
            },
            autoplay: {
                type: Boolean,
                default: false
            },
            interval: {
                type: Number,
                default: 5000
            },
            duration: {
                type: Number,
                default: 500
            },
        },
        mounted() {
            this.allNum = this.$el.children[0].children.length
            this.$el.children[0].style.width = (this.$el.children[0].children.length + 2) * 100 + 'vw'
            let domStart = this.$el.children[0].children[0].cloneNode(true);
            let domEnd = this.$el.children[0].children[this.allNum - 1].cloneNode(true);
            this.$el.children[0].appendChild(domStart);
            this.$el.children[0].insertBefore(domEnd, this.$el.children[0].firstElementChild);
        },
        methods: {
            move(e, start, x) {
                if(this.flag){
                    retrun;
                }
                this.$refs.swiper_wrap.style.transition = 'none'
                this.$refs.swiper_wrap.style.marginLeft = (this.index) * (-100) + (x / document.body.offsetWidth) *
                    100 + 'vw'
            },
            end(e, num) {
                if(this.flag){
                    this.index = this.index;
                    retrun;
                }
                this.index += num;
                this.$refs.swiper_wrap.style.transition = 'all ' + this.duration + 'ms'
                this.$refs.swiper_wrap.style.marginLeft = (this.index) * (-100) + 'vw'
                if (this.index > this.allNum) {
                    this.flag=1;
                    this.$refs.swiper_wrap.addEventListener('transitionend', ()=>{
                        this.flag=0;
                        this.$refs.swiper_wrap.style.transition = 'none';
                        this.index = 1;
                    }, {once:true})
                } else if (this.index == 0) {
                    this.flag=1;
                    this.$refs.swiper_wrap.addEventListener('transitionend', ()=>{
                        this.flag=0;
                        this.$refs.swiper_wrap.style.transition = 'none';
                        this.index = this.allNum;
                    }, {once:true})
                }
            }
        },
        computed: {
            swiperLeft() {
                return (this.index) * (-100) + 'vw'
            }
        }

    }
</script>

<style scoped>
    .wrap {
        width: 100vw;
        overflow: hidden;
        position: relative;
    }

    .swiper_wrap {
        overflow: hidden;
    }

    .swiper_item {
        float: left;
        width: 100vw;
        height: 10rem;
    }

    .load {
        margin: auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: absolute;
        width: 100vw;
        bottom: 0.5rem;
    }

    .point {
        width: 0.5rem;
        height: 0.5rem;
        margin: 0 0.35rem;
        border-radius: 1rem;
    }
</style>
