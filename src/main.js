import Vue from 'vue'
import App from './App.vue'
import { sync } from 'vuex-router-sync'
import router from './router/index'
import store from './store'
import './registerServiceWorker'
import * as filters from './filters'
import mixins from './mixins'
import './themes/index.less'
// import 'view-design/src/styles/index.less'
import { Notice, Message, LoadingBar } from 'view-design'
import "animate.css"
import { storage, title, isEmptyObj } from './utils'
const CryptoJS = require('crypto-js')

Vue.prototype.$Notice = Notice
Vue.prototype.$Message = Message
Vue.prototype.$LoadingBar = LoadingBar

sync(store, router)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.mixin(mixins)

Vue.config.productionTip = false

LoadingBar.config({
  color: '#f6ca9d'
})

const findUserByName = function (username, users) {
  let outInfo = {}
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      outInfo = users[i]
      // i = users.length
    }
  }
  return outInfo
}

router.beforeEach(async (to, from, next) => {
  LoadingBar.start()
  const _state = store.state
  let _localLoginInfo = await storage.getItem(_state.localStorageKeys.loginInfo)
  if (_localLoginInfo) {
    let decodeInfo
    try {
      decodeInfo = CryptoJS[_state.cryptoType].decrypt(_localLoginInfo, _state.privateKey).toString(CryptoJS.enc.Utf8)
    } catch (err) {
    }
    if (decodeInfo) {
      _localLoginInfo = JSON.parse(decodeInfo)
    } else {
      utils.storage.clear()
      _localLoginInfo = {}
    }
  } else {
    _localLoginInfo = {}
  }
  if (Object.keys(_localLoginInfo).length > 0) {
    let _userLoginInfo = findUserByName(_localLoginInfo.username, _state.users)
    if (String(_userLoginInfo.role) !== String(_localLoginInfo.role)) {
      storage.removeItem(_state.localStorageKeys.loginInfo)
      _localLoginInfo = {}
    }
  }
  if (to.meta && to.meta.title) {
    title(to.meta.title)
  }
  if (to.meta && to.meta.role && _localLoginInfo.role && to.meta.role.indexOf(_localLoginInfo.role) < 0) {
    next({
      replace: true,
      name: 'NotFound'
    })
  } else {
    if (isEmptyObj(_localLoginInfo)) {
      if (_state.needlessLogin.indexOf(to.name) === -1) {
        next({
          replace: true,
          name: 'Login'
        })
      }
    } else {
      _state.loginInfo = _localLoginInfo
    }
    next()
  }
})

router.afterEach(to => {
  LoadingBar.finish()
})

Vue.config.errorHandler = function (err) {
  console.log(err)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
