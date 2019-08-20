var rightButton = document.getElementById('right')
var leftButton = document.getElementById('left')
var slideShow = document.getElementById('slideshow1')
let counter = 0
const photos = ["https://labblog.uofmhealth.org/sites/lab/files/2017-07/MichiganMed_L_GME%20OP-ED%401x.jpg", "https://png.pngtree.com/png-clipart/20190118/ourlarge/pngtree-doctors-hand-drawn-doctor-medical-patient-png-image_457309.jpg", "https://png.pngtree.com/element_our/png_detail/20181029/online-doctor-appointment-background-with-mobile-phone-interface-with-heart-rate-png_193866.jpg"]

rightButton.addEventListener("click", function(e){
  if (counter < photos.length - 1) counter +=1
  else counter = 0

  slideShow.src = photos[counter]
})
leftButton.addEventListener("click", function(e){
  if (counter > 0) counter -=1
  else counter = photos.length - 1

  slideShow.src = photos[counter]
})
