const CHARACTERS = {
  terje: 'https://ca.slack-edge.com/T1BUR6JUS-UNNQBG2RG-3d3df4e4a1e7-512',
  default: 'https://vignette.wikia.nocookie.net/among-us-wiki/images/a/ab/Cyan.png/revision/latest/scale-to-width-down/200?cb=20200516162803',
}

class Imposter extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.run()
  }
  connectedCallback() {
    for(const [key, val] of Object.entries(this.state)) {
      this.setAttribute(key, val)
    }
  }
  static get observedAttributes() {
    return ['name', 'imposter']
  }
  attributeChangedCallback(attr, from, to) {
    if(from && to) {
      this.saveState(attr, to)
    }
    this.run()
  } 
  saveState(key, value) {
    // Why did I even care about implementing state?
    const state = this.state
    state[key] = value
    localStorage.savedState = JSON.stringify(state)
  }
  hasCharacter(name) {
    // Probably the most useless function ever, but why not. #futureproofing
    return !!CHARACTERS[name.toLowerCase()]
  }
  character(name) {
    return CHARACTERS[name.toLowerCase()] || CHARACTERS['default']
  }
  run() {
    Object.assign(this, {
      ...this.attributesToObject,
    })
    // Yeah, I didn't bother with real templating. #whatever
    this.shadowRoot.innerHTML = TEMPLATE.call(this)
  }
  set imposter(value) {
    this._imposter = value === 'true'
  }
  get imposter() {
    return this._imposter
  }
  get attributesToObject() {
    // Abstraction so you don't have to figure out
    // what this reducer is trying to do. Real MVP right here.
    return this.getAttributeNames()
      .reduce((result, curr) => {
        result[curr] = this.getAttribute(curr)
        return result
      },{})
  }
  get state() {
    // I regret this.
    try {
      return JSON.parse(localStorage.savedState)
    } catch(e) {
      return { name: 'enter your name', imposter: 'true' }
    }
  }
}


// CSS thingy. Code highlighting is for newbz.
const STYLES = `
  :host {
    font-family: sans-serif;
  }
  .imposter > img {
    height: 150px;
  }
  .imposter > h2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    color: red;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  }
  .imposter {
    height: 150px;
    animation-name: votedOut;
    animation-duration: 5s;
    animation-timing-function: linear;
    position: fixed;
    top: 45%;
    right: calc(100%  + 200px);
  }
  h1 {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: bold;
    font-family: sans-serif;
    animation-name: fadeIn;
    animation-duration: 1.5s;
    animation-delay: 2.5s;
    opacity: 0;
    animation-fill-mode: forwards;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes votedOut{
    from {
      transform: rotateZ(0deg);
      right: calc(100%  + 200px);
    }
    to {
      transform: rotateZ(1080deg);
      right: -200px;
    }
  }
`

// You don't deserve HTML highlighting anyways
const TEMPLATE = function() {
  return `
    <style>
      ${STYLES}
    </style>
    <div class="imposter">
      <img src="${this.character(this.name)}">
      <h2>${!this.hasCharacter(this.name) ? this.name : ''}</h2>
    </div>
    
    <h1>${this.name} was ${!Boolean(this.imposter) ? 'not' : ''} the imposter...</h1>
  `
}

// Register this revolutionising component
customElements.define('slack-imposter', Imposter)




// Bunch of global spaghetti hackz down here..
// Don't read it. Trust me, you don't want to.





// You can still turn around.





// Ok then..
function changeThings() {
  const el = document.querySelector('slack-imposter')
  el.setAttribute('name', this.imposterName.value)
  el.setAttribute('imposter', this.imposterState.checked)
}

const el = document.querySelector('slack-imposter')
const boostrapState = el.state
this.imposterName.value = boostrapState.name
if(boostrapState.imposter === 'true') {
  this.imposterState.setAttribute('checked', 'checked')
} else {
  this.imposterState.removeAttribute('checked')
}

// What a waste of time. Both me and you, if you read all the way down here.
