/**
 * 包含n个接口请求函数的模块
 * 函数的返回值： promise对象
 */
import ajax from './ajax.js'
const BASE_URL = '/api'

// 1、根据经纬度获取位置详情
export const reqAdress = (geohash) => ajax(`/address/${geohash}`)//${BASE_URL}/position/${geohash}
    // 2、获取食品分类列表
export const reqFoodsTypes = () => ajax(`/index_category`)
    // 3、根据经纬度获取商铺列表
export const reqShops = (latitude, longitude) => ajax(`/shops`, { latitude, longitude })//${BASE_URL}/shops
    // 4、根据经纬度和关键字搜索商铺列表
export const reqKeyWordsShops = (geohash, keyword) => ajax(`${BASE_URL}/search_shops`, { geohash, keyword })
    // 5、获取一次性验证码
export const reqCaptcha = () => ajax(`${BASE_URL}/captcha`)
    // 6、用户名密码登陆
export const reqPwdLogin = (data) => ajax(`${BASE_URL}/login_pwd`, data, 'POST')
    // 7、发送短信验证码
export const reqSendCode = (phone) => ajax(`${BASE_URL}/sendcode`, phone)
    // 8、手机号验证码登陆
export const reqCodeLoing = (data) => ajax(`${BASE_URL}/login_sms`, data, 'POST')
    // 9、根据会话获取用户信息
export const reqGetUserInfo = () => ajax(`${BASE_URL}/userinfo`)
    // 10、用户登出
export const reqLogOut = () => ajax(`${BASE_URL}/logout`)
    // 11、请求店铺信息
export const reqInfo = () => ajax('/info')
    // 10、请求店铺商品
export const reqGoods = () => ajax('/goods')
    // 10、请求店铺评价
export const reqRating = () => ajax(`/rating`)