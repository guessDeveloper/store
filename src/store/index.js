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
        }
    },
    actions: {

    },
    modules: {}
})