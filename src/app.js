import './style.less'
import Chessboard from './chessboard'
import Step from './step'
import ObserveDisplay from './display'

// 实例化棋盘对象，用来绘制棋盘，绘制落子 悔棋等样式
const chessboard = new Chessboard()

// 实例化步数对象，处理下棋悔棋撤销等逻辑
const step = new Step()

ObserveDisplay(step)
step.on('displayWin', function () {
  chessboard.unbind('click', play)
})



// 选择dom渲染或canvas渲染
chessboard.renderDom()
// chessboard.renderCanvas()

// 绑定下棋事件
chessboard.bind('click', play)

// 绑定悔棋事件
document.getElementById('regret').addEventListener('click', regret)

// 绑定撤销悔棋事件
document.getElementById('revoke').addEventListener('click', revoke)

// 绑定重开一局事件
document.getElementById('restart').addEventListener('click', restart)

// 切换渲染方式
document.getElementById('switch').addEventListener('click', switchRender)


// 下棋落子 点击事件
function play (e) {
  const [x, y] = getGridXY(e)
  // 使用dom渲染时 有可能点到背景上去
  if (typeof x === 'undefined' || typeof y === 'undefined') return 

  console.log(x)
  step.nextStep(x, y).then((stepInfo) => {
    step.emit('displayInfo', stepInfo.player)
    return chessboard.addChessman(stepInfo)
  }, () => {
    console.log('点到怪地方去了')
  }).then(() => {
    step.emit('activateRegret')
    // 检查胜利条件
    if (step.checkWin(x, y)) {
      const player = - step.getNextPlayer()
      step.emit('displayWin', player)
    }
  })
  
}

// 悔棋 点击事件
function regret () {
  // 执行 step regret 方法后，在棋盘上移除棋子
  step.regret().then((regretStep) => {
    step.emit('displayInfo', -regretStep.player)
    chessboard.removeChessman(regretStep)
  }, () => {
    step.emit('disableRegret')
    console.log('无棋可悔')
  })
}

// 撤销悔棋 点击事件
function revoke () {
  // 执行 step revoke 方法后，在棋盘上添加棋子
  step.revoke().then((revokeStep) => {
    step.emit('displayInfo', revokeStep.player)
    chessboard.addChessman(revokeStep)
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


function switchRender () {
  chessboard.switchRender()
  // 重新绑定事件
  chessboard.bind('click', play)

  step.emit('displaySwitch', chessboard.getRenderType())

  step.emit('initInfo')

  step.init()
}

// 获取落子点的坐标
function getGridXY (e) {
  let x, y
  console.log(e)
  if (e.target.nodeName.toLowerCase() === 'canvas') {
    x = Math.floor(e.offsetX / 36)
    y = Math.floor(e.offsetY / 36)
  } else {
    const idGroup = e.target.id.split('-')
    x = idGroup[1]
    y = idGroup[2]
  }
  console.log(x, y)
  return [x, y]
}
