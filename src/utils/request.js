import axios from 'axios'
import store from '../store/index'
import router from '../router/index'
import {
  app
} from '@/main.js'
// import qs from 'qs'
// import { getToken } from 'utils/auto'

/* 创建axios实例 */
const service = axios.create({
  baseURL: process.env.API_ROOT, // api的base_url
  timeout: 5000 // 请求超时时间
})

// http request 请求拦截器，有token值则配置上token值
service.interceptors.request.use(
  config => {
    if (store.getters.token) { // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
      config.headers.Authorization = `token ${store.state.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
service.interceptors.response.use(
  response => {
    if (response.data.ret === 200) {
      return response
    } else {
      console.log(response)
      app.$vux.toast.show({
        type: 'warn',
        text: response.data.msg,
        position: 'middle'
      })
      switch (response.data.ret) {
        case 401:
          // 这里写清除token的代码
          store.state.user.token = ''
          localStorage.removeItem('currentUser_token')
          store.state.user.role = ''
          localStorage.removeItem('currentUser_role')
          app.$navigation.cleanRoutes()
          router.replace({
            path: 'login',
            query: {
              redirect: router.currentRoute.fullPath
            } // 登录成功后跳入浏览的当前页面
          })
          break
      }
    }
  },
  error => {
    if (error.response) {
      app.$vux.toast.show({
        type: 'warn',
        text: '非法请求，参数错误',
        position: 'middle'
      })
      switch (error.response.status) {
        case 401:
          // 这里写清除token的代码
          store.state.user.token = ''
          localStorage.removeItem('currentUser_token')
          store.state.user.role = ''
          localStorage.removeItem('currentUser_role')
          router.replace({
            path: 'login',
            query: {
              redirect: router.currentRoute.fullPath
            } // 登录成功后跳入浏览的当前页面
          })
          break
      }
    }
    return Promise.reject(error.response.data)
  }
)

export default service
