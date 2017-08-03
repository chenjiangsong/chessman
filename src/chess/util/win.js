const BLACK = 1, WHITE = 2

/**
 * 检查横向是否成棋 横向成员字符串连接 然后indexOf或者正则匹配
 * @param {array} chess 棋局状态数组
 * @param {obj} step 当前步
 */
export function checkRow (self, step) {
  const {x, y, player} = step
  const chess = self.chess

  let left = x - 4 > 0 ? x - 4 : 0
  let right = x + 4 < 14 ? x + 4 : 14

  
  let ruler = ''  
  for (let i = left; i <= right; i++) {
    const _player = chess[i][y]
    ruler += _player
    collect(self, i, y, _player)
  }

  return testWin(self, player, ruler)
}

/**
 * 检查纵向是否成棋
 * @param {*} chess 
 * @param {*} step 
 */
export function checkColumn (self, step) {
  const {x, y, player} = step
  const chess = self.chess
  const wins = self.wins

  let top = y - 4 > 0 ? y - 4 : 0
  let bottom = y + 4 < 14 ? y + 4 : 14
  
  let ruler = ''
  for (let i = top; i <= bottom; i++) {
    const _player = chess[x][i]
    ruler += _player
    collect(self, x, i, _player)
  }

  return testWin(self, player, ruler)
}

/**
 * 检查45deg 从左下到右上
 * @param {*} chess 
 * @param {*} step 
 */
export function check45deg (self, step) {
  const {x, y, player} = step
  const chess = self.chess
  const wins = self.wins
  
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
    const _player = chess[_left+i][_bottom-i]
    ruler += _player
    collect(self, _left+i, _bottom-i, _player)
  }

  return testWin(self, player, ruler)
}

/**
 * 检查135deg 从左上到右下
 * @param {*} chess 
 * @param {*} step 
 */
export function check135deg (self, step) {
  const {x, y, player} = step
  const chess = self.chess
  const wins = self.wins

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
    const _player = chess[_left+i][_top+i]
    ruler += _player
    collect(self, _left+i, _top+i, _player)
  }

  return testWin(self, player, ruler)
}

/**
 * 检查胜负，没有胜利则将当前胜利成员清空
 * @param {*} player 
 * @param {*} ruler 
 */
function testWin(self, player, ruler) {
  const winIndex = player === BLACK ? ruler.indexOf('11111') : ruler.indexOf('22222')

  if (winIndex > -1) {
    self.wins = self.wins.slice(winIndex, winIndex + 5)
    return true
  } 
  
  self.wins = []
  return false
}

/**
 * 收集胜利成员棋子
 */
function collect (self, x, y, player) {
  self.wins.push({x, y, player})
}