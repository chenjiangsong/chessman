import './style.less'

function Chess (options) {
  this._init(options)
}

Chess.prototype = {
  constructor: Chess,
  ...require('./instance/init'),
  ...require('./instance/render'),
  ...require('./instance/events'),
  ...require('./instance/watcher'),
  ...require('./instance/step')
}

export default Chess