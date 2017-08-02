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

export function initRenderDom () {
  const $chessboard = this.$chessboard = document.createElement('div')
  $chessboard.id = 'chessboard'
  $chessboard.className = 'chessboard'
  this.$root.appendChild($chessboard)

  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
      $chessboard.appendChild(createGrid(i, j))
    }
  }
}