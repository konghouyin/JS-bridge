<template>
    <audio :src="getUrl.url" controls></audio>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        mounted() {
            this.$el.src = this.$store.state.playNow.url;
            this.playCtrl()
        },
        methods:{
            playCtrl(){
                if (this.$store.state.playNow.playStatus) {
                    setTimeout(()=>{
                         this.$el.play()
                    },1)

                } else {
                    setTimeout(()=>{
                         this.$el.pause()
                    },1)
                }
            }
        },
        computed: {
            getUrl() {
                return this.$store.state.playNow;
            }
        },
        watch: {
            getUrl() {
                this.playCtrl()
            }
        }
    }
</script>

<style>
</style>
