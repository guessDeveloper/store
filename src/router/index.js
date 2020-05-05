import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        children: [{
            path: '/', //首页
            name: 'index',
            component: () =>
                import ( /* webpackChunkName: "index" */ '../views/home/index.vue')
        }, {
            path: '/food', //美食广场
            name: 'food',
            component: () =>
                import ( /* webpackChunkName: "food" */ '../views/home/food.vue')
        }, {
            path: '/taobao', //淘宝
            name: 'taobao',
            component: () =>
                import ( /* webpackChunkName: "taobao" */ '../views/home/taobao.vue')
        }, {
            path: '/goodsList', //商品列表
            name: 'goodsList',
            component: () =>
                import ( /* webpackChunkName: "goodsList" */ '../views/home/goodsList.vue')
        }, {
            path: '/commentList', //评论列表
            name: 'commentList',
            component: () =>
                import ( /* webpackChunkName: "commentList" */ '../views/home/commentList.vue')
        }, {
            path: '/storeList', //商城返利
            name: 'storeList',
            component: () =>
                import ( /* webpackChunkName: "storeList" */ '../views/home/storeList.vue')
        }, {
            path: '/shop', //逛街购物
            name: 'shop',
            component: () =>
                import ( /* webpackChunkName: "shop" */ '../views/home/shop.vue')
        }, ]
    },
    {
        path: '*',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ( /* webpackChunkName: "login" */ '../views/login/login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ( /* webpackChunkName: "register" */ '../views/login/register.vue')
    },
    {
        path: '/sao',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    // ...
    if (to.meta.title) {
        document.title = to.meta.title
    }
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    next()
})

export default router