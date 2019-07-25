<template>
    <div style="width: 100%;overflow: hidden;">
        <div style="overflow: hidden;width: 200%;">
            <v-touch v-on:swipeleft="swiperleft" v-on:swiperight="swiperright" class="wrapper">
                <div class="left" v-bind:style="{'margin-left':leftstyle}">
                    <div class="main">
                        <div class="little-box"></div>
                    </div>
                    <div class="middle">
                        <p>x:<span></span></p>
                        <p>y:<span></span></p>
                        <p>z:<span></span></p>
                    </div>

                    <button>开始监听</button>
                    <button>停止监听</button>
                </div><div class="right">
                    <div>hsldhsldhl</div>
                </div>
            </v-touch>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                leftstyle:0,
                boxObj:{
                    acceleration:{
                        x:20,
                        y:20,
                        z:20
                    },
                    speed:{
                        x:20,
                        y:20,
                        z:20
                    }
                }
            }
        },

        methods: {
            swiperleft: function() {
                this.leftstyle= "-100%";
            },
            swiperright: function() {    
                this.leftstyle= "0";
            },
            
        }

    }
</script>

<style scoped>
    .little-box {
        background-color: #2C3E50;
        width: 20px;
        height: 20px;
        border-radius: 50%;
    }

    .middle p {
        display: inline-block;
        margin: 0 10px;
    }

    .middle {
        width: 300px;
        margin:0 auto;
      
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
    }

    .main {
       /* width: 300px; */
        height: 300px;
        margin: 0 auto;
        margin-bottom: 20px;
        background-color: #1AAC19;
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
