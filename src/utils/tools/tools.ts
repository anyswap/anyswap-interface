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