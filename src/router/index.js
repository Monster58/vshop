import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home/Home.vue";
import Order from '../views/Order/Order.vue'
import Search from '../views/Search/Search.vue'
import My from "../views/Home/Home.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        redirect: '/home'
    },
    {
        path: "/home",
        name: "home",
        component: Home
    },
    {
        path: "/search",
        name: "search",
        component: Search
    },
    {
        path: "/order",
        name: "order",
        component: Order
    },
    {
        path: "/my",
        name: "my",
        component: My
    },

];

const router = new VueRouter({
    routes
});

export default router;