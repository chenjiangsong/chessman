export function createTwoArray (n) {
  const refer = new Array(n)
  return Array.from(refer).map(i => {
    return Array.from(refer).map(j => {
      return 0
    })
  })
}


export function observe (obj, key, value, callback) {
  const _key = '_' + key
  obj[_key] = value

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      return obj[_key]
    },
    set: function (newVal) {
      if (newVal === obj[_key]) {
        return
      }
      obj[_key] = newVal
      callback && callback(newVal)
    }
  })
}


export function getDownPosition (e) {
  let x, y
  if (e.target.nodeName.toLowerCase() === 'canvas') {
    x = Math.floor(e.offsetX / 36)
    y = Math.floor(e.offsetY / 36)
  } else if (e.target.id && e.target.id !== 'chessboard') {
    console.log(e.target.id)
    const ids = e.target.id.split('-')
    console.log(ids)
    x = parseInt(ids[1])
    y = parseInt(ids[2])
  } else {
    x = undefined
    y = undefined
  }
  return [x, y]
}