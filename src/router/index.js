import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
Vue.use(Router)

let routes = [
    {
        path: '/',
        name: 'index',
        component: resolve => require(['../pages/index.vue'], resolve),
        meta:{
            title: '首页'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: resolve => require(['../pages/login/login.vue'], resolve),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/common',
        name: 'common',
        component: resolve => require(['../pages/common.vue'], resolve),
        meta: {
            title: '不需要登录也可以访问'
        }
    },
]

const router = new Router({
    mode: 'hash',
    routes: routes
})

function needLogin(route){
    let noNeed = [
        '/common',
        '/login'
    ]
    for(let i = noNeed.length - 1; i >= 0; i--){
        if (route.path === noNeed[i]) {
            return false;
        }
    }
    return true
}

router.beforeEach((to, from, next) => {
    document.title = to.meta && to.meta.title || '自定义构建项目'
    let need =needLogin(to)

    if(need && !store.getters.userInfo){
        router.push({
            name: 'login'
        });
        return
    }
    next()
})

export default router