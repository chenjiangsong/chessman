import * as _ from '../util'

export function _initRender () {
  if (this.renderType === 'dom') {
    _.initRenderDom.call(this)
  } else {
    this._renderCanvas()
  }
}





export function _addChessman (x, y, player) {

}