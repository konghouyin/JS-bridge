<!-- //歌单 -->

<template>
    <div>

        <div class="nav"></div>
        <div class="content">
            <div v-if="out==[]" style="text-align: center;">
                . . .loading
            </div>
            <div v-else class="item" v-for="(item,index) in getData" @click="">
              <!-- <img src="../assets/播放.svg"> -->
                <div class="roll">{{index+1}}</div>
                <div class="middle">
                    <p>{{item.name}}</p>
                    <p>{{item.singer}}</p>
                </div>
                <img src="../assets/更多-灰.svg" class="more">
            </div>

        </div>

    </div>
</template>

<script>
    // import songSheet from "./songSheet"
    export default {
        data() {
            return {
                // out:[]
            }
        },
        props: {
            out: {
                type: Array,
                default: []
            }
        },
        mounted() {
            // console.log(this.out)
            // a()
        },
        computed: {
            getData() {
                console.log(this.out)
                return (this.out)
            }
        }
    }
</script>

<style scoped>
    div {
       /* background-color: white; */
        width: 100%;
    }

    .item img,.roll{
        width: 1.375rem;
        padding: 0.625rem;
    }
    .more{
        float: right;
        margin-right: 0.625rem;
    }
    .roll{
        display: inline-block;
        font-size: 1.25rem;
        color: #CCCCCC;
    }
    .item {
        padding: 0.75rem 0.325rem;
        height: 2.525rem;
    }

    /*  .middle {
        display: inline-block;
        width: 17.5rem;
        margin-left: 0.825rem;
        line-height: 1.2125rem;
    } */
    .middle {
        width: 17rem;
        display: inline-block;
        overflow: hidden;
       /* margin-left: 0.825rem; */
  
    }

    .middle p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-height: 1.20rem;
    -webkit-box-orient: vertical;
    }
    
    .middle p:nth-of-type(2){
        color:#AAAAAA
    }
</style>
