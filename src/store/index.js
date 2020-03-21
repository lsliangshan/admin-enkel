/***
 **                                                          _ooOoo_
 **                                                         o8888888o
 **                                                         88" . "88
 **                                                         (| -_- |)
 **                                                          O\ = /O
 **                                                      ____/`---'\____
 **                                                    .   ' \\| |// `.
 **                                                     / \\||| : |||// \
 **                                                   / _||||| -:- |||||- \
 **                                                     | | \\\ - /// | |
 **                                                   | \_| ''\---/'' | |
 **                                                    \ .-\__ `-` ___/-. /
 **                                                 ___`. .' /--.--\ `. . __
 **                                              ."" '< `.___\_<|>_/___.' >'"".
 **                                             | | : `- \`.;`\ _ /`;.`/ - ` : | |
 **                                               \ \ `-. \_ __\ /__ _/ .-` / /
 **                                       ======`-.____`-.___\_____/___.-`____.-'======
 **                                                          `=---='
 **
 **                                       .............................................
 **                                              佛祖保佑             永无BUG
 **                                      佛曰:
 **                                              写字楼里写字间，写字间里程序员；
 **                                              程序人员写程序，又拿程序换酒钱。
 **                                              酒醒只在网上坐，酒醉还来网下眠；
 **                                              酒醉酒醒日复日，网上网下年复年。
 **                                              但愿老死电脑间，不愿鞠躬老板前；
 **                                              奔驰宝马贵者趣，公交自行程序员。
 **                                              别人笑我忒疯癫，我笑自己命太贱；
 **                                              不见满街漂亮妹，哪个归得程序员？
 */
/**
 * Created by liangshan on 2017/7/13.
 */
import Vue from 'vue'
import Vuex from 'vuex'
// import io from 'socket.io-client'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'

import moduleBanner from './modules/moduleBanner'
import moduleEntrance from './modules/moduleEntrance'
import editorBanner from './modules/editorBanner'
import editorEntrance from './modules/editorEntrance'

Vue.use(Vuex)
const store = new Vuex.Store({
  actions: actions.actions,
  mutations: mutations.mutations,
  getters: getters.getters,
  modules: {
    moduleBanner,
    moduleEntrance,
    editorBanner,
    editorEntrance
  },
  state: {
    theme: 'index',
    shortName: 'Enkel',
    fullName: 'Enkel Admin',
    collapsed: false, // 是否收起侧边栏菜单
    privateKey: 'gray-config-9',
    cryptoType: 'TripleDES',
    expiresIn: 24 * 60 * 60 * 1000, // 一天
    loginInfo: {
    },
    users: [
      {
        username: 'ls',
        password: '123123',
        role: '999' // [0, 100): 自由账号；[100, 200): C端账号；[200, 300): B端账号；999: 开发者账号
      }
    ],
    localStorageKeys: {
      loginInfo: '_l_i'
    },
    assets: {
      avatar: '/img/avatar.jpg',
      defaultAvatar: '/img/avatar.jpg'
    },
    needlessLogin: ['Login', 'Register', 'Forget'], // 不需要登录的页面
    menus: [
      {
        name: 'business',
        text: '业务管理',
        icon: 'md-globe',
        children: [
          {
            name: 'index',
            text: '业务操作',
            role: ['100', '999']
          },
          {
            name: 'weex',
            text: 'weex首页配置',
            role: ['100', '999']
          },
          {
            name: 'be',
            text: '最佳雇主',
            role: ['100', '999']
          },
          {
            name: 'bl',
            text: '设置黑名单',
            role: ['100', '999']
          }
        ]
      },
      {
        name: 'black',
        text: '黑名单管理',
        icon: 'ios-list-box',
        children: [
          {
            name: 'list',
            text: '黑名单操作',
            role: ['0', '5', '1', '100', '999']
          },
          {
            name: 'gray',
            text: '灰度列表',
            role: ['0', '5', '2', '100', '999']
          }
        ]
      },
      {
        name: 'router',
        text: 'C端路由管理',
        icon: 'md-shuffle',
        children: [
          {
            name: 'index',
            text: '路由操作',
            role: ['100', '999']
          },
          {
            name: 'list',
            text: '路由列表',
            role: ['100', '999']
          }
        ]
      },
      {
        name: 'br',
        text: 'B端路由管理',
        icon: 'md-shuffle',
        children: [
          {
            name: 'index',
            text: '路由操作',
            role: ['200', '999']
          },
          {
            name: 'list',
            text: '路由列表',
            role: ['200', '999']
          }
        ]
      }
    ]
  }
})

export default store

global.store = store
