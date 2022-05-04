// home模块的仓库

import { getBaseCategoryList, reqGetBannerList} from "@/api"

// action: 处理action，可以书写业务逻辑，处理异步
const actions = {
    // 通过API里面的函数调用，向服务器发送请求，获取三级分类的数据
    async categoryList({commit}){   // context解构出commit:  context.commit
        let res =  await getBaseCategoryList();
        // console.log(res)
        if(res.code == 200){
            commit('CATEGORY_LIST', res.data);
        }
    },
    // 获取轮播图数据
   async getBannerList({commit}){
        let res = await reqGetBannerList();
        // console.log(res)
        commit('BANNER_LIST', res.data)
    }
}

// mutations: 修改state的唯一手段
const mutations = {
    // 三级分类
    CATEGORY_LIST(state, categoryList){
        state.categoryList = categoryList
    },
    // 轮播图
    BANNER_LIST(state, bannerList){
        state.bannerList = bannerList
    }
}

// getters: 类似计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {

}



// state: 仓库存储数据
const state = {
    categoryList: [],
    bannerList: []
}


export default{
    state,
    mutations,
    actions,
    getters
}
