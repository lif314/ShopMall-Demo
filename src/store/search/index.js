// 引入发送AJAX请求
import { reqGetSearchInfo } from "@/api"

// search模块的仓库

// action: 处理action，可以书写业务逻辑，处理异步
const actions = {
    // 获取搜索模块的数据
    async getSearchList({ commit }, params = {}) {
        // params至少是一个空对象
        let res = await reqGetSearchInfo(params);
        // console.log(res.data)
        if (res.code == 200) {
            commit('GET_SEARCH_LIST', res.data)
        }
    }

}

// mutations: 修改state的唯一手段
const mutations = {
    GET_SEARCH_LIST(state, info) {
        state.searchList = info;
    }

}


// state: 仓库存储数据
const state = {
    searchList: {}
}


// getters: 类似计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
// 简化仓库中的数据
const getters = {
    // 当前仓库的state
    attrsList(state) {
        return state.searchList.attrsList || [];
    },
    goodsList() {
        return state.searchList.goodsList || [];
    },
    pageInfo(state){
        return {
            pageNo: state.searchList.pageNo,  // 当前第几页
            pageSize: state.searchList.pageSize, 
            total: state.searchList.total,
            totalPages: state.searchList.totalPages
        }
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    }
}

// search模块的仓库信息
export default {
    state,
    mutations,
    actions,
    getters
}
