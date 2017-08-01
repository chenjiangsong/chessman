# 五子棋
本五子棋游戏目前除了正常的下棋、悔棋、撤销悔棋功能之外，还有以下两个功能:
> 1. 保留棋局的同时切换dom和canvas渲染
> 2. 随机落子测试


demo页：https://chenjiangsong.github.io/chessman/

本地启动： 
```js
npm run dev
```

## useAge

```js
// 实例化棋盘对象，用来绘制棋盘，绘制落子 悔棋等样式
import Chessboard from './chessboard'
const chessboard = new Chessboard()
// 选择dom渲染或canvas渲染
chessboard.renderDom()
// chessboard.renderCanvas()
// 绑定下棋事件
chessboard.bind('click', play)
```

```js
// 实例化步数对象，处理下棋悔棋撤销等逻辑
import Step from './step'
const step = new Step()
```


Chessboard类控制棋盘样式渲染，主要API如下:
> 1. renderDom() 使用dom来渲染棋盘和棋子
> 2. renderCanvas() 使用canvas来渲染棋盘棋子
> 3. addChessman() 绘制落子效果
> 4. removeChessman() 移除棋子
> 5. bind() 给棋盘添加事件
> 6. reRender() 重新绘制棋盘
  
Step类控制落子、悔棋、撤销悔棋等逻辑，主要API如下：
> 1. addNextStep() 下棋
> 2. checkWin() 检测胜利条件
> 3. regret() 悔棋
> 4. revoke() 撤销悔棋

info是EventEmitter的一个实例，主要用来处理棋盘上的信息展示和dom操作，使下棋逻辑和棋盘绘制能和**不相干**的dom完全分开