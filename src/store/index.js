import Vue from "vue";
import Vuex from 'vuex';
Vue.use(Vuex)

// 引入小仓库
import home from './home/index'
import search from './search/index'
import detail from "./detail";
import cart from "./cart";
import user from "./user";
import trade from "./trade";

// vuex模块式开发
export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        cart,
        user,
        trade
    }
})