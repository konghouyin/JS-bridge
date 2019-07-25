<template>
    <div style="width: 100%;overflow: hidden;">
        <div style="overflow: hidden;width: 200%;">
            <v-touch v-on:swipeleft="swiperleft" v-on:swiperight="swiperright" class="wrapper">
                <div class="left" v-bind:style="{'margin-left':leftstyle}">
                    <div class="main">
                        <div class="little-box" v-bind:style="{top:move.y+'px',left:move.x+'px'}"></div>
                    </div>
                </div>
                <div class="right">
                    <div>hsldhsldhl</div>
                </div>
            </v-touch>
        </div>
        <div class="middle">
            <p>x: {{accelerationComputed.x}}<span></span></p>
            <p>y: {{accelerationComputed.y}}<span></span></p>
            <p>z: {{accelerationComputed.z}}<span></span></p>
        </div>
        <button @click="startAccelerometer()">开始监听</button>
        <button @click="stopAccelerometer()">停止监听</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                boxWidth:0,
                leftstyle: 0,
                acceleration: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                speed: {
                    x: 0,
                    y: 0,
                },
                time: 0,
                move: {
                    x: 0,
                    y: 0
                }
            }
        },
        computed: {
            // timeChanges(){
            //     let timeChange=new Date().getTime()-this.time;  
            //     this.time=this.time+timeChange
            // },
            accelerationComputed() {
                return {
                    x: this.acceleration.x.toFixed(2),
                    y: this.acceleration.y.toFixed(2),
                    z: this.acceleration.z.toFixed(2)
                }
            },
            speedChange() {
                console.log("speed")
                this.speed.x = this.acceleration.x * (new Date().getTime() - this.time) + this.speed.x
                this.speed.y = this.acceleration.y * (new Date().getTime() - this.time) + this.speed.y
            },
            moveChange() {
                console.log("changemoved")
                this.move.x += this.speed.x * (new Date().getTime() - this.time)
                this.move.y += this.speed.y * (new Date().getTime() - this.time)
                this.move.x= this.move.x>this.boxWidth?this.boxWidth:(this.move.x<0?0:this.move.x);
                this.move.y= this.move.y>300?300:(this.move.y<0?0:this.move.y);
                this.time = new Date().getTime()
            }
        },
        mounted(){
            this.boxWidth=this.$el.offsetWidth-20
        },

        methods: {
            swiperleft: function() {
                this.leftstyle = "-100%";
            },
            swiperright: function() {
                this.leftstyle = "0";
            },
            startAccelerometer() {

                HN.startAccelerometer({
                    success: (res) => {
                        console.log(res)
                        this.time = new Date().getTime();
                    },
                    fail(res) {
                        console.log(res)
                    },
                    complete(res) {
                        console.log(res)
                    },
                    change: (res) => {
                        console.log(res)
                        this.acceleration = res
                        // this.timeChanges()
                        // this.speedChange()
                        // this.moveChange()
                    }
                })
            },
            stopAccelerometer() {
                HN.stopAccelerometer({
                    success(res) {
                        console.log(res)
                    },
                    fail(res) {
                        console.log(res)
                    },
                    complete(res) {
                        console.log(res)
                    }
                })
            }


        }

    }
</script>

<style scoped>
    .little-box {
        background-color: #2C3E50;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        position: absolute;
    }

    .middle p {
        display: inline-block;
        margin: 0 10px;
    }

    .middle {
        width: 300px;
        margin: 0 auto;

        margin-bottom: 20px;
    }

    .left,
    .right {
        display: inline-block;
        width: 50%;
        transition: .5s;
    }

    .left {
        background-color: red;
    }

    .right {
        background-color: #1AAC19;
        margin-left: -5px;
    }

    .main {
        /* width: 300px; */
        height: 300px;
        margin: 0 auto;
        margin-bottom: 20px;
        background-color: #1AAC19;
        position: relative;
    }

    button {
        border: #CCCCCC solid 1px;
        border-radius: 5px;
        font-size: 20px;
        padding: 10px;
        margin-right: 10px;
        background-color: transparent;
    }
</style>
