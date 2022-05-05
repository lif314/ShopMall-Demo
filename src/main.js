import Vue from 'vue'
import App from './App.vue'
// 将三级分类注册为全局组件
import TypeNav from './components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
// 将轮播图注册为全局组件
import Carousel from './components/Carousel'
Vue.component(Carousel.name, Carousel)
// 将分页器注册为全局组件
import Pagination from './components/Pagination'
Vue.component(Pagination.name, Pagination)

// 引入路由
import router from '@/router'
//引入MockServer.js----mock数据
import "@/mock/mockServe";
// 引入Swiper 轮播图
import 'swiper/css/swiper.css';

// 使用vuex
import store from '@/store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router:router, // 注册路由
  store,   //注册仓库  $store
  beforeCreate(){
    // 配置全局事件总线
    Vue.prototype.$bus = this;
  }
}).$mount('#app')
