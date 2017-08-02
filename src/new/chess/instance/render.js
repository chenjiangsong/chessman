import * as _ from '../util'

export function _initRender () {
  if (this.renderType === 'dom') {
    _.initRenderDom.call(this)
  } else {
    this._renderCanvas()
  }
}




/**
 * 
 * @param {*} x
 * @param {*} y
 * @param {*} nextPlayer
 */
export function _addChessman ({x, y, player}) {
  if (this.renderType === 'dom') {
    _.renderChessmanDom(x, y, player)
  } else {
    this._renderCanvas()
  }
}