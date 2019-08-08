<template>
    <div class="wrap-btn">
        <div class="pic"></div>
        <marquee direction="scroll" behavior="scroll" class="message" text="十案说1231231s ss dfs 23sdfsf dfsdf法"></marquee>
        <div class="btn"></div>
        <div class="list"></div>
    </div>
</template>

<script>
    import marquee from './marquee'
    export default {
        data() {
            return {

            }
        },
        computed: {
            playNow() {
                return this.$store.state.playNow;
            }
        },
        components: {
            marquee
        }
    }
</script>

<style scoped>
    .wrap-btn {
        padding: 0.5rem;
        width: 100vw;
        position: fixed;
        bottom: 0;
        background-color: #fff;
    }

    .pic {
        margin: 0 0.2rem;
        width: 10vw;
        height: 10vw;
        background-color: #1AAC19;
        float: left;
        border-radius: 5rem;
    }

    .message {
        float: left;
        width: 60vw;
        overflow: hidden;
    }

    .btn,
    .list {
        float: right;
    }
</style>
