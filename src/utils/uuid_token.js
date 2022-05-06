// 游客临时身份认证
import { v4 as uuidv4 } from "uuid";

// 生成一个随机字符串，且每次只能不能发生变化
export const getUUID = ()=>{
    // 先查询贝蒂存储是否存在token
    let uuid_token = localStorage.getItem('UUID_TOKEN')
    if(!uuid_token){
        // 生成一个并存储
        uuid_token = uuidv4();
        localStorage.setItem('UUID_TOKEN', uuid_token)
    }
    return  uuid_token;
}