// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'

// 重写push和replace函数

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
/**
 * @param {*} location 向哪里跳转 
 */
VueRouter.prototype.push = function(location, resolve, reject){
    if(resolve && reject){
        // call与apply的区别
        originPush.call(this, location, resolve, reject)
    }else{
        // 传入回调函数
        originPush.call(this, location, ()=>{}, ()=>{})
    }
}
VueRouter.prototype.replace = function(location, resolve, reject){
    if(resolve && reject){
        // call与apply的区别
        originReplace.call(this, location, resolve, reject)
    }else{
        // 传入成功和失败的回调函数
        originReplace.call(this, location, ()=>{}, ()=>{})
    }
}




// 使用路由
Vue.use(VueRouter)

// 引入组件
import Home from  '@/pages/Home'
import Search from  '@/pages/Search'
import Login from  '@/pages/Login'
import Register from  '@/pages/Register'


/*
- 路由可以传递参数props,是prams参数  
- 配置props:true
- 使用对象
    props:{

    }
*/

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
            component: Home,
            meta:{
                isFooterShow: true
            }
        },
        {
            // name: 'Search', // params传递参数必须使用名字
            // path: '/search/:keyword?', // params传递参数需要进行占位, ?表示可传可不传
            path: '/search', // params传递参数需要进行占位, ?表示可传可不传
            component: Search,
            meta:{
                isFooterShow: true  // 显示Footer组件
            }
        },
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/register',
            component: Register
        },
    ]
})