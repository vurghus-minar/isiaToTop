(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define([], factory());
  } else if (typeof module === 'object' && module.exports) {
      // Node. Does not work with strict CommonJS, but
      // only CommonJS-like environments that support module.exports,
      // like Node.
      module.exports = factory();
  } else {
      // Browser globals (root is window)
      root.isiaToTop = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  'use strict'
  console.log(self)
  const body = document.body
  const html = document.documentElement

  const windowHeight = window.innerHeight || html.clientHeight || body.clientHeight
  const documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)

  const defaults = {
    toTopElementTemplate: `<div id="isiaToTop" style="display: none">
                              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAVFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////8wXzyWAAAAG3RSTlMAAQIgJic0N0BHUVVZW1xdYm9wcXeFlZ2rrf2L0Jb5AAAAXElEQVQYV7XNRw6AMBBDURN673Xuf09IoiGjwBL+xtLbGPimYOmethH1nqnLfLVGNLyYVLUT+WrtiCqhbEB9qzPWEVidAY3RApO2mD9bjSkwCzOa6y1DiLIEv3QCJfQLDOsEaRoAAAAASUVORK5CYII=" alt="Scroll to top">
                          </div>`,
    scrollStartPosition: 50,
    toTopElement: 'isiaToTop',
    scrollAnimationSpeed: 500
  }

  let settings, toTopElement

  function _extend (target, defaults) {
    for (let i = 1; i < arguments.length; i++) {
      for (let key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          arguments[0][key] = arguments[i][key]
        }
      }
    }
    return arguments[0]
  }

  function _init (options) {
    settings = _extend({}, defaults, options)
    _bindEvents() 
  }

  function _bindEvents () {
    _onPageLoad()
    _onScroll()
    _onClick()
  }

  function _onPageLoad(){
    const toTopElementTemplate = settings.toTopElementTemplate
    if(typeof toTopElementTemplate === 'function'){
      toTopElementTemplate.call(this)
    } else if (typeof toTopElementTemplate === 'string') {
      body.insertAdjacentHTML('beforeend', toTopElementTemplate)
    }
    toTopElement = document.getElementById(settings.toTopElement)
  }

  function _onScroll (fn) {
    window.addEventListener('scroll', function () {
      const scrollPos = window.scrollY || window.scrollTop || document.getElementsByTagName('html')[0].scrollTop

      if (documentHeight > windowHeight) {
        scrollPos > settings.scrollStartPosition ? _showToTopElement() : _hideToTopElement()
      }
      if (typeof fn === 'function') {
        fn()
      }
    })
  }

  function _onClick (fn, override = false) {
    if (override) {
      if (typeof fn === 'function') {
        fn.call(this)
      }
    } else {
      toTopElement.addEventListener('click', function () {
        _onToTop(html, 0, settings.scrollAnimationSpeed)
        if (typeof fn === 'function') {
          fn.call(this)
        }
      })      
    }
  }

  function _scroll(){
    if(document.getElementById(settings.toTopElement).length !== 0){
      _onToTop()
    }
  }

  function _onToTop (element, to, duration) {
    let start = element.scrollTop
    let change = to - start
    let currentTime = 0
    let increment = 20

    const __animateScroll = function () {
      currentTime += increment
      const val = __easeInOutQuad(currentTime, start, change, duration)
      element.scrollTop = val
      if (currentTime < duration) {
        setTimeout(__animateScroll, increment)
      }
    }

    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    const __easeInOutQuad = function (t, b, c, d) {
      t /= d / 2
      if (t < 1) return c / 2 * t * t + b
      t--
      return -c / 2 * (t * (t - 2) - 1) + b
    }

    __animateScroll()
  }

  function _showToTopElement () {
    toTopElement.setAttribute('style', 'display:block')
  }

  function _hideToTopElement () {
    toTopElement.setAttribute('style', 'display: none;')
  }

  return {
    active: _init,
    onClick: _onClick,
    onScroll: _onScroll,
    scroll: _scroll
  }

}))