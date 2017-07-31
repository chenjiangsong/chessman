import Chesscanvas from './chesscanvas'

const DPR = window.devicePixelRatio

export default class Chessboard {
  constructor (options) {
    this.options = Object.assign({
      wrapId: 'chess-wrap',
      id: 'chessboard',
      size: 15,
      backgroundColor: '#F9CC9D',
      width: 540,
      height: 540
    }, options)
    this.chessWrap = document.getElementById('chess-wrap')
    // this.chessboard = document.getElementById(this.options.id)
  }

  // dom 形式渲染
  renderDom () {
    if (this.chessboard) return 
    
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

  // canvas 形式渲染
  renderCanvas () {
    if (this.chessboard) return 
    const { width, height } = this.options
    
    const chessboard = this.chessboard = document.createElement('canvas')
    chessboard.id = this.options.id
    chessboard.className = 'chessboard'
    chessboard.width = width * DPR
    chessboard.height = height * DPR
    this.chessWrap.appendChild(chessboard)

    const ctx = this.ctx = chessboard.getContext('2d')

    const painter = new Chesscanvas({ctx})

    painter.renderChessboard()

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