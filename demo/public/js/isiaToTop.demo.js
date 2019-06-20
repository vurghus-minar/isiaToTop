const options = {
  scrollStartPosition: 20,
  scrollAnimationSpeed: 1000,
  onClick: overrideClick,
  onScroll: function () {
    console.log('scrolled')
  }
}

isiaToTop.active(options)

function overrideClick(){
  console.log('bla')
  isiaToTop.scroll()  
}