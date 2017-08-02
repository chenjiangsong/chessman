const DPR = window.devicePixelRatio

export function initRenderCanvas () {
  const $chessboard = this.chessboard = document.createElement('canvas')
  $chessboard.id = this.options.id
  $chessboard.className = 'chessboard'
  chessboard.width = width * DPR
  chessboard.height = height * DPR
  this.chessWrap.appendChild(chessboard)

  const ctx = this.ctx = chessboard.getContext('2d')

  painter.renderChessboard()
}

function drawChessboard (ctx) {
  const width = 540, height = 540
  // 棋盘背景
  ctx.fillStyle = '#F9CC9D'
  ctx.fillRect(0, 0, 540 * DPR, 540 * DPR)

  // 棋盘格子线
  const xPadding = 18
  const yPadding = 18

  ctx.beginPath()
  ctx.lineWidth = 1 * DPR
  
  // 横线
  for (let i = 0; i < size; i++) {
    const fromX = xPadding,
          fromY = yPadding + gridheight * i,
          toX = width - xPadding,
          toY = fromY
    drawLine(ctx, fromX,fromY, toX, toY)
  }
  // 纵线
  for (let j = 0; j < size; j++) {
    const fromX = xPadding + gridWidth * j,
          fromY = yPadding,
          toX = fromX,
          toY = height - yPadding
    drawLine(ctx, fromX,fromY, toX, toY)
  }

  ctx.stroke()
}
/**
 * canvas 画线
 * @param {canvas context} ctx 
 * @param {number} fromX 
 * @param {number} fromY 
 * @param {number} toX 
 * @param {number} toY 
 */
export function drawLine (ctx, fromX, fromY, toX, toY) {
  ctx.beginPath()
  ctx.lineWidth = 1 * DPR
  ctx.moveTo(fromX * DPR, fromY * DPR)
  ctx.lineTo(toX * DPR, toY * DPR)
  ctx.stroke()
}

/**
 * canvas 画圆
 * @param {canvas context} ctx 
 * @param {number} x  圆心X坐标
 * @param {number} y  圆心Y坐标
 * @param {string} color 
 * @param {number} radius 
 */
export function drawCircle (ctx, x, y, color, radius) {
  const startAngle = 0
  const endAngle = 2 * Math.PI
  const anticlockwise = true

  radius = radius || 16
  //x = x * 36 + 18
  //y = y * 36 + 18
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.arc(x * DPR, y * DPR, radius * DPR, startAngle, endAngle, anticlockwise)
  ctx.fill()
}

/**
 * 清除以x,y为圆心坐标的圆的外接矩形，并恢复背景色及棋盘格线
 * @param {canvas content} ctx 
 * @param {number} x 
 * @param {number} y 
 * @param {string} backgroundColor 棋盘背景色
 * @param {number} radius 
 */
export function clearCircle (ctx, x, y, backgroundColor, radius) {
  // 圆心坐标
  // x = x * 36 + 18
  // y = y * 36 + 18

  // 清除包含棋子的矩形区域
  const data = [(x - radius) * DPR , (y - radius) * DPR, 2 * radius * DPR , 2 * radius * DPR]
  ctx.clearRect.apply(ctx, data)

  // 背景还原
  ctx.fillStyle = backgroundColor
  ctx.fillRect.apply(ctx, data)

  // 格线还原
  drawLine(ctx, x - radius, y, x + radius, y)
  drawLine(ctx, x, y - radius, x , y + radius)
}