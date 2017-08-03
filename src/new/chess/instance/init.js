import { createTwoArray } from '../util/lang' 

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

  // 初始化棋盘基础属性，棋盘渲染、绑定事件、监听器
  this._initProperty()
  this._initRender()
  this._initEvent()
  this._initWatcher()

}

export function _initProperty () {
  // 棋局过程属性
  this.chess = createTwoArray(15)
    // 步数队列
  this.steps = []  
    // 悔棋队列
  this.regrets = []
    // 赢棋队列
  this.wins = []

  // 提示信息相关属性，采用监听器监听，减少dom操作
  this.isWin = false
  this.canRegret = false
  this.canRevoke = false
  this.canRrestart = false

  if (this.randomTimer) {
    clearInterval(this.randomTimer)
  }
  this.randomTimer = null
}