import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import './assets/css/reset.css';
import './filter/index'

import { Dialog, Button, Toast } from 'vant';
import VueLazyLoad from 'vue-lazyload'

// 全局注册

Vue.use(VueLazyLoad, {
    // preLoad: 1.3, //预载高度比例
    error: './static/images/error.png',
    loading: './static/images/timg.gif',
    // attempt: 1 //尝试次数
})

Vue.use(Dialog);
Vue.use(Button);
Vue.use(Toast);

// mock数据
import './mock/mock'

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");