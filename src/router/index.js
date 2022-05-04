// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用路由
Vue.use(VueRouter)

// 引入组件
import Home from  '@/pages/Home'
import Search from  '@/pages/Search'
import Login from  '@/pages/Login'
import Register from  '@/pages/Register'



export default new VueRouter({
    // 配置路由
    routes:[
        // 重定向：访问/立马跳转到首页
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/search',
            component: Search
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
    ]
})