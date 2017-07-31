/**
 * 提示信息的dom事件订阅
 */

 export default function ObserveDisplay (step) {
  // 跟步数相关的信息展示（dom操作） 
  const infoBoard = document.querySelector('.msg-info')
  const infoText = document.querySelector('.play-info')
  const successBoard = document.querySelector('.msg-success')
  const successText = document.querySelector('.success-info')
  const switchText = document.querySelector('.msg-switch')

  const btnRegret = document.getElementById('regret')
  const btnRevoke = document.getElementById('revoke')
  const btnRestart = document.getElementById('restart')
  const btnSwitch = document.getElementById('switch')

  // 初始化
  step.on('initInfo', function () {
    infoText.innerHTML = '黑方执棋'
    infoBoard.style.display = 'block'
    successBoard.style.display = 'none'
  })

  // 下一步展示
  step.on('displayInfo', function (player) {
    infoText.innerHTML = player === -1 ? '黑方执棋' : '白方执棋'
    infoBoard.style.display = 'block'
    successBoard.style.display = 'none'
  })

  // 胜利展示
  step.on('displayWin', function (player) {
    successText.innerHTML = player === 1 ? '黑方获胜' : '白方获胜'
    successBoard.style.display = 'block'
    infoBoard.style.display = 'none'
  })

  // 切换
  step.on('displaySwitch', function (renderType) {
    const switchTo = renderType === 'dom' ? 'CANVAS' : 'DOM'
    switchText.innerHTML = `点击切换成${switchTo}渲染`
  })

  // 激活 悔棋按钮
  step.on('activateRegret', function () {
    btnRegret.removeAttribute('disabled')
  })

  // 禁用 悔棋按钮
  step.on('disableRegret', function () {
    btnRegret.setAttribute('disabled', true)
  })

}