<template>
    <div id="app">

        <transition name="component-fade" mode="out-in">
            <router-view />
        </transition>
        <player></player>
    </div>
</template>

<script>
    import player from './components/player'
    export default {
        name: 'App',
        components: {
            player
        }
    }
</script>

<style scoped lang="scss">
    #app {
        padding: 4px 0;
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
