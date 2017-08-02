import * as _ from '../util'

/**
 * 
 * @param {*} options 
 */
export function _init(options) {
  options = options || {}
  
  this.$root = document.getElementById(options.id)
  this.$chessboard = null

  this.renderType = options.renderType || 'dom'
  this.clickHandler = typeof options.click === 'function' ? options.click : function () {}


  this.canRegret = false
  this.canRevoke = false
  this.canRrestart = false

  this.randomTimer = null

  this.chess = _.createTwoArray(15)
  // 步数队列
  this.steps = []
  // 悔棋队列
  this.regrets = []

  this.backgroundColor ='#F9CC9D'
  
  this._initRender()
  this._initEvent()
  this._initWatcher()

}