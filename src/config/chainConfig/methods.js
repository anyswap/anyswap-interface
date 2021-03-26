export function formatSwapTokenList (name, tokenlist) {
  
  return {
    "keywords": ["roll", "default", "social money", "personal tokens"],
    "logoURI": "",
    "name": name,
    "timestamp": "",
    "tokens": tokenlist,
    "version": {"major": 0, "minor": 0, "patch": 1}
  }
}

export function formatBridgeTokenList (tokenlist) {
  const arr = []
  for (const obj of tokenlist) {
    if (obj.isCrossChain) {
      arr.push(obj)
    }
  }
  return arr
}