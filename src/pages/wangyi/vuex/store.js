import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


//state在vuex中存储数据 类似于组件中的data
var state = {
    // mainData:{}   //发现首页的数据
    mainMessage: {
        swiper: [],
        playList: [],
        album: []
    },
    topAllList: [],
    playNow: {
        pic:'http://p4.music.126.net/T2ZI7x0FYqlWKMacXLQNsQ==/1379887098137843.jpg?param=200y200',
        url: 'https://m801.music.126.net/20190808111512/df19e769ce3c6483bbeb2115102c920c/jdyyaac/015b/015d/025d/61cbe9f45a67592d81a45740dd85980f.m4a',
        playStatus: false
    },
    playList: []
}

//优点类似于计算属性  改变state里面的count数据的时候就会触发getters里面的方法  获取新的值
var getters = {
    // getMainMessage() {
    //        console.log(Object.keys(state),state.mainMessage)
    // 	return state.mainMessage
    // }
}
// mutations 里面放的是方法，主要用于改变state里面的数据
var mutations = {
    setData: function(context, msg) {
        let list = Object.keys(msg);
        list.forEach(item => {
            state[item] = Object.assign({}, msg[item])
        })
        console.log(state)
    }
}

var actions = {

}

//实例化 Vuex.store
const store = new Vuex.Store({
    state, //数据
    mutations, //方法
    getters,
    actions
})

export default store
