const BLACK = 1
const WHITE = -1

export default class Step {
  constructor () {
    this.player = BLACK
    this.currentStep = 0
    this.steps = []
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
        const len = self.steps.length
        const prevStep = self.steps[len]
        const player = self.getNextPlayer()
        self.chess[x][y] = player
        self.currentStep++
        
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
  checkWin () {
    
  }

  // 信息板展示
  displayInfo () {
    const infoBoard = document.querySelector('.play-info')
    const nextPlayer = this.getNextPlayer()
    const text = nextPlayer === BLACK ? '白方执棋' : '黑方执棋'
    infoBoard.innerHTML = text
  }

  // 检查当前位置有没有棋子
  checkCurrentStep (x, y) {
    return this.chess[x][y] === 0 ? false : true
  }

  getNextPlayer () {
    return this.currentStep % 2 === 0 ? BLACK : WHITE
  }

}