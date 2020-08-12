import Axios from 'axios'
import qs from 'qs'
import router from '../../router'
import store from '../../store/index'
Axios.defaults.withCredentials = true;
const baseUrl = process.env.NODE_ENV === 'production' ? 'https://api.youledui.com/' : '/Sev'
// const baseUrl = process.env.NODE_ENV === 'production' ? 'https://api1.youledui.com/' : '/Sev'
const baseData = {
        // timestamp: parseInt((+new Date()) / 1000),
        // platform: '3',
        // channel: 'jiankang_toutiao'
    }
    // 设置拦截
const instance = Axios.create({
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': localStorage.getItem('token') ? localStorage.getItem('token') : ''
    }
})
const newInstance = Axios.create({
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': localStorage.getItem('token') ? localStorage.getItem('token') : ''
    }
})
const storeInstance = Axios.create({
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': localStorage.getItem('storeToken') ? localStorage.getItem('storeToken') : ''
    }
})
instance.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    store.commit('isLogin', false)

                    // location.reload()
            }
        }
        return Promise.reject(error.response.data) // 返回接口返回的错误信息
    })
newInstance.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    store.commit('isLogin', false)
                    router.replace({
                            path: '/login'
                        })
                        // location.reload()
            }
        }
        return Promise.reject(error.response.data) // 返回接口返回的错误信息
    })
storeInstance.interceptors.response.use(
        response => {
            return response
        },
        error => {
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        // 返回 401 清除token信息并跳转到登录页面
                        store.commit('isLogin', false)
                        router.replace({
                                path: '/login'
                            })
                            // location.reload()
                }
            }
            return Promise.reject(error.response.data) // 返回接口返回的错误信息
        })
    // 请求拦截
    // instance.interceptors.request.use(
    //     config => {
    //       const token = sessionStorage.getItem('token')
    //       if (token ) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    //         config.headers.authorization = token  //请求头加上token
    //       }
    //       return config
    //     },
    //     err => {
    //       return Promise.reject(err)
    //     })
    // instance.interceptors.response.use(
    //     response => {
    //         // 拦截响应，做统一处理
    //         if (response.data.code) {
    //             // switch (response.data.code) {
    //             //     case 1002:

//             // }
//             if (response.data.code == 1) {
//                 return response
//             } else {
//                 PinganHealth.toast(response.data.msg)
//             }
//         } else {
//             PinganHealth.toast('网络错误')
//         }
//     },
//     // 接口错误状态处理，也就是说无响应时的处理
//     error => {
//         PinganHealth.toast('网络错误') // 返回接口返回的错误信息
//     })

export default {
    get(url, parame) {
        const data = JSON.parse(JSON.stringify(baseData))
        return instance.get(baseUrl + url, {
            params: Object.assign(data, parame),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'token': localStorage.getItem('token') ? localStorage.getItem('token') : ''
            }
        })
    },
    post(url, parame) {
        let data = JSON.parse(JSON.stringify(baseData))
        data = Object.assign(data, parame)
        return instance({
            url: baseUrl + url,
            method: 'post',
            data: qs.stringify(data),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'token': localStorage.getItem('token') ? localStorage.getItem('token') : ''
            }
        })
    },
    limitPost(url, parame) {
        return newInstance({
            url: baseUrl + url,
            method: 'post',
            data: qs.stringify(parame),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'token': localStorage.getItem('token') ? localStorage.getItem('token') : ''
            }
        })
    },
    limitGet(url, parame) {
        // return newInstance({
        //     url: baseUrl + url,
        //     method: 'get',
        //     data: qs.stringify(parame),
        //     headers: {
        //         'content-type': 'application/x-www-form-urlencoded',
        //         'token': localStorage.getItem('token') ? localStorage.getItem('token') : ''
        //     }
        // })
        const data = JSON.parse(JSON.stringify(baseData))
        return newInstance.get(baseUrl + url, {
            params: Object.assign(data, parame),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'token': localStorage.getItem('token') ? localStorage.getItem('token') : ''
            }
        })
    },
    storeGet(url, parame) {
        return storeInstance({
            url: baseUrl + url,
            method: 'get',
            data: qs.stringify(parame),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'token': localStorage.getItem('storeToken') ? localStorage.getItem('storeToken') : ''
            }
        })
    },
    storePost(url, parame) {
        return storeInstance({
            url: baseUrl + url,
            method: 'post',
            data: qs.stringify(parame),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'token': localStorage.getItem('storeToken') ? localStorage.getItem('storeToken') : ''
            }
        })
    },

    // postJsons(url, parame) {
    //     let data = JSON.parse(JSON.stringify(baseData))
    //     data = Object.assign(data, parame)
    //      return Axios({
    //         url: baseUrl + url,
    //         method: 'post',
    //         data: JSON.stringify(data),
    //         headers: { 'Content-Type': 'application/json'}
    //     })
    // },

    // postJson(url, parame) {
    //     let data = JSON.parse(JSON.stringify(baseData))
    //     data = Object.assign(data, parame)
    //      return instance({
    //         url: baseUrl + url,
    //         method: 'post',
    //         data: JSON.stringify(data),
    //         headers: { 'Content-Type': 'application/json'}
    //     })
    // }

}