<template>
    <div>
        <div class="nav">
            <img src="../assets/leftArrow.svg" />

            <div class="search">
                <img v-if="searchValue!=''" @click="searchValue=''" src="../assets/trash.svg" />

                <form action="" ref="form">
                    <input type="text" name="search" ref="search" v-model="searchValue" />
                </form>
            </div>
            <img src="../assets/singer.svg" />
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchValue: "dgfdgfdf",
                page: "",
            }
        },
        methods: {
            findApi(value) {
                return new Promise((resolve, reject) => {
                    HN.webviewConnect({
                        num: 2,
                        msg: `jx("search",${value})`, //1页30   第一次  无参数
                        success: function(res, type) {
                            resolve(res, type)
                        },
                        fail: function(res, type) {
                            console.log(res, type)
                        }
                    })
                })
            },
            async requestSearch(){
                
            }
        },
        watch: {
            // searchValue(){
            //     
            // }
        },
        mounted() {
            // console.dir(this.$refs.search);
            // let promise=new Promise
            this.$refs.form.onsubmit = () => {

                console.log("哈哈")
                let promise = this.findApi(this.searchValue);



                // console.log(promise)
                // promise.then((res) => {
                //     console.log(res);
                //     this.requestSearch()
                // }).catch((error) => {
                //     console.log(error)
                // })
                
                 this.requestSearch(res)
            };


        }
    }
</script>

<style scoped>
    .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .nav img {
        width: 1.875rem;
        margin: 0.9375rem 0.625rem;


    }

    .search {
        display: inline-block;
        width: 65vw;
        height: 1.875rem;
        border-bottom: silver 1px solid;
        position: relative;
    }

    .search input {
        display: inline-block;
        width: 65vw;
        height: 1.875rem;
        font-size: 1.125rem;
        border-bottom: silver 1px solid;
        background: none;
        outline: none;
        border: none;
    }

    .search img {
        width: 1.4375rem;
        position: absolute;
        right: -10px;
        top: -10px;
    }
</style>
