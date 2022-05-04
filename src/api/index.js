// API接口统一管理
import requests from "./request";
import mockRequests from './mockAjax'

// 三级分类 /api/product/getBaseCategoryList GET
export const getBaseCategoryList = ()=>{
    return requests({
        // 返回结果是Promise对象
        url:'/product/getBaseCategoryList',
        method: 'get'
    })
}


// mock获取模拟数据 拦截ajax请求
export const reqGetBannerList = ()=>mockRequests.get('/banner')

// mock获取模拟数据 拦截ajax请求
export const reqGetFloorList = ()=>mockRequests.get('/floor')