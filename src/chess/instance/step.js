import {
  checkRow,
  checkColumn,
  check45deg,
  check135deg
} from '../util/win'

const BLACK = 1, WHITE = 2

/**
 * 下一步
 * @param {number} x 
 * @param {number} y 
 */
export function _nextStep(x, y) {
  if (this.chess[x][y] === 0 && !this.isWin) {
    const nextPlayer = this._getNextPlayer()
    const step = {x, y, player: nextPlayer}

    this._updateStep(step, true)
      // 置为可悔棋状态且不可撤销悔棋状态
    this.canRegret = true
    this.canRevoke = false
      // 执行options里play钩子函数
    this.playHandler && this.playHandler.call(null, step)

    this._checkWin(step)
  }
}


/**
 * 悔棋
 */
export function _regretStep () {
  if (this.canRegret) {
    const regretStep = this.steps.pop()
    const {x, y, player} = regretStep

    this._updateStep(regretStep, false)

    this.canRevoke = true
      // 若steps队列里没有数据，则置为不可悔棋状态
    if (!this.steps.length) {
      this.canRegret = false
    }
      // 执行options里regret钩子函数
    this.regretHandler && this.regretHandler.call(null, regretStep)
  }
}

/**
 * 撤销悔棋
 */
export function _revokeStep () {
  if (this.canRevoke) {
    const revokeStep = this.regrets.pop()
    const {x, y, player} = revokeStep

    this._updateStep(revokeStep, true)
      // 若regrets队列里没有数据，则置为不可撤销悔棋状态
    if (!this.regrets.length) {
      this.canRegret = true
      this.canRevoke = false
    }
      // 执行options里revoke钩子函数
    this.revokeHandler && this.revokeHandler.call(null, revokeStep)
  }
}

/**
 * 更新棋盘状态
 * @param {*} step
 * @param isAdd : true 落子or撤销悔棋  false 悔棋 
 */
export function _updateStep (step, isAdd = true) {
  const {x, y, player} = step
  if (isAdd) {
    this.chess[x][y] = player
    this.steps.push(step)
    this._addChessman(step)
  } else {
    this.chess[x][y] = 0
    this.regrets.push(step)
    this._removeChessman(step)
  }
}

/**
 *  检查棋局胜利条件
 *  将this.chess棋局状态和当前step作为参数判断胜负
 * @param {*} step 当前步
 */
export function _checkWin (step) {
  if (checkRow(this, step) ||
      checkColumn(this, step) ||
      check45deg(this, step) ||
      check135deg(this, step)
  ) {
    this.isWin = true
    this._renderWinDot(step.player)
  }
}

/**
 * 棋局重开
 */
export function _restartStep () {
  this.restart = true
  this._reRender()
  this._initProperty()
}

/**
 * 从steps列表获取上一步是白方还是黑方，来确定下一步哪方
 */
export function _getNextPlayer () {
  const len = this.steps.length
  if (!len) {
    return BLACK
  } else {
    return this.steps[len - 1].player === BLACK ? WHITE : BLACK
  }
}