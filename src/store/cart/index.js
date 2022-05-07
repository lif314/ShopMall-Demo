// 商品详情仓库


// 引入发送AJAX请求
import { reqCartList, reqDeleteCartBySkuId} from "@/api"

// search模块的仓库

// action: 处理action，可以书写业务逻辑，处理异步
const actions = {
    async getCartList({commit}){
        let res = await reqCartList();
        // console.log(res)  // 没有数据呜呜呜
        if(res.code == 200){
            commit('CART_LIST', res.data)
        }
    },
    // 删除购物车中商品
    async deleteCartListBySkuId({commit}, {skuId}){
        let res = await reqDeleteCartBySkuId(skuId);
        if(res.code == 200){
            return 'ok';
        }else{
            return Promise.reject(new Error('failed'))
        }
    }

}

// mutations: 修改state的唯一手段
const mutations = {
   CART_LIST(state, data){
        state.cartList = data
   }
}


// state: 仓库存储数据
const state = {
    cartList: []
}


// getters: 类似计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
// 简化仓库中的数据
const getters = {
    cartList(state){
        return state.cartList[0] || {}
    }

}

// search模块的仓库信息
export default {
    state,
    mutations,
    actions,
    getters
}
