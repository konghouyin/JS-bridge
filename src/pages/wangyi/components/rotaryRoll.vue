<!-- 歌单详细上面的轮播图 -->
<template>
    <div class="content">
        <div class="one" v-swiper="{move,end}" :style="one">1</div>
        <div class="two" v-swiper="{move,end}" :style="two">2</div>
        <div class="three" v-swiper="{move,end}" :style="three">3</div>
    </div>
</template>

<script>
    import swiper from './swiper'
    export default {
        data() {
            return {
                one: {
                    width: "30 vw",
                    height: "20 vh",
                    left: "10%",
                    transform: "translateY(-50%)",
                },
                two: {
                    width: "40 vw",
                    height: "30 vh",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                },
                three: {
                    width: "30 vw",
                    height: "20 vh",
                    left: "60%",
                    transform: "translateY(-50%)",
                },
                arr:["one","two","three"],
                long: 0, //但当前的移动距离
                director: "",
            }
        },
        methods: {
            // start(e){
            //     console.log("num")
            // },
            move(e, start, x) {
                console.log(start, x);
                //var one = document.getElementsByClassName("one")[0];
                // console.log(one.style.width)



                if (x < 0) { //左移
                    this.director == "left"
                    this.three.height = parseFloat(this.three.height) < 30 ? parseFloat(this.three.height) + 0.3 + "vh" :
                        "30vh"
                    this.three.width = parseFloat(this.three.width) < 40 ? parseFloat(this.three.width) + 0.3 + "vw" :
                        "40vw"
                    if (parseFloat(this.three.left) > 50) {
                        this.three.left = parseFloat(this.three.left) - 1 + "%";
                        this.three.transform = "translate(-50%,-50%)"
                    } else {
                        this.three.left = "50%";
                        this.three.transform = "translate(-50%,-50%)"
                    }

                    this.two.height = parseFloat(this.two.height) > 20 ? parseFloat(this.two.height) - 0.3 + "vh" :
                        "20vh"
                    this.two.width = parseFloat(this.two.width) > 30 ? parseFloat(this.two.width) - 0.3 + "vw" : "30vw"
                    if (parseFloat(this.two.left) > 10) {
                        this.two.left = parseFloat(this.two.left) - 1 + "%";
                        this.two.transform = "translateY(-50%)"
                    } else {
                        this.two.left = "10%";
                        this.two.transform = "translateY(-50%)"
                    }

                    if (parseFloat(this.one.left) < 60) {
                        this.one.left = parseFloat(this.one.left) + 1.5 + "%";
                        this.two.transform = "translateY(-50%)"
                    } else {
                        this.one.left = "60%";
                        this.two.transform = "translateY(-50%)"
                    }
                } else { //右移
                    this.director == "right"
                    this.one.height = parseFloat(this.one.height) < 30 ? parseFloat(this.one.height) + 0.3 + "vh" :
                        "30vh"
                    this.one.width = parseFloat(this.one.width) < 40 ? parseFloat(this.one.width) + 0.3 + "vw" :
                        "40vw"
                    if (parseFloat(this.one.left) < 50) {
                        this.one.left = parseFloat(this.one.left) + 1 + "%";
                        this.one.transform = "translate(-50%,-50%)"
                    } else {
                        this.one.left = "50%";
                        this.one.transform = "translate(-50%,-50%)"
                    }

                    this.two.height = parseFloat(this.two.height) > 20 ? parseFloat(this.two.height) - 0.3 + "vh" :
                        "20vh"
                    this.two.width = parseFloat(this.two.width) > 30 ? parseFloat(this.two.width) - 0.3 + "vw" : "30vw"
                    if (parseFloat(this.two.left) < 60) {
                        this.two.left = parseFloat(this.two.left) + 1 + "%";
                        this.two.transform = "translateY(-50%)"
                    } else {
                        this.two.left = "60%";
                        this.two.transform = "translateY(-50%)"
                    }

                    if (parseFloat(this.three.left) > 10) {
                        this.three.left = parseFloat(this.three.left) - 1.5 + "%";
                        this.two.transform = "translateY(-50%)"
                    } else {
                        this.three.left = "10%";
                        this.two.transform = "translateY(-50%)"
                    }
                }

            },
            end(e, num, time) {
                
                if (this.director == "left"){
                     if(this.arr==["one","two","three"]){
                         this.arr==["two","three","one"]
                     }else if(this.arr==["two","three","one"]){
                         this.arr==["three","one","two"]
                     }else if(this.arr==["three","one","two"]){
                         this.arr==["one","two","three"]
                     }
                     
                }else if(this.director=="right"){
                     if(this.arr==["one","two","three"]){
                        this.arr==["three","one","two"]
                    }else if(this.arr==["three","one","two"]){
                        this.arr==["two","three","one"]
                    }else if(this.arr==["two","three","one"]){
                        this.arr==["one","two","three"]
                    }
                }
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .content div {
        border: #CCCCCC solid 0.0625rem;
        border-radius: 0.3125rem;
    }

    .content {
        width: 100vw;
        /* display: flex; */
        align-items: center;
        position: relative;
        height: 40vh;
    }

    .one,
    .three {
        width: 30vw;
        height: 20vh;
        background-color: pink;
        opacity: .3;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

    }

    .one {
        left: 10%;

    }

    .three {
        right: 10%;
    }

    .two {
        width: 40vw;
        height: 30vh;
        background-color: pink;
        opacity: .6;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        /* transform: translate(-50% -50%); */


        /* transform:; */
    }
</style>
