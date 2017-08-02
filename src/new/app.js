import Chess from './chess'

const chess = new Chess({
  id: 'chess',
  renderType: 'dom',
  click: function (e) {
    console.log(e.x, e.y)
  },
  regret: function () {

  }
})