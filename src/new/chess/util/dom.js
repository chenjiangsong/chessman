const BLACK = 1, WHITE = 2



/**
 * dom渲染棋盘
 * @param {obj} self 
 * @param {} defer  promise { resolve, reject }
 */
export function renderChessboardDom (self) {
  const $chessboard = self.$chessboard = document.createElement('div')
  $chessboard.id = 'chessboard'
  $chessboard.className = 'chessboard'
  self.$root.appendChild($chessboard)

  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
      $chessboard.appendChild(createGrid(i, j))
    }
  }
}

/**
 * 绘制棋子并添加到棋盘上
 * @param {*} x 
 * @param {*} y 
 * @param {*} player 
 */
export function renderChessmanDom (x, y, player) {
  const grid = document.getElementById(`grid-${x}-${y}`)
  const chessman = document.createElement('div')
  chessman.className = 'chessman'
  chessman.style.backgroundColor = player === BLACK ? 'black' : 'white'
  grid.appendChild(chessman)
}

export function removeChessmanDom (x, y, player) {
  const grid = document.getElementById(`grid-${x}-${y}`)
  grid.removeChild(grid.childNodes[0])
}
/**
 * 创建棋盘格
 * @param {*} x 
 * @param {*} y 
 */
export function createGrid (x, y) {
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