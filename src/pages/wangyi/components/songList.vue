<template>
    <div style="background-color: #FFE4C4; height: 62.5rem">
        <div class="nav">
            <img src="../assets/箭头-左.svg" />

            <span v-if="upSlide=!upSlide">歌单</span>
            <span v-else></span>


            <img src="../assets/搜索-白.svg" />
        </div>
    </div>
     <!--   
         <v-touch @click="">
             
         </v-touch> -->
</template>

<script>
    import songSheet from "./songSheet"
    import {
        Base64
    } from 'js-base64';
    export default {
        data() {
            return {
                upSlide: "false",
                out: [{
                    num: 1,
                    name: "hah",
                    long: "3.2",
                    singer: "hah",
                    album: "xiaoming"
                }],
                title: {
                    pic: "../assets/搜索-白.svg",
                    name: "ahahhaha撒大苏打萨达萨达",
                    playbackVolume: 1000
                }

            }
        },
        components: {
            songSheet
        },
        mounted() {

        },
        methods: {

        }
    }
</script>

<style scoped>
    .nav {
        opacity: .8;
        margin: 4px;
        padding: 7px;
        color: white;
        display: flex;
        align-items: center;
        position:fixed;
        background-color: #000000;
        justify-content: center;
    }

    .nav span {
        width: 75%;
        margin: 0 7px;
    }

    .nav img {
        width: 6%;
        z-index: 5;
        vertical-align: center;
    }
</style>
