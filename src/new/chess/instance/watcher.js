import { observe } from '../util/lang'

const btnRegret = document.getElementById('regret')
const btnRevoke = document.getElementById('revoke')
const btnRestart = document.getElementById('restart')
const btnSwitch = document.getElementById('switch')
const btnRandom = document.getElementById('random')


export function _initWatcher () {
  watchRegret(this)  
  watchRevoke(this)
  watchIsWin(this)
}

/**
 * 监听canRegret属性，控制悔棋按钮样式
 * @param {*} self 
 */
function watchRegret (self) {
  observe(self, 'canRegret', false, (value) => {
    console.log('canRegret',value)
    if (!self.randomTimer && value) {
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
    if (!self.randomTimer && value) {
      btnRevoke.removeAttribute('disabled')
    } else {
      btnRevoke.setAttribute('disabled', true)
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
      self.canRegret = false
      self.canRevoke = false
      console.log('赢啦赢啦')
    }
  })
}
