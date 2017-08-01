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
    this.gameover = false
    this.winList = Array.from({length: 5})
  }

  // 下一步
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
    const self = this
    x = parseInt(x)
    y = parseInt(y)
    // 判断上下限
    let left = x - 4 > 0 ? x - 4 : 0
    let right = x + 4 < 14 ? x + 4 : 14
    let top = y - 4 > 0 ? y - 4 : 0
    let bottom = y + 4 < 14 ? y + 4 : 14
    const player = self.getCurrentPlayer()

    if (isRow()) return true
    if (isColumn()) return true
    if (is45deg()) return true
    if (is135deg()) return true
    
    return false 
    
    // 横向判断
    function isRow () {
      let sum = 0
      for (let i = left; i < right + 1; i++) {
        const _thisChess = self.chess[i][y]
        sum = _thisChess === player ? sum + _thisChess : 0
     
        if (Math.abs(sum) === 5) {
          self.winList = Array.from({length: 5}).map((n, index) => {
            return {
              x: i - index,
              y: y,
              win: true
            }
          })
          return true
          break
        }
      }
      return false
    }

    // 纵向判断
    function isColumn () {
      let sum = 0
      for (let i = top; i < bottom + 1; i++) {
        const _thisChess = self.chess[x][i]
        sum = _thisChess === player ? sum + _thisChess : 0
        
        if (Math.abs(sum) === 5) {
          self.winList = Array.from({length: 5}).map((n, index) => {
            return {
              x: x,
              y: i - index,
              win: true
            }
          })
          return true
          break
        }
      }
      return false
    }

    // 45deg 
    function is45deg () {
      const leftPadding = (x - left) > (bottom - y) ? (bottom - y) : (x - left)
      const rightPadding = (right - x) > (y - top) ? (y - top) : (right - x)

      const _left = x - leftPadding
      const _bottom = y + leftPadding

      const len = leftPadding + rightPadding + 1
      let sum = 0
      for (let i = 0; i < len; i++) {
        const _thisChess = self.chess[_left+i][_bottom-i]
        sum = _thisChess === player ? sum + _thisChess : 0
        if (Math.abs(sum) === 5) {
          self.winList = Array.from({length: 5}).map((n, index) => {
            return {
              x: _left + i - index,
              y: _bottom - i + index,
              win: true
            }
          })
          return true
          break
        }
      }
      return false
    }

    // 135deg
    function is135deg () {
      const leftPadding = (x - left) > (y - top) ? (y - top) : (x - left)
      const rightPadding = (right - x) > (bottom - y) ? (bottom - y) : (right - x)

      const _left = x - leftPadding
      const _top = y - leftPadding
      const len = leftPadding + rightPadding + 1
      let sum = 0

      for (let i = 0; i < len; i++) {
        const _thisChess = self.chess[_left+i][_top+i]
        sum = _thisChess === player ? sum + _thisChess : 0
        if (Math.abs(sum) === 5) {
          self.winList = Array.from({length: 5}).map((n, index) => {
            const ret =  {
              x: _left + i - index,
              y: _top + i - index,
              win: true
            }
            return ret
          })

          return true
          break
        }
      }
      return false
    }
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

        if (self.steps.length) {
          resolve({regretStep})
        } else {
          resolve({regretStep, noRegret: true})
        }

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

        if (self.regretList.length) {
          resolve({revokeStep})
        } else {
          resolve({revokeStep, noRevoke: true})
        }
      } else {
        reject()
      }
    })
  }

  // 获取胜利棋子坐标数组
  getWinList () {
    return this.winList
  }

  // 检查当前位置有没有棋子
  checkCurrentStep (x, y) {
    return this.chess[x][y] === 0 ? false : true
  }

  // 获取当前执棋方
  getNextPlayer () {
    return this.currentStep % 2 === 0 ? BLACK : WHITE
  }

  // 获取当前落子方
  getCurrentPlayer () {
    return this.currentStep % 2 === 0 ? WHITE : BLACK
  }

  // 是否可悔棋
  checkStepList () {
    return this.steps.length ? true : false
  }

  // 是否可撤销悔棋
  checkRegretList () {
    return this.regretList.length ? true : false
  }

  // 获取步骤队列
  getStepList () {
    return this.steps
  }
  // 更新游戏状态
  updateGameOver (over) {
    this.gameover = over
  }

  // 返回游戏状态
  isGameOver () {
    return this.gameover
  }
}