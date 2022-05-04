import Vue from "vue";
import Vuex from 'vuex';
Vue.use(Vuex)

// 引入小仓库
import home from './home/index'
import search from './search/index'

// vuex模块式开发
export default new Vuex.Store({
    modules:{
        home,
        search
    }
})