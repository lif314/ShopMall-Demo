// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken, removeToken } from '@/utils/token'
import store from '@/store'

// 重写push和replace函数

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
/**
 * @param {*} location 向哪里跳转 
 */
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // call与apply的区别
        originPush.call(this, location, resolve, reject)
    } else {
        // 传入回调函数
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        // call与apply的区别
        originReplace.call(this, location, resolve, reject)
    } else {
        // 传入成功和失败的回调函数
        originReplace.call(this, location, () => { }, () => { })
    }
}


// 使用路由
Vue.use(VueRouter)

// 引入组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Order/Trade'
import Center from '@/pages/Order/Center'
import Pay from '@/pages/Order/Pay'
import PaySuccess from '@/pages/Order/PaySuccess'
// 引入二级路由
import MyOrder from '@/pages/Order/Center/MyOrder'
import GroupOrder from '@/pages/Order/Center/GroupOrder'


/*
- 路由可以传递参数props,是prams参数  
- 配置props:true
- 使用对象
    props:{

    }
*/

const router = new VueRouter({
    // 配置路由
    routes: [
        // 重定向：访问/立马跳转到首页
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: Home,
            meta: {
                isFooterShow: true
            }
        },
        {
            name: 'search', // params传递参数必须使用名字
            path: '/search/:keyword?', // params传递参数需要进行占位, ?表示可传可不传
            // path: '/search', // params传递参数需要进行占位, ?表示可传可不传
            component: Search,
            meta: {
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
        {
            name: 'detail',
            path: '/detail/:skuId',  // params参数，表示商品的id
            component: Detail,
            meta: {
                isFooterShow: true  // 显示Footer组件
            }
        },
        {
            // 添加购物车成功
            name: 'addcartsuccess',
            path: '/addcartsuccess',
            component: AddCartSuccess,
            meta: {
                isFooterShow: true
            }
        },
        {
            // 购物车路由
            name: 'shopcart',
            path: '/shopcart',
            component: ShopCart,
            meta: {
                isFooterShow: true
            }
        },
        {
            // 确认订单
            name: 'trade',
            path: '/trade',
            component: Trade,
            meta: {
                isFooterShow: true,
            },
            // 路由独享守卫: 必须从购物车而来
            beforeEnter:(to, from , next)=>{
                if(from.path =='/shopcart'){
                    next()
                }else{
                    next(false)
                }
            }
        },
        {
            // 提交订单
            name: 'pay',
            path: '/pay',
            component: Pay,
            meta: {
                isFooterShow: true,
            },
            beforeEnter:(to, from ,next)=>{
                // 必须从确认订单页而来
                if(from.path == '/trade'){
                    next()
                }else{
                    next(false)
                }
            }
        },
        {
            // 支付成功页面
            name: 'paysuccess',
            path: '/paysuccess',
            component: PaySuccess,
            meta: {
                isFooterShow: true
            },
            beforeEnter:(to, from ,next)=>{
                // 必须从确认订单页而来
                if(from.path == '/pay'){
                    next()
                }else{
                    next(false)
                }
            }
        },
        {
            // 订单中心
            name: 'center',
            path: '/center',
            redirect: '/center/myorder',
            component: Center,
            children: [
                // 二级路由
                {
                    name: 'myorder',
                    path: 'myorder',  // 要么写全，要么不写/
                    component: MyOrder
                },
                {
                    name: 'grouporder',
                    path: 'grouporder',
                    component: GroupOrder
                }
            ]
        }
    ],
    // 控制路由滚动条信息
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }   // y=0表示滚动条在最上方
    }
})


// 未登录的全局守卫  前置守卫(在路由跳转之间进行判断)
router.beforeEach(async (to, from, next) => {
    // to: 目的路由
    // from：起始路由
    // next()：放行函数  next();   next('/login')   next(false): 中断当前导航
    let token = getToken()
    if (token) {
        // 已经登录，不能再登录和注册了
        if (to.path == '/login' || to.path == '/register') {
            // 用户已经登录，不能去登录页
            next('/home');
        } else {
            // 获取用户信息
            let name = store.state.user.userInfo.phone
            if (name) {
                // 已经有用户信息
                next();
            } else {
                // 没有用户信息
                try {
                    // 全局用户信息控制
                    // 在路由跳转之前获取用户信息
                    await store.dispatch('getUserInfo')
                    // 然后放行
                    next();
                } catch (error) {
                    // token失效  重新登录
                    removeToken() // 也可以走退出登录流程
                    next('/login')
                }
            }
        }

    } else {
        // 没有登录，不能去交易相关的页面[pay | paysuccess] 个人中心
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            next('/login?redirect=' + toPath)
        } else {
            next()
        }
    }
})

export default router;