import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


//state在vuex中存储数据 类似于组件中的data
var state = {
	mainData:{}   //发现首页的数据   
}

//优点类似于计算属性  改变state里面的count数据的时候就会触发getters里面的方法  获取新的值
var getters = {
	// doubleCount() {
	// 	return state.count * 2
	// }
}
// mutations 里面放的是方法，主要用于改变state里面的数据
var mutations = {
	putMain: function() {
        state.mainData=arguments[1]
	}
}

var actions = {
	putMainData: function(context,res) {
		context.commit('putMain',res) //执行mutation里面的addCount方法
	}
}

//实例化 Vuex.store
const store = new Vuex.Store({
	state, //数据
	mutations, //方法
	getters,
	actions
})

export default store