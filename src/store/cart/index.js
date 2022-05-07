// 商品详情仓库


// 引入发送AJAX请求
import { reqCartList, reqDeleteCartBySkuId, reqUpdateCartCheckedById } from "@/api"

// search模块的仓库

// action: 处理action，可以书写业务逻辑，处理异步
const actions = {
    async getCartList({ commit }) {
        let res = await reqCartList();
        // console.log(res)  // 没有数据呜呜呜
        if (res.code == 200) {
            commit('CART_LIST', res.data)
        }
    },
    // 删除购物车中商品
    async deleteCartListBySkuId({ commit }, { skuId }) {
        let res = await reqDeleteCartBySkuId(skuId);
        if (res.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    // 更新购物车中商品状态
    async updateCartStatus({ commit }, { skuId, isChecked }) {
        let res = await reqUpdateCartCheckedById(skuId, isChecked);
        // console.log(res)
        if (res.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    // 删除选中的所有商品
    deleteAllCheckedCart({ dispatch, getters }) {
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(element => {
            if (element.isChecked === 1) {
                // Promise([p1, p2,p3])
                let res = dispatch('deleteCartListBySkuId', { skuId: element.skuId })
                promiseAll.push(res);
            }
        });
        return Promise.all(promiseAll)
    },
    //全选操作
    updateAllChecked({ dispatch, getters }, { isChecked }) {
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(element => {
            // if (element.isChecked === 0) {
            // Promise([p1, p2,p3])
            let res = dispatch('updateCartStatus', { skuId: element.skuId, isChecked })
            promiseAll.push(res);
            // }
        });
        return Promise.all(promiseAll)
    }
}

// mutations: 修改state的唯一手段
const mutations = {
    CART_LIST(state, data) {
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
    cartList(state) {
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
