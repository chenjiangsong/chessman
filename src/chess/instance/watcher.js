import { 
  observe,
  show,
  hide
} from '../util/lang'

const BLACK = 1, WHITE = 2

const btnRegret = document.getElementById('regret')
const btnRevoke = document.getElementById('revoke')
const btnRestart = document.getElementById('restart')
const btnSwitch = document.getElementById('switch')
const btnRandom = document.getElementById('random')

const successBlack = document.querySelector('.msg-success-black')
const successWhite = document.querySelector('.msg-success-white')
const infoBoard = document.querySelector('.msg-info')
const playInfo = document.querySelector('.play-info')

/**
 * 使用数据劫持监听
 * canRegret, canRevoke, restart, isWin 四个属性
 * 属性发生改变时，触发对应的dom操作回调函数，替代EventEmitter，简化step逻辑
 */
export function _initWatcher () {
  watchRegret(this)  
  watchRevoke(this)
  watchRestart(this)
  watchIsWin(this)
}

/**
 * 监听canRegret属性，控制悔棋按钮样式
 * @param {*} self 
 */
function watchRegret (self) {
  observe(self, 'canRegret', false, (value) => {
    if (value) {
      btnRegret.removeAttribute('disabled')
    } else {
      btnRegret.setAttribute('disabled', true)
    }
  })
}

/**
 * 监听canRevoke属性，控制撤销悔棋按钮样式
 * @param {*} self 
 */
function watchRevoke (self) {
  observe(self, 'canRevoke', false, (value) =>{
    if (value) {
      btnRevoke.removeAttribute('disabled')
    } else {
      btnRevoke.setAttribute('disabled', true)
    }
  })
}

/**
 * 监听restart属性，控制撤销悔棋按钮样式
 * @param {*} self 
 */
function watchRestart (self) {
  observe(self, 'restart', false, (value) =>{
    if (value) {
      self.restart = false
      playInfo.innerHTML = '黑方执棋'
      show(infoBoard)
      hide(successBlack)
      hide(successWhite)
    }
  })
}

/**
 * 监听isWin属性，控制赢棋后样式改变
 * @param {*} self 
 */
function watchIsWin (self) {
  observe(self, 'isWin', false, (value) =>{
    if (value) {
      const winner = self.steps.slice(-1)[0].player
      self.canRegret = false
      self.canRevoke = false
      hide(infoBoard)
      show(winner === BLACK ? successBlack : successWhite)
    }
  })
}
