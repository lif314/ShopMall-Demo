// 用户信息仓库


// 引入发送AJAX请求
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo } from "@/api"
import { setToken, getToken } from '@/utils/token'

// search模块的仓库

// action: 处理action，可以书写业务逻辑，处理异步
const actions = {
    // TODO 让后台处理
    // 获取验证码  -- 异步执行
    async getCode({ commit }, { phone }) {
        let res = await reqGetCode(phone);
        // console.log(res)
        // 如果真有验证码，不用管，让用户自己输入
        if (res.code === 200) {
            commit('GET_CODE', res.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'));
        }
    },
    // 用户注册
    async userRegister({ commit }, regInfo) {
        let res = await reqUserRegister(regInfo);
        console.log(res)
        if (res.code == 200) {
            // 注册成功
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'));
        }
    },
    // 用户登录
    async userLogin({ commit }, loginInfo) {
        let res = await reqUserLogin(loginInfo);
        console.log(res)
        if (res.code == 200) {
            // 返回数据中携带者token和用户信息
            // 一般登录成功，只会返回token，然后携带token向服务器请求数据
            commit('USER_LOGIN', res.data.token)
            // token进行持久化存储
            setToken(res.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    // 获取用户登录信息
    async getUserInfo({ commit }) {
        let res = await reqUserInfo()
        //    console.log(res)
        if (res.code == 200) {
            // 提交用户信息
            commit('USER_INFO', res.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    }
}

// mutations: 修改state的唯一手段
const mutations = {
    GET_CODE(state, code) {
        state.code = code
    },
    USER_LOGIN(state, token) {
        state.token = token
    },
    USER_INFO(state, userInfo) {
        state.userInfo = userInfo
    }
}


// state: 仓库存储数据
const state = {
    code: '',
    token: getToken(),  // 获取token
    userInfo: {}
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
