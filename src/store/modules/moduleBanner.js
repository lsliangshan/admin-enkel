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
 * Created by liangshan on 2018/8/6.
 */
// import * as types from '../mutation-types'
import qs from 'querystring'
import axios from 'axios'
const instance = axios.create({
  timeout: 3000
})
function random () {
  return Math.floor(Math.random() * 10000 + 500)
}
function formatParams (data) {
  let arr = []
  for (let name in data) {
    arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]))
  }
  // 添加一个随机数，防止缓存
  arr.push('v=' + random())
  return arr.join('&')
}
const moduleBanner = {
  namespaced: true,
  state: {
    requestParams: {
      // baseUrl: 'http://127.0.0.1:3000',
      baseUrl: 'https://talkapi.dei2.com',
      list: '/enkel/banner/list',
      add: '/enkel/banner/add',
      modify: '/enkel/banner/modify',
      del: '/enkel/banner/del'
    }
  },
  getters: {
  },
  actions: {
    list ({ state, dispatch, rootState }, data) {
      return new Promise(resolve => {
        instance({
          baseURL: state.requestParams.baseUrl,
          url: state.requestParams.list,
          method: 'POST',
          data: qs.stringify(data)
        }).then(({ data }) => {
          resolve(data)
        }).catch(() => {
          resolve({})
        })
      })
    },
    add ({ state, dispatch, rootState }, data) {
      return new Promise(resolve => {
        instance({
          baseURL: state.requestParams.baseUrl,
          url: state.requestParams.add,
          method: 'POST',
          data: qs.stringify(data)
        }).then(({ data }) => {
          resolve(data)
        }).catch(() => {
          resolve({})
        })
      })
    },
    modify ({ state, dispatch, rootState }, data) {
      return new Promise(resolve => {
        instance({
          baseURL: state.requestParams.baseUrl,
          url: state.requestParams.modify,
          method: 'POST',
          data: qs.stringify(data)
        }).then(({ data }) => {
          resolve(data)
        }).catch(() => {
          resolve({})
        })
      })
    },
    del ({ state, dispatch, rootState }, data) {
      return new Promise(resolve => {
        instance({
          baseURL: state.requestParams.baseUrl,
          url: state.requestParams.del,
          method: 'POST',
          data: qs.stringify(data)
        }).then(({ data }) => {
          resolve(data)
        }).catch(() => {
          resolve({})
        })
      })
    },
  }
}

export default moduleBanner
