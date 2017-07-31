import './style.less'
import Chessboard from './chessboard'

const chessboard = new Chessboard()

// chessboard.renderDom()
chessboard.renderCanvas()

console.log(window.navigator.userAgent.toLowerCase())
console.log(window.devicePixelRatio)