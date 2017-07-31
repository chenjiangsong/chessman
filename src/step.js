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
        console.log('??')
        reject()
      } else {
        console.log('11')
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
    console.log(x, y)
    const self = this
    
    // 判断上下限
    let left = x - 4 > 0 ? x - 4 : 0
    let right = x + 4 < 14 ? x + 4 : 14
    let top = y - 4 > 0 ? y - 4 : 0
    let bottom = y + 4 < 14 ? y + 4 : 14

    // if (isRow()) return true
    if (isColumn()) return true
    
    // 横向判断
    function isRow () {
      let sum = 0
      for (let i = left; i < right; i++) {
        sum += self.chess[i][y]
        if (Math.abs(sum) === 5) {
          return true
          break
        }
      }
      return false
    }

    // 纵向判断
    function isColumn () {
      let sum = 0
      for (let i = top; i < bottom; i++) {
        sum += self.chess[x][i]
        if (Math.abs(sum) === 5) {
          return true
          break
        }
      }
      return false
    }
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
      const revokeStep = self.regretList.pop()
      if (revokeStep) {
        const { x, y, player } = revokeStep

        self.chess[x][y] = player
        self.currentStep++
        self.steps.push(revokeStep)
        resolve(revokeStep)
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

  // 获取当前执棋方
  getNextPlayer () {
    return this.currentStep % 2 === 0 ? BLACK : WHITE
  }

}