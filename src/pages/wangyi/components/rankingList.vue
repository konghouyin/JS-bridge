<template>
    <div class="wrap">
        <div class="title">推荐榜单</div>
        <rankingListBlock :messageList="sixList"></rankingListBlock>
        <div class="title">全部榜单</div>
        <songsBlock v-bind:messageList="topList.taste" :showNum="false"></songsBlock>
    </div>
</template>

<script>
    import Axios from '../axios'
    import songsBlock from "./songsBlock"
    import rankingListBlock from "./rankingListBlock"
    export default {
        data() {
            return {
                topList: {
                    taste:[]
                }
            }
        },
        components: {
            songsBlock,
            rankingListBlock
        },
        mounted() {
            if (!this.$store.state.topAllList.length) {
                var api = "http://132.232.169.227:1531/path/getTopAllList"
                Axios.send(api, 'get').then(res => {
                    console.log(res)
                    this.topList = res;
                    this.$store.commit('setData', {
                        'topAllList': res
                    }) //执行该方法
                }).catch(error => {
                    console.log('Error', error.message);
                })
            } else {
                this.topList = this.$store.state.topAllList;
            }
        },
        computed: {
            sixList() {
                let list = [];
                if(this.topList.taste.length==0){
                    return []
                }
                for (let i = 0; i < 6; i++) {
                    list.push(this.topList.taste[i])
                }
                return list
            }
        }
    }
</script>

<style scoped>
    .title {
        font-size: 1.2rem;
        margin: 2rem 0 1rem 1rem;
        font-weight: 600;
    }
</style>
