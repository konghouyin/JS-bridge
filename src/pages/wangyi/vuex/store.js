import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


//state在vuex中存储数据 类似于组件中的data
var state = {
    mainMessage: {
        swiper: [],
        playList: [],
        album: []
    },
    topAllList: [],

     // playNow: {
    //     pic: "",
    //     url: "",
    //     name: "",
    //     albun: "",
    //     singer: "",
    //     link: "",
    //     backgroundColor:""
    // },
    // playStyle:{
    //     playStatus: false,
    //     playDuration:0,
    //     now:0,
    //     num:0,
    //     playType:1
    // },
    playList: [{
        name: 'Remember (Original Mix)',
        singer: 'Sensitive ',
        album: 'Remember',
        link: 'https://music.163.com/#/song?id=27644359'
    }]

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
