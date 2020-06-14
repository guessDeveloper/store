import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        positionX: '', // 经度
        positionY: '', //纬度
        storeInfo: '', //商家信息
        searchItem: '', //搜索页面
    },
    getters: {

    },
    mutations: {
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