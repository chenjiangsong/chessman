import Chess from './chess'
const playInfo = document.querySelector('.play-info')

/**
 * play,
 * regret,
 * revoke
 * 钩子函数 返回当前操作的棋子坐标
 */
const chess = new Chess({
  id: 'chess',
  renderType: 'canvas',
  play: function (step) {
    const {x, y, player} = step
    playInfo.innerHTML = `我在第${y+1}行第${x+1}列下了${player === 1 ? '黑' : '白'}子`
  },
  regret: function (step) {
    const {x, y, player} = step
    playInfo.innerHTML = `我在第${y+1}行第${x+1}列悔棋了${player === 1 ? '黑' : '白'}子`
  },
  revoke: function (step) {
    const {x, y, player} = step
    playInfo.innerHTML = `我在第${y+1}行第${x+1}列撤销悔棋了${player === 1 ? '黑' : '白'}子`
  }
})