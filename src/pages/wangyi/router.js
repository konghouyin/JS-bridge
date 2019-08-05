import Vue from 'vue'
import Router from 'vue-router'
import main from './components/main'
import mine from './components/mine'
import find from './components/find'
import rankingList from './components/rankingList'
import songList from './components/songList'
import swiper from './components/swiper.vue'


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'main',
            component: main,
            children: [{
                path: "mine", //我的
                name: "mine",
                component: mine,
            }, {
                path: "find", //歌单
                name: "find",
                component: find,
            }, {
                path: "rankingList", //排行榜
                name: "rankingList",
                component: rankingList,
            }]
        }, {
            path: '/songList',
            name: 'songList',
            component: songList,
        }
    ]
})
