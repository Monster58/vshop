/**
 * 通过mutation间接更新state的多个方法的对象
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from "./mutation-types";
import { reqAdress, reqFoodsTypes, reqShops } from "../api/index";

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
  }
};
