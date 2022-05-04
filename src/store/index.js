import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex)


// state: 仓库存储数据
const state = {

}

// mutations: 修改state的唯一手段
const mutations = {

}

// action: 处理action，可以书写业务逻辑，处理异步
const actions = {

}

// getters: 类似计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {

}


// 对外暴露Store类的一个实例
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
