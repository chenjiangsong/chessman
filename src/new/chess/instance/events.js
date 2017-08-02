import * as _ from '../util'

export function _initEvent () {
  const self = this
  this.$chessboard.addEventListener('click',  (e) => {
    playChess.call(this, e)
  })

  document.getElementById('regret').addEventListener('click',  () => {
    if (!this.randomTimer && this.canRegret) {
      this._regretStep()
    }
  })
}

function playChess (e) {
  const [x, y] = _.getDownPosition(e)

  if (typeof x !== 'undefined' && typeof y !== 'undefined') {
    this._nextStep(x, y)
  }
}