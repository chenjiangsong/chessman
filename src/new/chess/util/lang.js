/**
 * 创建二维数组 元素默认为0
 * @param {number} n 
 */
export function createTwoArray (n) {
  const refer = new Array(n)
  return Array.from(refer).map(i => {
    return Array.from(refer).map(j => {
      return 0
    })
  })
}

/**
 * 对象数据劫持， setter时执行callback
 * @param {*} obj 
 * @param {*} key 
 * @param {*} value 
 * @param {*} callback 
 */
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
      const oldVal = obj[_key]
      if (newVal === oldVal) {
        return
      }
      obj[_key] = newVal
      callback && callback(newVal, oldVal)
    }
  })
}

/**
 * 转化鼠标点击位置为棋盘坐标
 * @param {Obj} e 
 */
export function getDownPosition (e) {
  let x, y
  const id = e.target.id
  const nodeName = e.target.nodeName.toLowerCase()

  if (nodeName === 'canvas') {
    x = Math.floor(e.offsetX / 36)
    y = Math.floor(e.offsetY / 36)
  } else if (id && /^grid-\d{1,2}-\d{1,2}/.test(id)) {
    const ids = id.split('-')
    x = parseInt(ids[1])
    y = parseInt(ids[2])
  } else {
    x = undefined
    y = undefined
  }

  return [x, y]
}