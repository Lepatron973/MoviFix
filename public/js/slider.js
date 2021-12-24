const slider = document.querySelector(".glide__slides");
const movieToDisplay = document.querySelectorAll('.slide').length
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

glide.mount()
