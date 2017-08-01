import Chesscanvas from './chesscanvas'
import EventEmitter from './events'

const DPR = window.devicePixelRatio
const BLACK = 1
const WHITE = -1

export default class Chessboard extends EventEmitter {
  constructor (options) {
    super()

    this.options = Object.assign({
      wrapId: 'chess-wrap',
      id: 'chessboard',
      size: 15,
      backgroundColor: '#F9CC9D',
      width: 540,
      height: 540
    }, options)

    this.chessWrap = document.getElementById('chess-wrap')
    
    // 棋盘样式对象
    this.chessboard = null
    // 棋盘渲染类型 dom or canvas
    this.renderType = ''
    // 事件锁
    this.eventLock = false
  }

  // dom 渲染
  renderDom () {
    if (this.chessboard) return 
    
    this.renderType = 'dom'
    const chessboard = this.chessboard = document.createElement('div')
    chessboard.id = this.options.id
    chessboard.className = 'chessboard'
    this.chessWrap.appendChild(chessboard)

    const size = this.options.size
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        chessboard.appendChild(createGridDom(i, j))
      }
    }
  }

  // canvas 渲染
  renderCanvas () {
    if (this.chessboard) return 

    this.renderType = 'canvas'
    const { width, height } = this.options

    const chessboard = this.chessboard = document.createElement('canvas')
    chessboard.id = this.options.id
    chessboard.className = 'chessboard'
    chessboard.width = width * DPR
    chessboard.height = height * DPR
    this.chessWrap.appendChild(chessboard)

    const ctx = this.ctx = chessboard.getContext('2d')

    const painter = this.painter =  new Chesscanvas({ctx})

    painter.renderChessboard()
  }

  // 棋盘重新渲染
  reRender () {
    // 父容器中移除 this.chessboard
    this.chessWrap.removeChild(this.chessboard)
    this.chessboard = null
    // 根据之前的渲染方式重新渲染
    if (this.renderType === 'dom') {
      this.renderDom()
    } else {
      this.renderCanvas()
    }
  }

  // 切换棋盘渲染方式  保留当前落子局面
  switchRender (stepList) {
    const self = this
    const currentType = self.renderType
    self.renderType = currentType === 'dom' ? 'canvas' : 'dom'
    self.reRender()
    stepList.forEach(function(stepInfo) {
      self.addChessman(stepInfo)
    })
  }

  /**
   * 棋盘落子效果
   * @param {*} stepInfo 
   *  steps 当前步数
   *  x
   *  y
   *  player
   */
  addChessman (stepInfo) {
    const self = this
    return new Promise((resolve, reject) => {
      if (self.renderType === 'dom') {
        self._renderDomChessman(stepInfo)
        resolve()
      } else {
        self.painter.renderCanvasChessman(stepInfo, resolve)
      }
    })
  }

  // 绘制五子胜利连线圆点
  renderWinLine (winList) {
    const self = this
    winList.forEach((stepInfo) => {
      self.addWinDot(stepInfo)
    })
  }

  // 添加圆点
  addWinDot (stepInfo) {
    const self = this
    if (self.renderType === 'dom') {
      self._renderWinDot(stepInfo)
    } else {
      self.painter.renderCanvasWinDot(stepInfo)
    }
  }

  _renderWinDot (stepInfo) {
    const {x, y} = stepInfo
    const grid = document.getElementById(`grid-${x}-${y}`)
    const chessman = document.createElement('div')
    chessman.className = 'win-dot'
    chessman.style.backgroundColor = '#2d8cf0'
    grid.appendChild(chessman)
  }

  _renderDomChessman (stepInfo) {
    const {x, y, player} = stepInfo
    const grid = document.getElementById(`grid-${x}-${y}`)
    const chessman = document.createElement('div')
    chessman.className = 'chessman'
    chessman.style.backgroundColor = player === BLACK ? 'black' : 'white'
    grid.appendChild(chessman)
  }
  /**
   * 悔棋 移除棋子
   */
  removeChessman (stepInfo) {
    const self = this
    return new Promise((resolve, reject) => {
      if (self.renderType === 'dom') {
        self._removeDomChessman(stepInfo)
        resolve()
      } else {
        self.painter.removeCanvasChessman(stepInfo, resolve)
      }
    })
  }

  _removeDomChessman(stepInfo) {
    const {x, y, player} = stepInfo
    const grid = document.getElementById(`grid-${x}-${y}`)
    grid.removeChild(grid.childNodes[0])
  }

  // 获取渲染方式
  getRenderType () {
    return this.renderType
  }
  
  bind (event, fn) {
    this.chessboard.addEventListener(event, fn)
  }

  unbind(event, fn) {
    this.chessboard.removeEventListener(event, fn)
  }

}

// 绘制dom网格线
function createGridDom (x, y) {
  const grid = document.createElement('div')
  let classNames = ['chess-grid']
  x === 0 && classNames.push('chess-grid-left')
  x === 14 && classNames.push('chess-grid-right')
  y === 0 && classNames.push('chess-grid-top')
  y === 14 && classNames.push('chess-grid-bottom')
  grid.className = classNames.join(' ')
  grid.id = `grid-${x}-${y}`
  grid.style.top = y * 36 + 'px'
  grid.style.left = x * 36 + 'px'
  return grid
}