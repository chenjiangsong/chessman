const DPR = window.devicePixelRatio
const BLACK = 1
const WHITE = -1

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

  renderCanvasChessman (stepInfo, resolve) {
    const { x, y, player, index} = stepInfo
    this._drawCircle(x, y, player)
    resolve()
  }

  removeCanvasChessman (stepInfo, resolve) {
    const { x, y, player, index} = stepInfo
    console.log(12121)
    this._clearCircle(x, y, player)
  }

  // 清除圆
  _clearCircle (x, y, player) {
    const ctx = this.ctx
    const radius = 16
    console.log(x, y)
    // 圆心坐标
    x = x * 36 + 18
    y = y * 36 + 18

    // 清除包含棋子的矩形区域
    const data = [(x - radius) * DPR , (y - radius) * DPR, 2 * radius * DPR , 2 * radius * DPR]
    ctx.clearRect.apply(ctx, data)

    // 背景还原
    ctx.fillStyle = this.options.backgroundColor
    ctx.fillRect.apply(ctx, data)

    // 格线还原
    ctx.beginPath()
    this.drawLine(x - radius, y, x + radius, y)
    this.drawLine(x, y - radius, x , y + radius)
    ctx.stroke()
    
  }

  // 画圆
  _drawCircle (x, y, player) {
    const ctx = this.ctx
    const radius = 16
    const startAngle = 0
    const endAngle = 2 * Math.PI
    const anticlockwise = true

    // 圆心坐标
    x = x * 36 + 18
    y = y * 36 + 18
    console.log(x, y)
    ctx.beginPath()
    ctx.fillStyle = player === BLACK ? '#000' : '#fff'
    ctx.arc(x * DPR, y * DPR, radius * DPR, startAngle, endAngle, anticlockwise);
    ctx.fill()
  }

  drawLine (fromX, fromY, toX, toY) {
    const ctx = this.ctx

    ctx.moveTo(fromX * DPR, fromY * DPR)
    ctx.lineTo(toX * DPR, toY * DPR)
  }
}