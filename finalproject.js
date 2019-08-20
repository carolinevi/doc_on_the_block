var one = 0;
var time = 1000;
let i = 0
let imageArea=document.getElementById('name')

let images= ["onlinedoc.jpg","./whitepic.jpg", "./yellow.jpg"]
function changeImg() {
  imageArea.src = images[i]

  if (i < images.length - 1){
    i++;
  }else {
    i = 0;
  }
}
setInterval(changeImg,time)
