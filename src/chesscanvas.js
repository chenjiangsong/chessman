const DPR = window.devicePixelRatio

export default class Chesscanvas {
  constructor (options) {
    this.options = Object.assign({
      size: 15,
      width: 540,
      height: 540,
      gridWidth: 36,
      gridheight: 36,
      backgroundColor: '#F9CC9D'
    }, options)

    this.ctx = options.ctx
  }

  renderChessboard () {
    const ctx = this.ctx
    const { size, width, height, gridWidth, gridheight } = this.options
    
    // 棋盘背景
    ctx.fillStyle = this.options.backgroundColor
    ctx.fillRect(0, 0, width * DPR, height * DPR)

    // 棋盘格子线
    const xPadding = (width - (size - 1) * gridWidth) / 2
    const yPadding = (height - (size - 1) * gridheight) / 2

    ctx.beginPath()
    ctx.lineWidth = 2
    
    // 横线
    for (let i = 0; i < size; i++) {
      const fromX = xPadding,
            fromY = yPadding + gridheight * i,
            toX = width - xPadding,
            toY = fromY
      this.drawLine(fromX,fromY, toX, toY)
    }
    // 纵线
    for (let j = 0; j < size; j++) {
      const fromX = xPadding + gridWidth * j,
            fromY = yPadding,
            toX = fromX,
            toY = height - yPadding
      this.drawLine(fromX,fromY, toX, toY)
    }

    ctx.stroke()
  }

  drawLine (fromX, fromY, toX, toY) {
    const ctx = this.ctx

    ctx.moveTo(fromX * DPR, fromY * DPR)
    ctx.lineTo(toX * DPR, toY * DPR)
  }
}