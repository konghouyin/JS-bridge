<template>
    <div>

    </div>
</template>

<script>
    import Axios from '../axios'
    import songSheet from "./songSheet"
    export default {
        data() {
            return {

            }
        },
        components: {
            songSheet
        },
        mounted() {
            if (!this.$store.state.topAllList.length) {
                var api = "http://localhost:1531/path/getTopAllList"
                Axios.send(api, 'get').then(res => {
                    console.log(res)
                    this.$store.commit('setData', {
                        'topAllList': res
                    }) //执行该方法
                }).catch(error => {
                    console.log('Error', error.message);
                })
            } else {
                this.allData = this.$store.state.topAllList;
            }
        }
    }
</script>

<style scoped>
    div {
        background-color: pink;
        width: 100%;
    }
</style>
