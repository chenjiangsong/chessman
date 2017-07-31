import './style.less'
import Chessboard from './chessboard'
import Step from './step'

// 实例化棋盘对象，用来绘制棋盘，绘制落子 悔棋等样式
const chessboard = new Chessboard()

// 实例化步数对象，处理下棋悔棋撤销等逻辑
const step = new Step()

// 跟步数相关的信息展示（dom操作）  通过继承 EventEmitter 绑定在实例上
const infoBoard = document.querySelector('.msg-info')
const infoText = document.querySelector('.play-info')
const successBoard = document.querySelector('.msg-success')
const successText = document.querySelector('.success-info')

// 初始化
step.on('initInfo', function () {
  infoText.innerHTML = '黑方执棋'
  infoBoard.style.display = 'block'
  successBoard.style.display = 'none'
})

// 下一步展示
step.on('displayInfo', function (player) {
  infoText.innerHTML = player === -1 ? '黑方执棋' : '白方执棋'
  infoBoard.style.display = 'block'
  successBoard.style.display = 'none'
})

// 胜利展示
step.on('displayWin', function (player) {
  successText.innerHTML = player === 1 ? '黑方获胜' : '白方获胜'
  successBoard.style.display = 'block'
  infoBoard.style.display = 'none'

  chessboard.unbind('click', play)
})




// 切换dom渲染或canvas渲染
// chessboard.renderDom()
chessboard.renderCanvas()

// 绑定下棋事件
chessboard.bind('click', play)

// 绑定悔棋事件
document.getElementById('regret').addEventListener('click', regret)

// 绑定撤销悔棋事件
document.getElementById('revoke').addEventListener('click', revoke)

// 绑定重开一局事件
document.getElementById('restart').addEventListener('click', restart)



// 下棋落子 点击事件
function play (e) {
  const [x, y] = getGridXY(e)
  // 使用dom渲染时 有可能点到背景上去
  if (!x || !y) return 
  
  
  step.nextStep(x, y).then((stepInfo) => {
    step.emit('displayInfo', stepInfo.player)
    return chessboard.addChessman(stepInfo)
  }, () => {
    console.log('点到怪地方去了')
  }).then(() => {
    if (step.checkWin(x, y)) {
      step.emit('displayWin', 1)
    }
  })
  
}

// 悔棋 点击事件
function regret () {
  // 执行 step regret 方法后，在棋盘上移除棋子
  step.regret().then((regretStep) => {
    chessboard.removeChessman(regretStep)
  }, () => {
    console.log('无棋可悔')
  })
}

// 撤销悔棋 点击事件
function revoke () {
  // 执行 step revoke 方法后，在棋盘上添加棋子
  step.revoke().then((regretStep) => {
    chessboard.addChessman(regretStep)
  }, () => {
    console.log('无悔可撤')
  })
}

// 重开 点击事件
function restart () {
  // 重新渲染
  chessboard.reRender()

  // 重新绑定事件
  chessboard.bind('click', play)

  step.emit('initInfo')

  step.init()
}

// 获取落子点的坐标
function getGridXY (e) {
  let x, y
  if (e.target.nodeName.toLowerCase() === 'canvas') {
    x = Math.floor(e.offsetX / 36)
    y = Math.floor(e.offsetY / 36)
  } else {
    const idGroup = e.target.id.split('-')
    x = idGroup[1]
    y = idGroup[2]
  }
  
  return [x, y]
}
