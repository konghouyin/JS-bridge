<template>
    <div id="app">
        <div class="tittle">H5-Native接口能力展示</div>
        <transition name="component-fade" mode="out-in">
            <router-view />
        </transition>
        <div class="bottom">H5-Native示例</div>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style scoped lang="scss">
    #app {
        padding: 12px 15px 30px 15px;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        text-align: center;
        color: #2c3e50;
        min-height: 100%;
        position: relative;
        box-sizing: border-box;
    }

    .tittle {
        font-size: 18px;
        text-align: left;
    }

    .bottom {
        width: 200px;
        text-align: center;
        font-size: 12px;
        position: absolute;
        bottom: 10px;
        left: 50%;
        margin-left: -100px;
    }

    .component-fade-enter-active,
    .component-fade-leave-active {
        transition: opacity .35s ease;
    }

    .component-fade-enter,
    .component-fade-leave-to {
        opacity: 0;
    }
</style>
