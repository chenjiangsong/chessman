import './style.less'
import Chessboard from './chessboard'
import Step from './step'
import info from './info'

const btnRegret = document.getElementById('regret')
const btnRevoke = document.getElementById('revoke')
const btnRestart = document.getElementById('restart')
const btnSwitch = document.getElementById('switch')

// 实例化棋盘对象，用来绘制棋盘，绘制落子 悔棋等样式
const chessboard = new Chessboard()

// 实例化步数对象，处理下棋悔棋撤销等逻辑
const step = new Step()

// ObserveDisplay(step)
info.on('displayWin', function () {
  chessboard.unbind('click', play)
  btnRegret.removeEventListener('click', regret)
  btnRevoke.removeEventListener('click', revoke)
})



// 选择dom渲染或canvas渲染
chessboard.renderDom()
// chessboard.renderCanvas()

// 绑定下棋事件
chessboard.bind('click', play)

// 绑定悔棋事件
btnRegret.addEventListener('click', regret)

// 绑定撤销悔棋事件
btnRevoke.addEventListener('click', revoke)

// 绑定重开一局事件
btnRestart.addEventListener('click', restart)

// 切换渲染方式
btnSwitch.addEventListener('click', switchRender)


// 下棋落子 点击事件
function play (e) {
  const [x, y] = getGridXY(e)

  if (step.isGameOver()) return
  // 使用dom渲染时 有可能点到背景上去
  if (typeof x === 'undefined' || typeof y === 'undefined') return 

  step.nextStep(x, y).then((stepInfo) => {
    info.emit('displayInfo', stepInfo.player)
    return chessboard.addChessman(stepInfo)
  }, () => {
    console.log('点到怪地方去了')
  }).then(() => {

    // 落子后 激活悔棋按钮 禁用撤销悔棋
    info.emit('disableRevoke')
    info.emit('activateRegret')

    // 检查胜利条件
    if (step.checkWin(x, y)) {
      step.updateGameOver(true)
      const player = - step.getNextPlayer()
      info.emit('displayWin', player)
      info.emit('disableRegret')
    }
  })
  
}

// 悔棋 点击事件
function regret () {
  // 执行 step regret 方法后，在棋盘上移除棋子 并激活 撤销悔棋
  step.regret().then(({regretStep, noRegret}) => {
    chessboard.removeChessman(regretStep)
    
    info.emit('displayInfo', -regretStep.player)
    info.emit('activateRevoke')
    // 禁用悔棋
    if (noRegret) {
      info.emit('disableRegret')
    }
  }, () => {
    console.log('无棋可悔')
  })
}

// 撤销悔棋 点击事件
function revoke () {
  // 执行 step revoke 方法后，在棋盘上添加棋子
  step.revoke().then(({revokeStep, noRevoke}) => {
    info.emit('displayInfo', revokeStep.player)
    chessboard.addChessman(revokeStep)

    // 禁用撤销悔棋
    if (noRevoke) {
      info.emit('disableRevoke')
    }
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
  btnRegret.addEventListener('click', regret)
  btnRevoke.addEventListener('click', revoke)

  info.emit('disableRegret')
  info.emit('initInfo')
  info.emit('disableRevoke')

  step.init()
}


function switchRender () {
  const stepList = step.getStepList()

  chessboard.switchRender(stepList)
  // 重新绑定事件
  chessboard.bind('click', play)

  info.emit('displaySwitch', chessboard.getRenderType())

  // info.emit('initInfo')

  // step.init()
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
