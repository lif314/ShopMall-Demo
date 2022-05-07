// 用户信息仓库


// 引入发送AJAX请求
import { reqGetCode, reqUserRegister } from "@/api"

// search模块的仓库

// action: 处理action，可以书写业务逻辑，处理异步
const actions = {
    // TODO 让后台处理
    // 获取验证码  -- 异步执行
    async getCode({commit}, {phone}){
        let res = await reqGetCode(phone);
        // console.log(res)
        // 如果真有验证码，不用管，让用户自己输入
        if(res.code === 200){
            commit('GET_CODE', res.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'));
        }
    },
    // 用户注册
    async userRegister({commit}, regInfo){
        let res = await reqUserRegister(regInfo);
        console.log(res)
        if(res.code == 200){
            // 注册成功
            return 'ok';
        }else{
            return Promise.reject(new Error('failed'));
        }
    }
    
}

// mutations: 修改state的唯一手段
const mutations = {
    GET_CODE(state, code){
        state.code = code
    }
}


// state: 仓库存储数据
const state = {
    code: ''
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
