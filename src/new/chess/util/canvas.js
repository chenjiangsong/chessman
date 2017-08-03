const DPR = window.devicePixelRatio
const BLACK = 1, WHITE = 2
// 棋盘宽度高度
const WIDTH = 540, HEIGHT = 540

/**
 * canvas 创建棋盘
 * @param {*} self 
 * @param {*} defer  promise {resolve, reject}
 */
export function renderChessboardCanvas (self) {
  const $chessboard = self.chessboard = document.createElement('canvas')
  $chessboard.id = 'chessboard'
  $chessboard.className = 'chessboard'
  $chessboard.width = WIDTH * DPR
  $chessboard.height = HEIGHT * DPR
  self.$root.appendChild($chessboard)

  const ctx = self.ctx = $chessboard.getContext('2d')
  drawChessboard(ctx)
}

/**
 * 创建棋子
 * @param {*} ctx 
 * @param {*} x 
 * @param {*} y 
 * @param {*} player 
 */
export function renderChessmanCanvas (ctx, x, y, player) {
  const color = player === BLACK ? '#000' : '#FFF'
    // 计算圆心坐标
  x = x * 36 + 18
  y = y * 36 + 18
  drawCircle(ctx, x, y, color)
}

/**
 * 移除棋子
 * @param {*} ctx 
 * @param {*} x 
 * @param {*} y 
 * @param {*} player 
 */
export function removeChessmanCanvas (ctx, x, y, player) {
  const color = '#F9CC9D'
    // 计算圆心坐标
  x = x * 36 + 18
  y = y * 36 + 18
  clearCircle(ctx, x, y, color)
}

/**
 * 创建胜利圆点
 */

export function renderWinDotCanvas (ctx, wins, winner) {
  wins.forEach(function(step) {
    if (step.player === winner) {
        // 计算圆心坐标
      x = x * 36 + 18
      y = y * 36 + 18
      drawCircle(ctx, x, y, '#2d8cf0', 3)
    }
  }, this);
}


/**
 * 渲染棋盘
 * @param {*} ctx 
 */
export function drawChessboard (ctx) {
  // 棋盘背景
  ctx.fillStyle = '#F9CC9D'
  ctx.fillRect(0, 0, 540 * DPR, 540 * DPR)

  // 棋盘格子线
  const xPadding = 18
  const yPadding = 18

  ctx.beginPath()
  ctx.lineWidth = 1 * DPR
  
  // 横线
  for (let i = 0; i < 15; i++) {
    const fromX = xPadding,
          fromY = yPadding + 36 * i,
          toX = WIDTH - xPadding,
          toY = fromY
    drawLine(ctx, fromX,fromY, toX, toY)
  }
  // 纵线
  for (let j = 0; j < 15; j++) {
    const fromX = xPadding + 36 * j,
          fromY = yPadding,
          toX = fromX,
          toY = HEIGHT - yPadding
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
  radius = radius || 16
  // 清除包含棋子的矩形区域
  const data = [(x - radius) * DPR , (y - radius) * DPR, 2 * radius * DPR , 2 * radius * DPR]
  ctx.clearRect.apply(ctx, data)

  // 背景还原
  ctx.fillStyle = backgroundColor || '#F9CC9D'
  ctx.fillRect.apply(ctx, data)

  // 格线还原
  drawLine(ctx, x - radius, y, x + radius, y)
  drawLine(ctx, x, y - radius, x , y + radius)
}