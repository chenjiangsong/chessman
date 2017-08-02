import * as _ from '../util'

/**
 * 
 * @param {*} options 
 */
export function _init(options) {
  options = options || {}
  
  // dom相关属性
  this.$root = document.getElementById(options.id)
  this.$chessboard = null

  // options配置属性
  this.renderType = options.renderType || 'dom'
  this.playHandler = typeof options.play === 'function' ? options.play : null
  this.regretHandler = typeof options.regret === 'function' ? options.regret : null
  this.revokeHandler = typeof options.revoke === 'function' ? options.revoke : null


  // 棋局过程属性
  this.chess = _.createTwoArray(15)
    // 步数队列
  this.steps = []  
    // 悔棋队列
  this.regrets = []

  // 提示信息相关属性，采用监听器监听，减少dom操作
  this.isWin = false
  this.canRegret = false
  this.canRevoke = false
  this.canRrestart = false
  this.randomTimer = null
  
  // 初始化渲染、绑定事件、监听器
  this._initRender()
  this._initEvent()
  this._initWatcher()

}