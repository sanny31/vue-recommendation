// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'
import App from './App'
import { LocalePlugin, DevicePlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, WechatPlugin } from 'vux'
import axios from 'axios'
import Qs from 'qs'

Vue.config.productionTip = false

Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(LocalePlugin)

FastClick.attach(document.body)

Vue.use(VueRouter)

sync(store, router)

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      store.commit('updateDirection', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})

if (process.env.NODE_ENV === 'production') {
  const wx = Vue.wechat
  wx.ready(() => {
    console.log('wechat ready')
    // wx.onMenuShareAppMessage({
    //   title: '甄享有', // 分享标题
    //   desc: '甄享有',
    //   link: 'https://vux.li?x-page=wechat_share_message',
    //   imgUrl: 'https://static.vux.li/logo_520.png'
    // })

    // wx.onMenuShareTimeline({
    //   title: 'VUX', // 分享标题
    //   desc: '基于 WeUI 和 Vue 的移动端 UI 组件库',
    //   link: 'https://vux.li?x-page=wechat_share_timeline',
    //   imgUrl: 'https://static.vux.li/logo_520.png'
    // })
  })
}

axios.defaults.timeout = 8000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.baseURL = (process.env.NODE_ENV === 'development' ? 'http://localhost:49644/' : 'http://share.cm0575.com/')

axios.interceptors.request.use((config) => {
  if (config.method === 'post' || config.method === 'put') {
    config.data = Qs.parse(config.data, {arrayFormat: 'brackets'})
  }
  // headers携带token
  // if (store.getters.getToken) {
  //   config.headers.Authorization = `Token ${store.getters.getToken}`;
  // }
  return config
}, (error) => {
  Vue.$vux.toast.show({text: '非法输入', type: 'text', time: 1000})
  return Promise.reject(error)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
