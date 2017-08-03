import Chess from './chess'

/**
 * play,
 * regret,
 * revoke
 * 钩子函数 返回当前操作的棋子坐标
 */
const chess = new Chess({
  id: 'chess',
  renderType: 'dom',
  play: function (step) {
    const {x, y, player} = step
    console.log(`我在第${y}行第${x}列下了${player === 1 ? '黑' : '白'}子`)
  },
  regret: function (step) {
    const {x, y, player} = step
    console.log(`我在第${y}行第${x}列悔棋了${player === 1 ? '黑' : '白'}子`)
  },
  revoke: function (step) {
    const {x, y, player} = step
    console.log(`我在第${y}行第${x}列撤销悔棋了${player === 1 ? '黑' : '白'}子`)
  }
})