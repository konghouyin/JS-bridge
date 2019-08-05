<template>
    <div>
        <swiper :indicatorDots="true" indicatorActiveColor="#f40">
            <div class="swiper_item" style="backgroundImage:url(http://p1.music.126.net/tXuT4UXQO4rMjudOT3snfQ==/109951164268497553.jpg);"></div>
            <div class="swiper_item" style="backgroundImage:url(http://p1.music.126.net/LGIR1zOgwG57ii-DUo0Zjw==/109951164267160673.jpg);"></div>
            <div class="swiper_item" style="backgroundImage:url(http://p1.music.126.net/lXyQiazIhH2O6UQOwWOVCQ==/109951164267177649.jpg);"></div>
            <div class="swiper_item" style="backgroundImage:url(http://p1.music.126.net/ARA-mfD2aSqp4uDkUJcypw==/109951164267409750.jpg);"></div>
            <div class="swiper_item" style="backgroundImage:url(http://p1.music.126.net/zND5qCgEuSnC_v7G6L1Tjw==/109951164267179824.jpg);"></div>
        </swiper>
    </div>
</template>

<script>
    import songSheet from "./songSheet"
    import swiper from "./swiper.vue"
    export default {
        data() {
            return {

            }
        },
        components: {
            songSheet,
            swiper
        }
    }
</script>

<style scoped>
    .swiper_item{
       background-size: 100%;
       box-sizing: border-box;
       width:92vw !important;
       margin: 0 4vw;
       border-radius: 0.5rem;
       background-clip: padding-box;
    }
</style>
