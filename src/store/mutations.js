/**
 * 直接更新state的多个方法的对象
 */
import Vue from 'vue'
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USERINFO,
    RESERT_USERINFO,
    RECEIVE_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATING,
    INCREMENT_GOOD_COUNT,
    DECREMENT_GOOD_COUNT,
    CLEAR_SHOPCART
} from './mutation-types'
export default {
    [RECEIVE_ADDRESS](state, { address }) {
        state.address = address
    },
    [RECEIVE_CATEGORYS](state, { categorys }) {
        state.categorys = categorys
    },
    [RECEIVE_SHOPS](state, { shops }) {
        state.shops = shops
    },
    [RECEIVE_USERINFO](state, { userInfo }) {
        state.userInfo = userInfo
    },
    [RESERT_USERINFO](state) {
        state.userInfo = {}
    },
    [RECEIVE_INFO](state, { info }) {
        state.info = info
    },
    [RECEIVE_GOODS](state, { goods }) {
        goods.forEach((item, index) => {
            item.id = index
            item.foods.forEach((foodItem, foodIndex) => {
                foodItem.id = (index.toString() + foodIndex.toString()) * 1 + 1
            })
        })
        state.goods = goods
    },
    [RECEIVE_RATING](state, { rating }) {
        state.rating = rating
    },
    [INCREMENT_GOOD_COUNT](state, { good }) {
        state.goods.forEach(item => {
            item.foods.forEach(itemFood => {
                if (itemFood === good) {
                    if (itemFood.count) {
                        itemFood.count++
                    } else {
                        Vue.set(itemFood, 'count', 1)
                            //更新到shopcart
                        itemFood.count = 1
                        state.shopCart.push(itemFood)
                    }
                }
            })
        })
    },
    [DECREMENT_GOOD_COUNT](state, { good }) {
        state.goods.forEach(item => {
            item.foods.forEach(itemFood => {
                if (itemFood === good) {
                    if (itemFood.count) {
                        itemFood.count--
                            if (itemFood.count == 0) {
                                state.shopCart.forEach((item, index) => {
                                    if (item.id === itemFood.id) {
                                        state.shopCart.splice(index, 1)
                                    }
                                })
                            }
                    }
                }
            })
        })
    },
    [CLEAR_SHOPCART](state) {
        state.goods.forEach(item => {
            item.foods.forEach(food => {
                food.count = 0
            })
        })
        state.shopCart = []
    },
}