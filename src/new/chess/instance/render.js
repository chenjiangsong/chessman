import {
  renderChessboardDom,
  renderChessmanDom,
  removeChessmanDom,
  renderWinDotDom
} from '../util/dom'

import {
  renderChessboardCanvas,
  renderChessmanCanvas,
  removeChessmanCanvas,
  renderWinDotCanvas
} from '../util/canvas'

/**
 * 初始化渲染
 * return 
 */
export function _initRender () {
  if (this.renderType === 'dom') {
    renderChessboardDom(this)
  } else {
    renderChessboardCanvas(this)
  }
}

/**
 * 添加棋子
 * @param {*} x
 * @param {*} y
 * @param {*} nextPlayer
 */
export function _addChessman ({x, y, player}) {
  if (this.renderType === 'dom') {
    renderChessmanDom(x, y, player)
  } else {
    renderChessmanCanvas(this.ctx, x, y, player)
  }
}

/**
 * 移除棋子
 * @param {*} param0 
 */
export function _removeChessman ({x, y, player}) {
  if (this.renderType === 'dom') {
    removeChessmanDom(x, y, player)
  } else {
    removeChessmanCanvas(this.ctx, x, y, player)
  }
}

/**
 *  渲染胜利成员
 */
export function _renderWinDot (winner) {
  const wins = this.wins
  if (this.renderType === 'dom') {
    renderWinDotDom(wins, winner)
  } else {
    renderWinDotCanvas(this.ctx, wins, winner)
  }
}

/**
 * 重新渲染
 */
export function _reRender () {
  const steps = this.steps
  while (steps.length) {
    this._removeChessman(steps.pop())
  }
}