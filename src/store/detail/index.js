// 商品详情仓库


// 引入发送AJAX请求
import { reqGetSkuDetails } from "@/api"

// search模块的仓库

// action: 处理action，可以书写业务逻辑，处理异步
const actions = {
    // 获取商品详情 默认第一个参数是contenxt,需要解析出commit
    async getSkuInfo({commit},skuId){
        let res =  await reqGetSkuDetails(skuId);
        // console.log(res.data)
        if(res.code == 200){
            commit('GET_SKU_INFO', res.data)
        }
    }
}

// mutations: 修改state的唯一手段
const mutations = {
    GET_SKU_INFO(state, skuInfo){
        state.skuDetails = skuInfo
    }
}


// state: 仓库存储数据
const state = {
    skuDetails: {}
}


// getters: 类似计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
// 简化仓库中的数据
const getters = {
    categoryView(state){
        return state.skuDetails.categoryView || {}; // 如果数据没有回来，则是undefined，则应该返回空对象
    },
    skuInfo(state){
        return state.skuDetails.skuInfo || {};
    },
    spuSaleAttrList(state){
        return state.skuDetails.spuSaleAttrList || [];
    }

}

// search模块的仓库信息
export default {
    state,
    mutations,
    actions,
    getters
}
