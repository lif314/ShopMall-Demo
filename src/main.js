import Vue from 'vue'
import App from './App.vue'
// 将三级分类注册为全局组件
import TypeNav from './components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
// 引入路由
import router from '@/router'

// 测试
// import {getBaseCategoryList} from '@/api/index'

// console.log(getBaseCategoryList())

// 使用vuex
import store from '@/store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router:router, // 注册路由
  store   //注册仓库  $store
}).$mount('#app')
