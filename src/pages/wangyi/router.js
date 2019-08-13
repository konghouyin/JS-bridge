import Vue from 'vue'
import Router from 'vue-router'
import main from './components/main'
import mine from './components/mine'
import find from './components/find'
import rankingList from './components/rankingList'
import taste from './components/taste'
import songList from './components/songList'
import swiper from './components/swiper.vue'
import moreNewDisks from './components/moreNewDisks'
import lyricsSquare from './components/lyricsSquare.vue'


Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'main',
        redirect:'/find',
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
            path: "taste", //推荐歌曲
            name: "taste",
            component: taste,
        }, {
            path: "rankingList", //排行榜
            name: "rankingList",
            component: rankingList,
        }]
    }, {
        path: '/songList',
        name: 'songList',
        component: songList,
    },{
        path: '/moreNewDisks',
        name: 'moreNewDisks',
        component: moreNewDisks,
    },{
        path: '/lyricsSquare',
        name: 'lyricsSquare',
        component: lyricsSquare,
    }]
})
