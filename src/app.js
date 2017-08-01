import './style.less'

// 绑定悔棋事件
const btnRegret = document.getElementById('regret')
btnRegret.addEventListener('click', regret)


// 绑定撤销悔棋事件
const btnRevoke = document.getElementById('revoke')
btnRevoke.addEventListener('click', revoke)


// 绑定重开一局事件
const btnRestart = document.getElementById('restart')
btnRestart.addEventListener('click', restart)


// 切换渲染方式
const btnSwitch = document.getElementById('switch')
btnSwitch.addEventListener('click', switchRender)


// 随机落子测试
const btnRandom = document.getElementById('random')
btnRandom.addEventListener('click', randomDown)
// 随机落子定时器
let timer = null


// 实例化棋盘对象，用来绘制棋盘，绘制落子 悔棋等样式
import Chessboard from './chessboard'
const chessboard = new Chessboard()
// 选择dom渲染或canvas渲染
chessboard.renderDom()
// chessboard.renderCanvas()
// 绑定下棋事件
chessboard.bind('click', play)

// 实例化步数对象，处理下棋悔棋撤销等逻辑
import Step from './step'
const step = new Step()

// 引入信息板 
import info from './info'
info.on('displayWin', function () {
  chessboard.unbind('click', play)
  btnRegret.removeEventListener('click', regret)
  btnRevoke.removeEventListener('click', revoke)
})

// 下棋点击事件
function play (e) {
  const [x, y] = getGridXY(e)
  
  if (step.isGameOver()) return

    // 使用dom渲染时 有可能点到背景上去
  if (typeof x === 'undefined' || typeof y === 'undefined') return 
  
  downChess(x, y)
}

// 落子
function downChess (x, y) {
  step.nextStep(x, y).then((stepInfo) => {
    info.emit('displayInfo', stepInfo.player)
    return chessboard.addChessman(stepInfo)
  }, () => {
    console.log('点到怪地方去了')
  }).then(() => {

    // 落子后 激活悔棋按钮 禁用撤销悔棋
    !timer && info.emit('disableRevoke')
    !timer && info.emit('activateRegret')

    // 检查胜利条件
    if (step.checkWin(x, y)) {
      // 一方获胜 默认清除定时器
      clearInterval(timer)
      timer = null
      info.emit('stopRandom')

      // 获取 五子坐标，绘制获胜五子连线
      const winList = step.getWinList()
      chessboard.renderWinLine(winList)
      step.updateGameOver(true)

      const player = - step.getNextPlayer()
      info.emit('displayWin', player)
      info.emit('disableRegret')
    }
  })
}

// 悔棋 点击事件
function regret () {

  if (timer || !step.checkStepList()) return

    // 执行 step regret 方法后，在棋盘上移除棋子 并激活 撤销悔棋
  step.regret().then(({regretStep, noRegret}) => {
    chessboard.removeChessman(regretStep)
    
    info.emit('displayInfo', -regretStep.player)
    info.emit('activateRevoke')
    // 检测没有悔棋队列时， 禁用悔棋
    if (noRegret) {
      info.emit('disableRegret')
    }
  }, () => {
    console.log('无棋可悔')
  })
}

// 撤销悔棋 点击事件
function revoke () {
  if (!step.checkRegretList()) return

    // 执行 step revoke 方法后，在棋盘上添加棋子
  step.revoke().then(({revokeStep, noRevoke}) => {
    info.emit('displayInfo', revokeStep.player)
    chessboard.addChessman(revokeStep)

    // 检测没有撤销悔棋队列时， 禁用撤销悔棋
    if (noRevoke) {
      info.emit('disableRevoke')
    }
  }, () => {
    console.log('无悔可撤')
  })
}

// 重开 点击事件
function restart () {

  clearInterval(timer)
  timer = null

  // 重新渲染
  chessboard.reRender()

  // 重新绑定事件
  chessboard.bind('click', play)
  btnRegret.addEventListener('click', regret)
  btnRevoke.addEventListener('click', revoke)

  info.emit('initInfo')
  info.emit('disableRegret')
  info.emit('disableRevoke')

  step.init()
}

// 切换渲染方式 需重新绑定事件 chessboard.bind('click', play)
function switchRender () {
  const stepList = step.getStepList()

  chessboard.switchRender(stepList)

  if (step.isGameOver()) {
    const winList = step.getWinList()
    chessboard.renderWinLine(winList)
  }
  // 重新绑定事件
  chessboard.bind('click', play)

  info.emit('displaySwitch', chessboard.getRenderType())

}

/**
 * 随机落子测试
 * 当有定时器时， 关闭定时器，并检查step是否有后悔队列，有则激活悔棋按钮（一般情况都有）
 * 当没有定时器时，开启随机测试，并禁用悔棋和撤销按钮
 */
function randomDown () {
  
  if (step.isGameOver()) {
    restart()
  }

  if (timer) {
    clearInterval(timer)
    timer = null
    info.emit('stopRandom')
    if (step.checkStepList()) {
      info.emit('activateRegret')
    }
  } else {
    info.emit('disableRegret')
    info.emit('disableRevoke')
    info.emit('startRandom')
    timer = setInterval(function () {
      const x = Math.floor(Math.random()*15)
      const y = Math.floor(Math.random()*15)
      downChess(x, y)
    }, 100)
  }
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

