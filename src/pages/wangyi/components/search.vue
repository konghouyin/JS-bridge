<template>
    <div class="content content-front">
        <!-- 真正的内容 -->
        <div class="nav">
            <img src="../assets/箭头-左black.svg" @click="$router.go(-1)" />
            <input id="input" type="text" placeholder="搜索歌曲" v-model="input">
            <img src="../assets/搜索-灰.svg" @click="search" />
        </div>
        <div class="history">
            <img class="right" src="../assets/del.svg" @click="del" />
            <div class="title">历史记录</div>
            <div class="noHistory" v-if="historyList.length==0">没有搜索历史</div>
            <div class="wrap" v-else>
                <div class="wrap-item" v-for="item in historyList" @click="choose(item)">{{item}}</div>
            </div>
        </div>
        <div class="hot">
            <div class="title">热搜榜</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                historyList: "",
                input: ""
            }
        },
        mounted() {
            let local = localStorage.getItem('historyList');
            if(local){
                this.historyList = JSON.parse(localStorage.getItem('historyList'));
            }else{
                this.historyList = []
            }
        },
        methods: {
            choose(e) {
                this.input = e;
            },
            del() {
                 localStorage.setItem('historyList', '')
                 this.historyList = []
            },
            search() {
                if(this.input==""){
                    return
                }
                this.historyList.push(this.input)
                this.historyList = [...new Set(this.historyList)]
                localStorage.setItem('historyList', JSON.stringify(this.historyList))
            }
        }
    }
</script>

<style scoped>
    .content-front {
        position: absolute;
        width: 100%;
        height: 40px;
        top: 0rem;
    }

    .nav {
        margin-bottom: 1rem;
    }

    img {
        padding: 0 10px;
        width: 1.5rem;
        height: 40px;
        z-index: 5;
        vertical-align: middle;
    }

    .title {
        font-size: 1rem;
        margin: 0 20px;
        font-weight: 600;
        line-height: 40px;
    }

    #input {
        box-sizing: border-box;
        padding: 0.5rem;
        width: calc(100vw - 3rem - 50px);
        border: 0;
        outline: none;
        border-bottom: 2px solid #999;
    }

    .history {
        overflow: hidden;
    }

    .right {
        float: right;
        width: 1.2rem;
    }

    .noHistory {
        color: #999;
        text-align: center;
    }

    .wrap {
        padding: 10px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .wrap-item {
        margin: 5px 7px;
        padding: 5px 10px;
        border-radius: 50px;
        background-color: #e9e9e9;
        font-size: 0.8rem;
    }

    .hot {
        margin-top: 20px;
    }
</style>
