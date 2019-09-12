import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// state在vuex中存储数据 类似于组件中的data
var state = {
    mainMessage: {
        swiper: [],
        playList: [],
        album: []
    },
    topAllList: [],
    playNow: {
        pic: '',
        url: '',
        name: '',
        album: '',
        singer: '',
        link: '',
        backgroundColor: ''
    },
    playStyle: {
        playStatus: false,
        playDuration: 0,
        now: 0,
        num: 0,
        playType: 1 // 1列表  2随机  3单曲  4.列表单次循环
    },
    playList: []
}

// 优点类似于计算属性  改变state里面的count数据的时候就会触发getters里面的方法  获取新的值
var getters = {
    // getMainMessage() {
    //        console.log(Object.keys(state),state.mainMessage)
    // 	return state.mainMessage
    // }
}
// mutations 里面放的是方法，主要用于改变state里面的数据
var mutations = {
    setData: function(context, msg) {
            let list = Object.keys(msg)
            list.forEach(item => {
                if (Object.prototype.toString.call(msg[item]) == '[object Array]'){
                    state[item] = [].concat(msg[item])
                } else {
                    state[item] = Object.assign({}, msg[item])
                }
            })
    },
    addPlayList: function(content, msg) { // 添加到正在播放歌曲的后面，并设置为正在播放
        state.playList.splice(parseInt(state.playStyle.num), 0, msg)
        state.playStyle.num = parseInt(state.playStyle.num) + 1 + Math.random()
        localStorage.setItem('playList', JSON.stringify(state.playList))
    },
    nextPlaySong: function(content, msg) { // 添加到正在播放歌曲的后面，并设置为正在播放
        state.playList.splice(parseInt(state.playStyle.num), 0, msg)
    }

}

var actions = {

}

// 实例化 Vuex.store
const store = new Vuex.Store({
    state, // 数据
    mutations, // 方法
    getters,
    actions
})

export default store
