<template>
    <div>

    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {

        },
        mounted() {

        },
        components: {

        },
    }
</script>

<style scoped>
    
</style>
function a(){
    this.b=3;
}
let c=new a()
a.prototype={
    c:2
}

console.log(c.c,c.b)