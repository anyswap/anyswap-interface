import { chainInfo } from './chainConfig'

function getParams(param: any) {
  const str = window.location.href.indexOf('?') ? window.location.href.split('?')[1] : ''
  if (str) {
    const arr = str.split('&')
    let value = ''
    for (const str2 of arr) {
      const arr2 = str2.split('=')
      if (arr2[0] === param) {
        value = arr2[1]
        break
      }
    }
    return value
  } else {
    return ''
  }
}

function getParamNode(type: any, INIT_NODE: any) {
  switch (type) {
    case 'fusion':
      return chainInfo['32659'].label
    case 'fusiontestnet':
      return chainInfo['46688'].label
    case 'bsc':
      return chainInfo['56'].label
    case 'bsctestnet':
      return chainInfo['97'].label
    case 'fantom':
      return chainInfo['250'].label
    case 'eth':
      return chainInfo['1'].label
    case 'huobi':
      return chainInfo['128'].label
    case 'huobitestnet':
      return chainInfo['256'].label
    default:
      return INIT_NODE
  }
}
function getNode(type: any, INIT_NODE: any) {
  if (type.indexOf('fsn') !== -1) {
    return chainInfo['32659'].label
  } else if (type.indexOf('bsc') !== -1) {
    return chainInfo['56'].label
  } else if (type.indexOf('ftm') !== -1) {
    return chainInfo['250'].label
  } else if (type.indexOf('eth') !== -1) {
    return chainInfo['1'].label
  } else if (type.indexOf('huobi') !== -1) {
    return chainInfo['128'].label
  } else {
    return INIT_NODE
  }
}
export function getNetwork(ENV_NODE_CONFIG: any, INIT_NODE: any) {
  let nc = ''
  const urlParams = getParams('network')
  const localHost = window.location.host
  const localStr = localStorage.getItem(ENV_NODE_CONFIG)
  if (urlParams) {
    nc = getParamNode(urlParams, INIT_NODE)
    localStorage.setItem(ENV_NODE_CONFIG, nc)
  } else {
    if (localStr) {
      nc = localStr
    } else {
      nc = getNode(localHost, INIT_NODE)
      localStorage.setItem(ENV_NODE_CONFIG, nc)
    }
  }
  return nc
}

const ID_CODE = 'ID_CODE'
export function getIdCode() {
  const urlParams = getParams('agent')
  if (urlParams) {
    localStorage.setItem(ID_CODE, urlParams)
  }
}
