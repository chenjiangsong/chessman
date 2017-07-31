import './style.less'
import Chessboard from './chessboard'
import Step from './step'


const chessboard = new Chessboard()
const step = new Step()

// chessboard.renderDom()
chessboard.renderCanvas()

// 绑定下棋事件
chessboard.bind('click', play)

// 绑定悔棋事件
document.getElementById('regret').addEventListener('click', regret)

// 绑定撤销悔棋事件
document.getElementById('revoke').addEventListener('click', revoke)

// 绑定重开一局事件
document.getElementById('restart').addEventListener('click', step.restart.bind(step))



// 下棋落子
function play (e) {
  const [x, y] = getGridXY(e)
  // dom渲染时 有可能点到背景上去
  if (!x || !y) return 
  step.displayInfo()
  step.nextStep(x, y).then((stepInfo) => {
    return chessboard.addChessman(stepInfo)
  }, () => {

  }).then(() => {
    step.checkWin(x, y)
  })
  
}

// 悔棋
function regret () {
  step.regret().then((regretStep) => {
    chessboard.removeChessman(regretStep)
  }, () => {
    console.log('无棋可悔')
  })
}

// 撤销悔棋
function revoke () {
  step.revoke().then((regretStep) => {
    chessboard.addChessman(regretStep)
  }, () => {
    console.log('无悔可撤')
  })
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
