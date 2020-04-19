import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import './assets/css/reset.css';

import { Dialog, Button } from 'vant';

// 全局注册
Vue.use(Dialog);
Vue.use(Button);

// mock数据
import './mock/mock'

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");