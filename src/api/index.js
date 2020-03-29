/**
 * 包含n个接口请求函数的模块
 * 函数的返回值： promise对象
 */
import ajax from './ajax.js'

// 1、根据经纬度获取位置详情
export const reqAdress = (geohash) => ajax(`/api/position/${geohash}`)
    // 2、获取食品分类列表
export const reqFoodsTypes = () => ajax(`/api/index_category`)
    // 3、根据经纬度获取商铺列表
export const reqShops = (latitude, longitude) => ajax(`/api/shops`, { latitude, longitude })
    // 4、根据经纬度和关键字搜索商铺列表
export const reqKeyWordsShops = (geohash, keyword) => ajax(`/search_shops`, { geohash, keyword })
    // 5、获取一次性验证码
export const reqCaptcha = () => ajax('api/captcha')
    // 6、用户名密码登陆
export const reqPwdLogin = (data) => ajax('api/login_pwd', data, 'POST')
    // 7、发送短信验证码
export const reqSendCode = (phone) => ajax(`api/sendcode`, phone)
    // 8、手机号验证码登陆
export const reqCodeLoing = (data) => ajax('api/login_sms', data, 'POST')
    // 9、根据会话获取用户信息
export const reqGetUserInfo = () => ajax('api/userinfo')
    // 10、用户登出
export const reqLogOut = () => ajax('api/logout')