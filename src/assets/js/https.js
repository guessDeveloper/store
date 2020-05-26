import Axios from 'axios'
import qs from 'qs'
const baseUrl = process.env.NODE_ENV === 'production' ? 'http://api.youledui.com/' : '/Sev'
const baseData = {
        // timestamp: parseInt((+new Date()) / 1000),
        // platform: '3',
        // channel: 'jiankang_toutiao'
    }
    // 设置拦截
const instance = Axios.create({
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
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
            params: Object.assign(data, parame)
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
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    },
    outPost(url, parame) {
        return Axios({
            url: url,
            method: 'post',
            data: qs.stringify(parame),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
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