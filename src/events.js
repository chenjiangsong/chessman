export default class EventEmitter {
  constructor () {
    this._events = {}
  }

  on (type, fn, ctx = this) {
    if (!this._events[type]) {
      this._events[type] = []
    }
    this._events[type].push([fn, ctx])
  }

  off (type, fn) {
    const _events = this._events[type]
    if (!_events) {
      return
    }
    let count = _events.length
    while (count--) {
      if (_events[count][0] === fn) {
        _events[count][0] === undefined
      }
    }
  }

  emit (type) {
    const _events = this._events[type]
    if (!_events) {
      return
    }
    let args = [...arguments]
    args.shift()
    Array.prototype.forEach.call(_events, function (event) {
      const [fn, ctx] = event
      if (fn) {
        fn.apply(ctx, args)
      }
    })
  }

  once (type, fn, ctx = this) {
    const _events = this._events[type]
    if (!_events) {
      return
    }
    let hired = false

    this.on(type, one)
    function one () {
      this.off(type, fn)
      if (!hired) {
        hired = true
        fn.apply(ctx, arguments)
      }
    }
  }
}