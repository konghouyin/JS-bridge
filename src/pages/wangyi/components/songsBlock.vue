<!-- 歌曲块  传入一个数组 动态根据数组的长度渲染 -->


<template>
    <div class="main">
        <div class="item" v-for="(each,index) in messageList" :key="index" @click="routerSongList(each.link)">
            <div class="pic" :style="'background-image: url('+ each.pic +');'"></div>
            <div class="name">{{each.name}}</div>
            <div class="num">▷ {{each.num}}</div>
        </div>
    </div>
</template>

<script>
    // import songSheet from "./songSheet"
    export default{
        data(){
            return{
                
            }
        },components:{
            // songSheet
        },
        props:{
            messageList:{
                type:Array,
                default:"歌单"
            }
        },
        methods:{
            routerSongList(target){
                // console.log(target)
                 this.$router.replace({path:'/songList',query:{id:target}});
            }
        },
        mounted(){
            
            
        },props:{
            out:{
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>
      .main {
         display: flex;
         flex-direction: row;
         flex-wrap: wrap;
         justify-content: space-evenly;
     }
     
     .item {
         position: relative;
     }
     
     .pic {
         width: 28vw;
         height: 28vw;
         border-radius: 0.4rem;
         background-size: 100%;
     }
     
     .name {
         overflow: hidden;
         text-overflow: ellipsis;
         display: -webkit-box;
          font-size: 0.875rem;
         /* 几行后显示省略号 */
         -webkit-line-clamp: 2;
         -webkit-box-orient: vertical;
         width: 28vw;
         color: #666;
         margin: 0.5rem 0;
     }
     
     .num {
         position: absolute;
         top: 0.2rem;
         right: 0.2rem;
         background-color: #c7c7c799;
         color: #fff;
         padding: 0.2rem 0.4rem;
         border-radius: 0.3rem;
         font-size: 0.7rem;
     }  
</style>