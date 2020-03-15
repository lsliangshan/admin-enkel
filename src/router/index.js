import Vue from 'vue'
import Router from 'vue-router'
import { moduleRouter, editorRouter } from './routes'

Vue.use(Router)

export const routerLogin = {
  path: '/login',
  name: 'Login',
  meta: {
    title: '登录'
  },
  components: {
    HomeRouter: () => import('../views/Login')
  }
}

export const page404 = {
  path: '/*',
  name: 'NotFound',
  meta: {
    title: '页面丢了'
  },
  components: {
    HomeRouter: () => import('../views/error/404')
  }
}

export const routerContent = {
  path: '/',
  name: 'home',
  meta: {
    title: 'BDP业务分发平台'
  },
  components: {
    HomeRouter: () => import('../views/Home')
  },
  children: [
    ...moduleRouter.children,
    ...editorRouter.children
  ]
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    routerLogin,
    routerContent,
    // ...moduleRouter.children,
    page404
  ]
})
