import { createRouter, createWebHashHistory, RouteRecordRaw, } from 'vue-router'
import store from '@/store/index'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import('@/views/Home/Home.vue'),
        name: 'Home',
        meta: {
            title: '首页'
        },
        children: [
            {
                path: 'news/:id',
                component: () => import('@/views/Home/News.vue'),
                name: 'News',
                meta: {
                    title: '首页'
                },
            }
        ]
    },
    {
        path: '/live',
        component: () => import('@/views/Live/Live.vue'),
        name: 'Live',
        meta: {
            title: '直播'
        }
    },
    {
        path: '/match',
        component: () => import('@/views/Match/Match.vue'),
        name: 'Match',
        meta: {
            title: '比赛'
        },
        children: [
            {
                path: 'type/:id',
                component: () => import('@/views/Match/MatchList.vue'),
                name: 'MatchList',
                meta: {
                    title: '比赛'
                }
            }
        ]
    },
    {
        path: '/data',
        component: () => import('@/views/Data/Data.vue'),
        name: 'Data',
        meta: {
            title: '数据'
        }
    },
    {
        path: '/article/:id',
        component: () => import('@/views/Home/Article.vue'),
        name: 'Article',
        meta: {
            title: '首页'
        } 
    },
    {
        path: '/matchdetails/:id',
        component: () => import('@/views/Match/MatchDetails.vue'),
        name: 'MatchDetails',
        meta: {
            title: '比赛'
        } 
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

router.afterEach((to, from) => {
    let title: string = <string>to.meta.title;
    document.title = title;
    store.dispatch('setActive', title);
})

export default router;