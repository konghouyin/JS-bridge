<template>
    <div id="app">
       
        <transition name="component-fade" mode="out-in">
            <router-view />
        </transition>
       
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style scoped lang="scss">
    #app{
        paddding:4px;
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
