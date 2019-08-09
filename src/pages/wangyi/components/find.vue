<template>
    <div>
        <swiper :indicatorDots="true" indicatorActiveColor="#f40" :autoplay="true" :interval="3000">
            <div class="swiper_item" v-for="each in allData.swiper" :style="'background-image: url('+each.picUrl+');'"></div>
        </swiper>
        <hr>
        <songSheet titleLeft="推荐歌单" titleRight="歌单广场" type="playList"></songSheet>
        <hr>
        <songSheet titleLeft="专辑" titleRight="更多专辑" type="album" :showNum="false"></songSheet>
    </div>
</template>

<script>
    import Axios from '../axios'
    import songSheet from './songSheet'
    import swiper from './swiper.vue'
    export default {
        data() {
            return {
                allData: []
            }
        },
        components: {
            songSheet,
            swiper
        },
        mounted() {
            if (!this.$store.state.mainMessage.swiper.length) {
                var api = "http://132.232.169.227:1531/path/getMainMessage"
                Axios.send(api, 'get').then(res => {
                    console.log(res)
                    this.allData = res;
                    this.$store.commit('setData', {
                        'mainMessage': res
                    })
                }).catch(error => {
                    console.log('Error', error.message);
                })
            } else {
                this.allData = this.$store.state.mainMessage;
            }
        }
    }
</script>

<style scoped>
    .swiper_item {
        background-size: 100%;
        box-sizing: border-box;
        width: 92vw !important;
        height:40vw !important;
        margin: 0 4vw;
        border-radius: 0.5rem;
        background-clip: padding-box;
    }

    hr {
        background-color: #ccc;
        height: 1px;
        border: none;
        margin: 1rem 0;
    }
</style>
