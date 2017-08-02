const BLACK = 1, WHITE = 2

/**
 * 检查横向是否成棋
 * @param {array} chess 棋局状态数组
 * @param {obj} step 当前步
 */
export function checkRow (chess, step) {
  const {x, y, player} = step
  let ruler = '',
      left = x - 4, right = x + 4

  left = left < 0 ? 0 : left
  right = right > 14 ? 14 : right

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
  let ruler = '',
      top = y - 4, bottom = y + 4

  top = top < 0 ? 0 : top
  bottom = bottom > 14 ? 14 : bottom

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

}

/**
 * 检查135deg 从左上到右下
 * @param {*} chess 
 * @param {*} step 
 */
export function check135deg (chess, step) {
  const {x, y, player} = step
}

/**
 * 检查
 * @param {*} player 
 * @param {*} ruler 
 */
function testWin(player, ruler) {
  return player === BLACK ? /11111/.test(ruler) : /22222/.test(ruler)
}