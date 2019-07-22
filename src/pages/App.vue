<template>
    <div id="app">
        <div class="tittle">H5-Native接口能力展示</div>
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style lang="scss">
    #app {
        padding: 15px;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        text-align: center;
        color: #2c3e50;
    }
    .tittle{
        font-size: 18px;
        text-align: left;
    }
</style>
