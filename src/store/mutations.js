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

import * as types from './mutation-types'
import { storage } from '../utils'

const CryptoJS = require('crypto-js')
export const mutations = {
  [types.SET_COLLAPSED] (state, data) {
    state.collapsed = data.collapsed
  },
  [types.TOGGLE_SIDE_MENU] (state) {
    state.collapsed = !state.collapsed
  },
  [types.CLOSE_SIDE_MENU] (state) {
    state.collapsed = false
  },
  [types.OPEN_SIDE_MENU] (state) {
    state.collapsed = true
  },
  [types.CACHE_LOGIN_INFO] (state, data) {
    state.loginInfo = JSON.parse(JSON.stringify(data))
    let loginInfoStr = JSON.stringify(data)
    let cryptoText = CryptoJS[state.cryptoType].encrypt(loginInfoStr, state.privateKey).toString()
    storage.setItem(state.localStorageKeys.loginInfo, cryptoText, state.expiresIn)
  },
  [types.LOG_OUT] (state) {
    state.loginInfo = {}
    storage.removeItem(state.localStorageKeys.loginInfo)
  }
}
