import './style.less'
import Chessboard from './chessboard'
import Step from './step'


const chessboard = new Chessboard()
const step = new Step()

// chessboard.renderDom()
chessboard.renderCanvas()
chessboard.bind('click', play)

function play (e) {
  const [x, y] = getGridXY(e)
  
  // dom渲染时 有可能点到背景上去
  if (!x || !y) return 
  step.displayInfo()
  step.nextStep(x, y).then((stepInfo) => {
    return chessboard.addChessman(stepInfo)
  }, () => {

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
