import localforage from 'localforage'

const storeName = 'Enkel'

const userStore = localforage.createInstance({
  name: storeName,
  storeName: 'user'
})

function getLocalforageKey (key, expiredAt) {
  /**
   * key: localforage前置key
   * expiredAt: localforage失效时间，不传expiredAt或(expiredAt为0)时，不失效
   */
  if (expiredAt) {
    return key + '-' + (new Date()).getTime() + ':' + expiredAt
  } else {
    return key
  }
}

function isExpired (key) {
  let matched = key.match(/\d{13}:\d{1,}$/)
  if (!matched) {
    // 无过期时间，永不失效
    return false
  } else {
    let _startTs = matched[0].split(':')[0]
    let _expiredAt = matched[0].split(':')[1]
    if (Number(_startTs) + Number(_expiredAt) <= (new Date()).getTime()) {
      // 缓存过期，删除缓存
      if (userStore) {
        userStore.removeItem(key)
      }
      return true
    } else {
      return false
    }
  }
}

function findRealKey (key) {
  return new Promise(async (resolve) => {
    if (!userStore) {
      resolve('')
    } else if (!key) {
      resolve('')
    } else {
      await userStore.keys().then(keys => {
        resolve(keys.filter(item => item.indexOf(key) > -1))
      }).catch(err => {
        resolve([])
      })
    }
  })
}

function getItem (key) {
  return new Promise(async (resolve) => {
    if (!userStore) {
      // reject(new Error('数据仓库 [store] 不能为空'))
      resolve(null)
    } else if (!key) {
      // reject(new Error('缓存名称 [key] 不能为空'))
      resolve(null)
    } else {
      let _localedKey = await findRealKey(key)
      if (_localedKey && _localedKey[0]) {
        let _isExpired = isExpired(_localedKey[0])
        if (_isExpired) {
          resolve(null)
        } else {
          let d = await userStore.getItem(_localedKey[0])
          resolve(d)
        }
      } else {
        resolve(null)
      }
    }
  })
}

function setItem (key, value, expiredAt) {
  return new Promise(async (resolve) => {
    if (!key) {
      resolve(true)
    } else {
      await removeItem(key)
      let _realKey = getLocalforageKey(key, expiredAt)
      await userStore.setItem(_realKey, value)
      resolve(true)
    }
  })
}

function removeItem (key) {
  return new Promise(async (resolve) => {
    if (!userStore) {
      resolve(true)
    } else if (!key) {
      resolve(true)
    } else {
      let _localedKey = await findRealKey(key)
      if (_localedKey) {
        _localedKey.forEach(item => {
          userStore.removeItem(item)
        })
      }
      resolve(true)
    }
  })
}

export {
  getItem,
  setItem,
  removeItem,
  isExpired
}