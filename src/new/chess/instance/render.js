import {
  renderChessboardDom,
  renderChessmanDom,
  removeChessmanDom
} from '../util/dom'

import {
  renderChessboardCanvas,
  renderChessmanCanvas
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