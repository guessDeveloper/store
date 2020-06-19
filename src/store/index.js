import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        positionX: '', // 经度
        positionY: '', //纬度
        storeInfo: '', //商家信息
        searchItem: '', //搜索页面
        isLogin: false,
        charNum: 0, // 购物车数量
        myCar: {}, //购物车对象
    },
    getters: {

    },
    mutations: {
        addNum(state) {
            state.charNum++
        },
        delNum(state) {
            state.charNum--
        },
        setLogin(state, num) {
            state.isLogin = num
        },
        setPositionX(state, num) {
            state.positionX = num
        },
        setPositionY(state, num) {
            state.positionY = num
        },
        setStoreInfo(state, object) {
            state.storeInfo = object
        },
        carAddStore(state, object) {
            let storeObject = object[0]
            let goodsObject = object[1]
            if (state.myCar[storeObject.id]) {
                if (state.myCar[storeObject.id].goodsList[goodsObject.GoodsId]) {
                    state.myCar[storeObject.id].goodsList[goodsObject.GoodsId].num = state.myCar[storeObject.id][goodsObject.GoodsId].num + goodsObject.num
                } else {
                    state.myCar[storeObject.id].goodsList[goodsObject.GoodsId] = goodsObject
                    state.charNum++
                }
            } else {
                state.myCar[storeObject.id] = {
                    MertchntID: storeObject.id,
                    Mertchntname: storeObject.name,
                    goodsList: {},
                    checked: false
                }
                state.myCar[storeObject.id].goodsList[goodsObject.GoodsId] = goodsObject
                state.charNum++
            }
        }
    },
    actions: {

    },
    modules: {}
})