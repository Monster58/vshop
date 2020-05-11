/**
 * 基于state的getter计算属性的对象
 */
export default {
    shopCartCount: state => {
        let num = 0
        state.shopCart.forEach(item => {
            num += item.count
        })
        return num
    },
    shopCartPrice: state => {
        let num = 0
        state.shopCart.forEach(item => {
            num += item.price * item.count
        })
        return num
    },
    satisfiedRating: state => {
        let num = 0;

        Array.prototype.forEach.call(state.rating, (item) => {
            if (item.rateType == 0) {
                num++;
            }
        })
        return num;
    },
    noSatisfiedRating: state => {
        let num = 0;
        Array.prototype.forEach.call(state.rating, (item) => {
            if (item.rateType != 0) {
                num++;
            }
        })
        return num;
    }
}