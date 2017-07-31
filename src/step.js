import EventEmitter from './events'

const BLACK = 1
const WHITE = -1

/**
 * 专注处理下棋逻辑 无dom操作 
 */
export default class Step extends EventEmitter {
  constructor () {
    super()
    this.init()
  }
  
  init () {
    this.player = BLACK
    this.currentStep = 0
    this.steps = []
    // 悔棋步 队列
    this.regretList = []
    // 二位数组 存储当前棋盘落子情况  无子为0 黑子为1 白子为-1
    this.chess = Array.from({length: 15}).map(n => {
      return Array.from({length: 15}).map(() => {
        return 0
      })
    })
  }

  nextStep (x, y) {
    const self = this
    x = parseInt(x)
    y = parseInt(y)
    return new Promise((resolve, reject) => {
      if (self.checkCurrentStep(x, y)) {
        reject()
      } else {
        const player = self.getNextPlayer()

        self.chess[x][y] = player
        self.currentStep++

        // 落子时 清空悔棋队列
        self.regretList = []

        // 缓存每步棋的信息，resolve出去添加棋子
        const stepInfo = {
          x,
          y,
          player,
          index: self.currentStep
        }
        self.steps.push(stepInfo)
        resolve(stepInfo)
      }
    })
  }
  
  // 检查胜利条件
  checkWin (x, y) {
    return true
  }

  // 信息板展示
  displayInfo () {
    const nextPlayer = this.getNextPlayer()
    const text = nextPlayer === BLACK ? '白方执棋' : '黑方执棋'
    this.infoBoard.innerHTML = text
  }

  // 悔棋
  regret () {
    const self = this
    return new Promise((resolve, reject) => {
      const regretStep = self.steps.pop()
      if (regretStep) {
        const { x, y } = regretStep
        self.chess[x][y] = 0
        self.currentStep--
        self.regretList.push(regretStep)
        resolve(regretStep)
      } else {
        reject()
      }
    })

  } 

  // 撤销悔棋
  revoke () {
    const self = this
    return new Promise((resolve, reject) => {
      const regretStep = self.regretList.pop()
      if (regretStep) {
        const { x, y, player } = regretStep

        self.chess[x][y] = player
        self.currentStep++
        self.steps.push(regretStep)
        resolve(regretStep)
      } else {
        reject()
      }
    })
    console.log('我撤销悔棋啦')
  }

  // 重开一局
  restart () {
    console.log('我重开一局啦')
  }
 
  // 检查当前位置有没有棋子
  checkCurrentStep (x, y) {
    return this.chess[x][y] === 0 ? false : true
  }

  getNextPlayer () {
    return this.currentStep % 2 === 0 ? BLACK : WHITE
  }

}