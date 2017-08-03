import { getDownPosition } from '../util/lang'

export function _initEvent () {
  this._bindClickPlay()
  this._bindRegret()
  this._bindRevoke()
  this._bindRestart()
}

/**
 * 棋盘下棋事件
 */
export function _bindClickPlay () {
  document.getElementById('chess').addEventListener('click',  (e) => {
    const [x, y] = getDownPosition(e)
    if (typeof x !== 'undefined' && typeof y !== 'undefined') {
      this._nextStep(x, y)
    }
  })
}

/**
 * 悔棋事件
 */
export function _bindRegret () {
  document.getElementById('regret').addEventListener('click',  () => {
    this._regretStep()
  })
}

/**
 * 撤销悔棋事件
 */
export function _bindRevoke () {
  document.getElementById('revoke').addEventListener('click',  () => {
    this._revokeStep()
  })
}

/**
 * 重开一局事件
 */
export function _bindRestart () {
  document.getElementById('restart').addEventListener('click',  () => {
    this._restartStep()
  })
}
