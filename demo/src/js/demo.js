const options = {
  scrollStartPosition: 20,
  scrollAnimationSpeed: 1000
}

isiaToTop.active(options)

//API
isiaToTop.onClick(function () {
  console.log('bla')
})

isiaToTop.onScroll(function () {
  console.log('scrolled')
})