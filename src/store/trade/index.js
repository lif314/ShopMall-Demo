// 交易流程仓库
// 引入发送AJAX请求
import { reqAddressInfo, reqOrderInfo } from "@/api"


// action: 处理action，可以书写业务逻辑，处理异步
const actions = {
    //  收货人地址信息
    async getUserAddress({commit}){
        let res =  await reqAddressInfo()
        // console.log(res)
        if(res.code == 200){
            commit('USER_ADDRESS', res.data)
        }
   },
   // 订单商品信息
   async getOrderInfo({commit}){
        let res = await reqOrderInfo();
        // console.log(res)
        if(res.code == 200){
            commit('ORDER_INFO', res.data)
        }
    },
    // // 提交订单
    // async submitOrder({commit}, tradeNo, data){
    //     let res = await reqSubmitOrder(tradeNo, data);
    //     console.log(res)
    // }

}

// mutations: 修改state的唯一手段
const mutations = {
    USER_ADDRESS(state, data){
        state.userAddressList = data
    },
    ORDER_INFO(state, data){
        state.orderInfo = data
    }
}


// state: 仓库存储数据
const state = {
    userAddressList: [],
    orderInfo: {}
}


// getters: 类似计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
// 简化仓库中的数据
const getters = {
    

}

// search模块的仓库信息
export default {
    state,
    mutations,
    actions,
    getters
}
