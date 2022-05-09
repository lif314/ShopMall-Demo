// API接口统一管理
import requests from "./request";
import mockRequests from './mockAjax'

// 三级分类 /api/product/getBaseCategoryList GET
export const getBaseCategoryList = () => {
    return requests({
        // 返回结果是Promise对象
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}


// mock获取模拟数据 拦截ajax请求
export const reqGetBannerList = () => mockRequests.get('/banner')

// mock获取模拟数据 拦截ajax请求
export const reqGetFloorList = () => mockRequests.get('/floor')


// 获取搜索模块的数据 /api/list  POST
/*
参数:
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
// params至少是一个空对象
export const reqGetSearchInfo = (params) => requests({
    url: '/list',
    method: 'post',
    data: params
})


// 获取产品详细信息
// /api/item/{ skuId }   GET
export const reqGetSkuDetails = (skuId) => requests({
    url: '/item/' + skuId,
    method: 'get'
})

// 将产品添加到购物车中(获取更新某一产品的个数)
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
})


//获取购物车中列表数据
export const reqCartList = () => requests({
    url: 'cart/cartList',
    method: 'get'
})

// 删除购物车中的商品
// DETELE /api/cart/deleteCart/{skuId}
export const reqDeleteCartBySkuId = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})

// 修改商品的选中状态
// /api/cart/checkCart/{skuId}/{isChecked}  GET
export const reqUpdateCartCheckedById = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})


// 获取验证码
export const reqGetCode = (phone) => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
})

// 提交注册
export const reqUserRegister = (regInfo) => requests({
    url: '/user/passport/register',
    data: regInfo,
    method: 'post'
})

// 登录
export const reqUserLogin = (loginInfo) => requests({
    url: '/user/passport/login',
    data: loginInfo,
    method: 'post'
})


// 使用token获取用户信息
export const reqUserInfo = ()=>requests({
    url: '/user/passport/auth/getUserInfo',
    method:'get'
})

// 退出登录
export const reqLogout = ()=>requests({
    url: '/user/passport/logout',
    method: 'get'
})


// 获取用户地址信息
export const reqAddressInfo = ()=>requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get'
})


// 获取商品清单
export const reqOrderInfo = ()=>requests({
    url: '/order/auth/trade',
    method: 'get'
})
