// 对axios进行二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// 引入样式 可以自己更改样式
import "nprogress/nprogress.css";
// 引入数据仓库
import store from '@/store'

// 1、利用axios创建一个axios实例
const requests = axios.create({
    baseURL:"/api",
    timeout: 5000, // 请求超时时间5s
})


// 2、请求拦截器: 检测到需要发出去的请求
requests.interceptors.request.use((config)=>{
    // config配置对象，headers请求头比较重要
    // 启动nprocess进度条
    nprogress.start()
    // 在请求头中设置UUID_TOKEN
    if(store.state.detail.uuid_token){
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 在请求中添加token
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    return config
})

// 3、响应拦截器
requests.interceptors.response.use((res)=>{
    // 成功的回调函数
    // nprocess进度条结束
    nprogress.done()
    return res.data; // 直接返回数据
},(error)=>{
    // 失败的回调函数
    return Promise.reject(new Error('faile')); // 终止Promise链
})

export default requests