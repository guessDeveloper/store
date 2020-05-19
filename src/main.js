import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $http from './assets/js/https'
import './plugins/element.js'
import $api from './assets/js/api'
Vue.config.productionTip = false
Vue.prototype.$http = $http
Vue.prototype.$api = $api
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')