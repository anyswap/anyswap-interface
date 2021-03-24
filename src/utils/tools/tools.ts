import config from '../../config'

export function formatWeb3Str (str:string, len = 64) {
  // console.log(str)
  str = str.indexOf('0x') === 0 ? str.substr(2) : str
  const strLen = str.length / len
  const arr = []
  for (let i = 0; i < strLen; i++) {
    const str1 = str.substr(i * len, len)
    arr.push('0x' + str1)
  }
  return arr
}

export function getLocalConfig (account:string, token:string, chainID:string|number, type:string, timeout:string|number|undefined) {
  let lstr = sessionStorage.getItem(type)
  timeout = timeout ? timeout : config.localDataDeadline
  if (!lstr) {
    return false
  } else {
    let lboj = JSON.parse(lstr)
    if (!lboj[chainID]) {
      return false
    } else if (!lboj[chainID][account]) {
      return false
    } else if (!lboj[chainID][account][token]) {
      return false
    } else if ((Date.now() - lboj[chainID][account][token].timestamp) > (1000 * 60 * 10)) {
      return false
    } else if (timeout && lboj[chainID][account][token].timestamp < timeout) { // 在某个时间之前的数据无效
      return false
    } else {
      return lboj[chainID][account][token]
    }
  }
}

export function setLocalConfig (account:string, token:string, chainID:string|number, type:string, data: any) {
  let lstr = sessionStorage.getItem(type)
  let lboj:any = {}
  if (!lstr) {
    lboj[chainID] = {}
    lboj[chainID][account] = {}
    lboj[chainID][account][token] = {
      ...data,
      timestamp: Date.now()
    }
  } else {
    lboj = JSON.parse(lstr)
    if (!lboj[chainID]) {
      lboj[chainID] = {}
      lboj[chainID][account] = {}
      lboj[chainID][account][token] = {
        ...data,
        timestamp: Date.now()
      }
    } else if (!lboj[chainID][account]) {
      lboj[chainID][account] = {}
      lboj[chainID][account][token] = {
        ...data,
        timestamp: Date.now()
      }
    } else {
      lboj[chainID][account][token] = {
        ...data,
        timestamp: Date.now()
      }
    }
  }
  sessionStorage.setItem(type, JSON.stringify(lboj))
}