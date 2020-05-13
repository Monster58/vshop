import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home/Home.vue";
// import Order from '../views/Order/Order.vue'
// import Search from '../views/Search/Search.vue'
// import My from "../views/My/My.vue";

// 使用函数方式实现路由懒加载，只有在用到该组件的时候才会执行这个函数（一般用在顶级组件上）
const Home = () =>
    import ("../views/Home/Home.vue")
const Order = () =>
    import ("../views/Order/Order.vue")
const Search = () =>
    import ("../views/Search/Search.vue")
const My = () =>
    import ("../views/My/My.vue")

import Login from '../views/Login/Login.vue'
import Shop from '@v/Shop/Shop.vue'
import ShopGoods from '@v/Shop/ShopGoods/ShopGoods.vue'
import ShopRating from '@v/Shop/ShopRating/ShopRating.vue'
import ShopInfo from '@v/Shop/ShopInfo/ShopInfo.vue'


Vue.use(VueRouter);

const routes = [{
        path: "/",
        redirect: '/home'
    },
    {
        path: "/home",
        name: "home",
        component: Home,
        meta: {
            showFooter: true
        }
    },
    {
        path: "/search",
        name: "search",
        component: Search,
        meta: {
            showFooter: true
        }
    },
    {
        path: "/order",
        name: "order",
        component: Order,
        meta: {
            showFooter: true
        }
    },
    {
        path: "/my",
        name: "my",
        component: My,
        meta: {
            showFooter: true
        }
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            showFooter: false
        }
    },
    {
        path: "/Shop",
        name: "Shop",
        component: Shop,
        children: [{
                path: "",
                redirect: "/Shop/Goods"
            },
            {
                path: "/Shop/Goods",
                name: "ShopGoods",
                component: ShopGoods,
            },
            {
                path: "/Shop/Rating",
                name: "ShopRating",
                component: ShopRating,
            },
            {
                path: "/Shop/Info",
                name: "ShopInfo",
                component: ShopInfo,
            }
        ]
    }

];

const router = new VueRouter({
    routes
});

export default router;