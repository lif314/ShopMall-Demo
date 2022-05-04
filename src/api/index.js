// API接口统一管理
import requests from "./request";

// 三级分类 /api/product/getBaseCategoryList GET
export const getBaseCategoryList = ()=>{
    return requests({
        // 返回结果是Promise对象
        url:'/product/getBaseCategoryList',
        method: 'get'
    })
}