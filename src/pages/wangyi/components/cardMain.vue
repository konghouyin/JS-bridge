<template>
    <div class="card-wrap" @click="routerSongList(message.link)">
        <div class="pic" :style="'backgroundImage:url('+message.pic.split('?')[0]+'?param=140y140);'"></div>
        <div class="num">▷ {{message.num}}</div>
        <div class="message">{{message.name}}</div>
    </div>

</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            routerSongList(target) {
                this.$router.push({
                    path: '/songList',
                    query: {
                        id: target,
                        type: this.type
                    }
                })
            }
        },
        props: {
            message: {
                type: Object
            },
            type: {
                type: String
            }
        }
    }
</script>

<style scoped>
    .card-wrap {
        position: relative;
        border-radius: 0.5rem;
        overflow: hidden;
        background-color: #fff;
    }

    .pic {
        width: 30vw;
        height: 30vw;
        background-size: 100%;
    }

    .num {
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
        background-color: #68686896;
        color: #fff;
        padding: 0.2rem 0.4rem;
        border-radius: 0.3rem;
        font-size: 0.7rem;
    }

    .message {
        font-size: 0.7rem;
        padding: 0.6rem 0.3rem;
        line-height: 1rem;
    }
</style>
