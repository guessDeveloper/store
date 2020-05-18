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
            }, {
                path: '/proplurRecommend', //人气推荐
                name: 'proplurRecommend',
                component: () =>
                    import ( /* webpackChunkName: "proplurRecommend" */ '../views/home/proplurRecommend.vue')
            }, {
                path: '/preferedRecommend', //优选推荐
                name: 'preferedRecommend',
                component: () =>
                    import ( /* webpackChunkName: "preferred" */ '../views/home/preferred.vue')
            }, {
                path: '/recommendList', //推荐列表
                name: 'recommendList',
                component: () =>
                    import ( /* webpackChunkName: "recommendList" */ '../views/home/recommendList.vue')
            }, {
                path: '/foodList', //美食列表
                name: 'foodList',
                component: () =>
                    import ( /* webpackChunkName: "foodList" */ '../views/home/foodList.vue')
            }, {
                path: '/foodDetail', //美食详情
                name: 'foodDetail',
                component: () =>
                    import ( /* webpackChunkName: "foodDetail" */ '../views/home/foodDetail.vue')
            },
            {
                path: '/goodsDetail', //商品列表
                name: 'goodsDetail',
                component: () =>
                    import ( /* webpackChunkName: "goodsDetail" */ '../views/home/goodsDetail.vue')
            },
        ]
    },
    {
        path: '/persion',
        name: 'persion',
        component: () =>
            import ( /* webpackChunkName: "persion" */ '../views/persion/index.vue'),
        children: [{

                path: '/', //个人信息
                name: 'persionPage',
                component: () =>
                    import ( /* webpackChunkName: "persionPage" */ '../views/persion/persionPage.vue')
            },
            {
                path: '/erweima', //扫二维码
                name: 'erweima',
                component: () =>
                    import ( /* webpackChunkName: "erweima" */ '../views/persion/erweima.vue')
            },
            {
                path: '/safe', //安全设置
                name: 'safe',
                component: () =>
                    import ( /* webpackChunkName: "safe" */ '../views/persion/safe.vue')
            },
            {
                path: '/message', //消息通知
                name: 'message',
                component: () =>
                    import ( /* webpackChunkName: "message" */ '../views/persion/message.vue')
            },
            {
                path: '/invite', //邀请有礼
                name: 'invite',
                component: () =>
                    import ( /* webpackChunkName: "invite" */ '../views/persion/invite.vue')
            }, {
                path: '/myPorints', //我的积分
                name: 'myPorints',
                component: () =>
                    import ( /* webpackChunkName: "myPorints" */ '../views/persion/myPorints.vue')
            },
            {
                path: '/myOrder', //我的订单
                name: 'myOrder',
                component: () =>
                    import ( /* webpackChunkName: "myOrder" */ '../views/persion/myOrder.vue')
            },
            {
                path: '/orderDetail', //订单详情
                name: 'orderDetail',
                component: () =>
                    import ( /* webpackChunkName: "orderDetail" */ '../views/persion/orderDetail.vue')
            },
            {
                path: '/orderGrievance', //订单申诉
                name: 'orderGrievance',
                component: () =>
                    import ( /* webpackChunkName: "orderGrievance" */ '../views/persion/orderGrievance.vue')
            },
        ]
    }, {
        path: '/store',
        name: 'store',
        component: () =>
            import ( /* webpackChunkName: "persion" */ '../views/store/index.vue'),
        children: [{

            path: '/', //商家账号
            name: 'storePage',
            component: () =>
                import ( /* webpackChunkName: "storePage" */ '../views/store/storePage.vue')
        }, {

            path: '/storeErweima', //二维码管理
            name: 'storeErweima',
            component: () =>
                import ( /* webpackChunkName: "storeErweima" */ '../views/store/storeErweima.vue')
        }, {

            path: '/storeProduct', //产品管理
            name: 'storeProduct',
            component: () =>
                import ( /* webpackChunkName: "storeProduct" */ '../views/store/storeProduct.vue')
        }, {

            path: '/storeScore', //积分管理
            name: 'storeScore',
            component: () =>
                import ( /* webpackChunkName: "storeScore" */ '../views/store/storeScore.vue')
        }, {

            path: '/storeOrder', //订单管理
            name: 'storeOrder',
            component: () =>
                import ( /* webpackChunkName: "storeOrder" */ '../views/store/storeOrder.vue')
        }, {

            path: '/storeClassify', //分类管理
            name: 'storeClassify',
            component: () =>
                import ( /* webpackChunkName: "storeClassify" */ '../views/store/storeClassify.vue')
        }, {

            path: '/storeSafe', //安全设置
            name: 'storeSafe',
            component: () =>
                import ( /* webpackChunkName: "storeSafe" */ '../views/store/storeSafe.vue')
        }, {

            path: '/storeReturn', //返积分
            name: 'storeReturn',
            component: () =>
                import ( /* webpackChunkName: "storeReturn" */ '../views/store/storeReturn.vue')
        }, ]
    },
    {
        path: '*',
        name: 'Home',
        component: Home,
        redirect: "/"
    }, {
        path: '/login',
        name: 'login',
        component: () =>
            import ( /* webpackChunkName: "login" */ '../views/login/login.vue')
    }, {
        path: '/register', //注册
        name: 'register',
        component: () =>
            import ( /* webpackChunkName: "register" */ '../views/login/register.vue')
    }, {
        path: '/reset', //忘记密码
        name: 'reset',
        component: () =>
            import ( /* webpackChunkName: "reset" */ '../views/login/reset.vue')
    }, {
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