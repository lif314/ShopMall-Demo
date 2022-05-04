// 对axios进行二次封装
import axios from "axios";

// 1、利用axios创建一个axios实例
const requests = axios.create({
    baseURL:"/api",
    timeout: 5000, // 请求超时时间5s
})


// 2、请求拦截器: 检测到需要发出去的请求
requests.interceptors.request.use((config)=>{
    // config配置对象，headers请求头比较重要
    return config
})

// 3、响应拦截器
requests.interceptors.response.use((res)=>{
    // 成功的回调函数
    return res.data; // 直接返回数据
},(error)=>{
    // 失败的回调函数
    return Promise.reject(new Error('faile')); // 终止Promise链
})

export default requests