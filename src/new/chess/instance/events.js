import { getDownPosition } from '../util/lang'

export function _initEvent () {
  this._bindClickPlay()
  this._bindRegret()
  this._bindRevoke()
  this._bindRestart()
  this._bindRandom()
  this._bindSwitch()
}

/**
 * 棋盘下棋事件
 */
export function _bindClickPlay () {
  document.getElementById('chess').addEventListener('click',  (e) => {
    playChess.call(this, e)
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

/**
 * 随机落子测试事件
 */
export function _bindRandom () {
  document.getElementById('random').addEventListener('click',  () => {
    const self = this
    if (self.randomTimer) {
      clearInterval(self.randomTimer)
      self.randomTimer = null
    } else {
      self.randomTimer = setInterval(function () {
        const x = Math.floor(Math.random()*15)
        const y = Math.floor(Math.random()*15)
        self._nextStep(x, y)
      }, 100)
    }
    // if (!this.randomTimer && this.canRevoke) {
    //   this._restartStep()
    // }
  })
}

/**
 * 切换dom/canvas渲染事件
 */
export function _bindSwitch () {
  document.getElementById('switch').addEventListener('click',  () => {
    // if (!this.randomTimer && this.canRevoke) {
    //   this._restartStep()
    // }
  })
}


function playChess (e) {
  const [x, y] = getDownPosition(e)

  if (typeof x !== 'undefined' && typeof y !== 'undefined') {
    this._nextStep(x, y)
  }
}