<template>
    <div class="wrap">
        <div class="each" v-for="(item,index) in messageList" :key="index" @click="routerSongList(item.link)">
            <div class="pic" :style="'background-image:url('+ item.pic +');'"></div>
            <div class="message">
                <div class="item">{{"1."+item.msg[0].name+" - "+item.msg[0].album}}</div>
                <div class="item">{{"2."+item.msg[1].name+" - "+item.msg[1].album}}</div>
                <div class="item">{{"3."+item.msg[2].name+" - "+item.msg[2].album}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods:{
          routerSongList(target) {
              // console.log(target)
              this.$router.replace({
                  path: '/songList',
                  query: {
                      id: target,
                      type:'topList',
                  }
              });
          }  
        },
        props: {
            messageList: {
                type: Array,
                default: new Array()
            }
        }
    }
</script>

<style scoped>
    .each {
        overflow: hidden;
        padding: 2vw 4vw;
    }

    .pic {
        width: 28vw;
        height: 28vw;
        background-size: 100%;
        float: left;
        border-radius: 0.5rem;
    }

    .message {
        box-sizing: border-box;
        padding: 2vw 0;
        float: right;
        height: 28vw;
        width: 60vw;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    .item {
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
