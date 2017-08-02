import * as _ from '../util'

const btnRegret = document.getElementById('regret')
const btnRevoke = document.getElementById('revoke')
const btnRestart = document.getElementById('restart')
const btnSwitch = document.getElementById('switch')
const btnRandom = document.getElementById('random')


export function _initWatcher () {
  
  _.observe(this, 'canRegret', false, (value) => {
    console.log(this)
    if (!this.randomTimer && value) {
      btnRegret.removeAttribute('disabled')
    } else {
      btnRegret.setAttribute('disabled', true)
    }
  })

  _.observe(this, 'canRevoke', false, (value) =>{
    if (!this.randomTimer && value) {
      btnRevoke.removeAttribute('disabled')
    } else {
      btnRevoke.setAttribute('disabled', true)
    }
  })

  _.observe(this, 'canRestart', false, (value) => {
    console.log(value)
  })

}