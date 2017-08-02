
const BLACK = 1, WHITE = 2

/**
 * 下一步
 * @param {number} x 
 * @param {number} y 
 */
export function _nextStep(x, y) {
  if (this.chess[x][y] === 0) {
    const nextPlayer = _getNextPlayer.call(this)
    const data = {x, y, player: nextPlayer}

      // 更新棋盘状态
    this._updateStep(data)

      // 执行棋盘点击勾子函数
    this.clickHandler.call(null, data)

      // 检查胜利条件
    this._checkWin()
  }
}

export function _updateStep (data) {
  // 填充[x][y] 
  this.chess[x][y] = nextPlayer
    // 将这一步棋推入steps
  this.steps.push(data)
    // 绘制棋子
  this._addChessman(data)
    // 置为可悔棋状态
  this.canRegret = true
}

export function _checkWin () {

}


/**
 * 从steps列表获取上一步是白方还是黑方，来确定下一步哪方
 */
function _getNextPlayer () {
  const len = this.steps.length
  if (!len) {
    return BLACK
  } else {
    return this.steps[len - 1].player === BLACK ? WHITE : BLACK
  }
}