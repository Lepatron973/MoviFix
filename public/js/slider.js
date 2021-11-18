const slider = document.querySelector(".glide__slides");
movieToDisplay = document.querySelectorAll('.slide').length
var glide = new Glide('.glide', {
  type: 'carousel',
  perView: 3,
  focusAt: 'center',
//   breakpoints: {
//     800: {
//       perView: 2
//     },
//     480: {
//       perView: 1
//     }
//   }
})

       console.log(movieToDisplay)        

glide.mount()
