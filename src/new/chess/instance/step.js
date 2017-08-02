
const BLACK = 1, WHITE = 2

export function _nextStep(x, y) {
  if (this.chess[x][y] !== 0) {
    return 
  }
  const nextPlayer = _getNextPlayer.call(this)
  
  this._addChessman(x, y, nextPlayer)
  this.steps.push({
    x: x,
    y: y,
    player: nextPlayer
  })
  this.canRegret = true
}


function _getNextPlayer () {
  const len = this.steps.length
  if (!len) {
    return BLACK
  } else {
    return this.steps[len - 1].player === BLACK ? WHITE : BLACK
  }
}