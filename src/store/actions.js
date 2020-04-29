/**
 * 通过mutation间接更新state的多个方法的对象
 */
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USERINFO,
    RESERT_USERINFO,
    RECEIVE_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATING
} from "./mutation-types";
import { reqAdress, reqFoodsTypes, reqShops, reqGetUserInfo, reqLogOut, reqInfo, reqGoods, reqLoRating } from "../api/index";

export default {
    //异步获取地址
    async getAddress({ commit, state }) {
        // 发送ajax请求
        const geohash = state.latitude + "," + state.longitude;
        const result = await reqAdress(geohash);
        if (result.code === 0) {
            const address = result.data;
            commit(RECEIVE_ADDRESS, { address });
        }
    },
    //异步获取分类
    async getCategorys({ commit }) {
        // 发送ajax请求
        const result = await reqFoodsTypes();
        if (result.code === 0) {
            const categorys = result.data;
            commit(RECEIVE_CATEGORYS, { categorys });
        }
    },
    //异步获取商家
    async getShops({ commit, state }) {
        // 发送ajax请求
        const { latitude, longitude } = state;
        const result = await reqShops(latitude, longitude);
        if (result.code === 0) {
            const shops = result.data;
            commit(RECEIVE_SHOPS, { shops });
        }
    },
    //储存用户信息
    saveUserInfo({ commit }, userInfo) {
        commit(RECEIVE_USERINFO, { userInfo })
    },
    //获取用户信息
    async reqGetUserInfo({ commit }) {
        const result = await reqGetUserInfo();
        if (result.code == 0) {
            const userInfo = result.data;
            commit(RECEIVE_USERINFO, { userInfo })
        }
    },
    async reqLogOut({ commit }) {
        const result = await reqLogOut();
        if (result.code == 0) {
            commit(RESERT_USERINFO)
        }
    },
    async reqShopInfo({ commit }) {
        const result = await reqInfo();
        if (result.code == 0) {
            const info = result.data
            commit(RECEIVE_INFO, { info })
        }
    },
    async reqShopGoods({ commit }, callback) {
        const result = await reqGoods();
        if (result.code == 0) {
            const goods = result.data
            commit(RECEIVE_GOODS, { goods })
            callback && callback()
        }
    },
    async reqShopRatings({ commit }) {
        const result = await reqRating();
        if (result.code == 0) {
            const rating = result.data
            commit(RECEIVE_RATING, { rating })
        }
    },
};