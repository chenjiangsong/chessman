const BLACK = 1, WHITE = 2

/**
 * 检查横向是否成棋
 * @param {array} chess 棋局状态数组
 * @param {obj} step 当前步
 */
export function checkRow (chess, step) {
  const {x, y, player} = step
  let left = x - 4 > 0 ? x - 4 : 0
  let right = x + 4 < 14 ? x + 4 : 14

  
  let ruler = ''  
  for (let i = left; i <= right; i++) {
    ruler += chess[i][y]
  }

  return testWin(player, ruler)
}

/**
 * 检查纵向是否成棋
 * @param {*} chess 
 * @param {*} step 
 */
export function checkColumn (chess, step) {
  const {x, y, player} = step
  let top = y - 4 > 0 ? y - 4 : 0
  let bottom = y + 4 < 14 ? y + 4 : 14
  
  let ruler = ''
  for (let i = top; i <= bottom; i++) {
    ruler += chess[x][i]
  }

  return testWin(player, ruler)
}

/**
 * 检查45deg 从左下到右上
 * @param {*} chess 
 * @param {*} step 
 */
export function check45deg (chess, step) {
  const {x, y, player} = step
  
  const left = x - 4 > 0 ? x - 4 : 0
  const right = x + 4 < 14 ? x + 4 : 14
  const top = y - 4 > 0 ? y - 4 : 0
  const bottom = y + 4 < 14 ? y + 4 : 14

  const leftPadding = (x - left) > (bottom - y) ? (bottom - y) : (x - left)
  const rightPadding = (right - x) > (y - top) ? (y - top) : (right - x)
  const _left = x - leftPadding
  const _bottom = y + leftPadding
  const len = leftPadding + rightPadding + 1
  
  let ruler = ''
  for (let i = 0; i < len; i++) {
    ruler += chess[_left+i][_bottom-i]
  }

  return testWin(player, ruler)
}

/**
 * 检查135deg 从左上到右下
 * @param {*} chess 
 * @param {*} step 
 */
export function check135deg (chess, step) {
  const {x, y, player} = step

  const left = x - 4 > 0 ? x - 4 : 0
  const right = x + 4 < 14 ? x + 4 : 14
  const top = y - 4 > 0 ? y - 4 : 0
  const bottom = y + 4 < 14 ? y + 4 : 14

  const leftPadding = (x - left) > (y - top) ? (y - top) : (x - left)
  const rightPadding = (right - x) > (bottom - y) ? (bottom - y) : (right - x)
  const _left = x - leftPadding
  const _top = y - leftPadding
  const len = leftPadding + rightPadding + 1

  let ruler = ''
  for (let i = 0; i < len; i++) {
    ruler += chess[_left+i][_top+i]
  }

  return testWin(player, ruler)
}

/**
 * 检查
 * @param {*} player 
 * @param {*} ruler 
 */
function testWin(player, ruler) {
  return player === BLACK ? /11111/.test(ruler) : /22222/.test(ruler)
}