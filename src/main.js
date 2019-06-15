// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import axios from 'axios'
import Navigation from 'vue-navigation'
// import { GetUserInfo, GetUserStatus } from './store/modules/user'
import echarts from 'echarts'
import { ToastPlugin, ConfirmPlugin } from 'vux'
import { nickname, updateExtInfo } from 'api/user'
import animate from 'animate.css'
import { fs } from 'utils/auto'

import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'

// import axios from 'axios'
// import apiConfig from '../config/api.config'

import 'assets/styles/font-awesome.min.css'
import 'assets/styles/global.scss'
import 'swiper/dist/css/swiper.min.css'

axios.defaults.baseURL = process.env.API_ROOT
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$fs = fs
// axios.defaults.baseURL = apiConfig.baseUrl
Vue.use(Navigation, {router, store})
Vue.use(animate)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(VueVideoPlayer)

const whiteList = [] // 不重定向白名单
router.beforeEach((to, from, next) => {
  if (store.getters.modal) {
    next(false)
    store.state.modal = false
    app.$vux.confirm.hide()
    return
  }
  if (store.getters.token && store.getters.token !== 'undefined') { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.role === null || store.getters.role === '') {
        store.dispatch('GetUserInfo').then(res => { // 获取用户信息
          if (!res.data.data.info.ext_info.name) {
            return nickname()
          }
        }).then(res => {
          if (res && res.data.err_code === 0) {
            return updateExtInfo(store.getters.uuid, store.getters.token, {name: res.data.nickname})
          }
        }).then(res => {
          if (res && res.err_code === 0) {
            return store.dispatch('GetUserInfo')
          }
        })
      } else {
        store.dispatch('GetUserStatus').then(res => {})
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) === -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
    }
  }
})

/* eslint-disable no-new */
export const app = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
