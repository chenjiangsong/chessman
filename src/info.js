/**
 * 提示信息的dom事件订阅
 */
import EventEmitter from './events'
const info = new EventEmitter()

// 跟步数相关的信息展示（dom操作） 
const infoBoard = document.querySelector('.msg-info')
const infoText = document.querySelector('.play-info')
const successBoard = document.querySelector('.msg-success')
const successText = document.querySelector('.success-info')
const switchText = document.querySelector('.msg-switch')
const randomText = document.querySelector('.msg-random')


const btnRegret = document.getElementById('regret')
const btnRevoke = document.getElementById('revoke')
const btnRestart = document.getElementById('restart')
const btnSwitch = document.getElementById('switch')
const btnRandom = document.getElementById('random')

// 初始化
info.on('initInfo', function () {
  infoText.innerHTML = '黑方执棋'
  infoBoard.style.display = 'block'
  successBoard.style.display = 'none'
})

// 下一步展示
info.on('displayInfo', function (player) {
  infoText.innerHTML = player === -1 ? '黑方执棋' : '白方执棋'
  infoBoard.style.display = 'block'
  successBoard.style.display = 'none'
})

// 胜利展示
info.on('displayWin', function (player) {
  successText.innerHTML = player === 1 ? '黑方获胜' : '白方获胜'
  successBoard.style.display = 'block'
  infoBoard.style.display = 'none'
})

// 切换
info.on('displaySwitch', function (renderType) {
  const switchTo = renderType === 'dom' ? 'CANVAS' : 'DOM'
  switchText.innerHTML = `点击切换成${switchTo}渲染`
})

// 激活 悔棋按钮
info.on('activateRegret', function () {
  btnRegret.removeAttribute('disabled')
})

// 禁用 悔棋按钮
info.on('disableRegret', function () {
  btnRegret.setAttribute('disabled', true)
})

// 激活撤销悔棋
info.on('activateRevoke', function () {
  btnRevoke.removeAttribute('disabled')
})

// 禁用 撤销悔棋
info.on('disableRevoke', function () {
  btnRevoke.setAttribute('disabled', true)
})

info.on('startRandom', function () {
  randomText.innerHTML = '停止随机落子测试'
})

info.on('stopRandom', function () {
  randomText.innerHTML = '启动随机落子测试'
})

export default info