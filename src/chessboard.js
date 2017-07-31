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
    this.chessboardType = ''
    // 是否已绑定事件
    this.hasClickHandle = false
  }

  // dom 渲染
  renderDom () {
    if (this.chessboard) return 
    
    this.chessboardType = 'dom'
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

    this.chessboardType = 'canvas'
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

  reRender () {
    // 父容器中移除 this.chessboard
    this.chessWrap.removeChild(this.chessboard)
    this.chessboard = null
    // 根据之前的渲染方式重新渲染
    if (this.chessboardType === 'dom') {
      this.renderDom()
    } else {
      this.renderCanvas()
    }
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
      if (self.chessboardType === 'dom') {
        self._renderDomChessman(stepInfo)
        resolve()
      } else {
        self.painter.renderCanvasChessman(stepInfo, resolve)
      }
    })
  }

  _renderDomChessman (stepInfo) {
    const {x, y, player, index} = stepInfo
    const grid = document.getElementById(`grid-${x}-${y}`)
    const chessman = document.createElement('div')
    // chessman.id = `chessman-${x}-${y}`
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
      if (self.chessboardType === 'dom') {
        console.log(12)
        self._removeDomChessman(stepInfo)
        resolve()
      } else {
        console.log(11)
        self.painter.removeCanvasChessman(stepInfo, resolve)
      }
    })
  }

  _removeDomChessman(stepInfo) {
    const {x, y, player, index} = stepInfo
    const grid = document.getElementById(`grid-${x}-${y}`)
    grid.removeChild(grid.childNodes[0])
  }

  bind (event, fn) {
    // 防止重复绑定事件
    // if (this.hasClickHandle) return
    // this.hasClickHandle = true
    this.chessboard.addEventListener(event, fn)
  }

  unbind(event, fn) {
    // this.hasClickHandle = false
    this.chessboard.removeEventListener(event, fn)
  }
}


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