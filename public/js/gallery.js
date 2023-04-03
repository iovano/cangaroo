import Bubbles from "./classes/Bubbles.js";

let screen, blendImage;
let events = 0;
let images = ['images/example.png', 'images/example2.jpg', 'images/example3.jpg'];
let currentImage = 0;
function onCycleCompleted(stats) {
  currentImage ++;
  if (stats.max === 0) {
    console.log("min");
    screen.changeImage(blendImage, images[(currentImage) % images.length]);
    canvas.style.background="url("+images[(currentImage + images.length - 1) % images.length]+")";
  } else {
    console.log("max");
    screen.changeImage(blendImage, images[(currentImage - 1) % images.length]);
    canvas.style.background="url("+images[(currentImage) % images.length]+")";
  }
  console.log("cycle Completed "+(stats.max > 0));
}
function start(theme) {
  const canvas = document.getElementById("canvas");
  screen = new Bubbles(canvas);

  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;

  screen.init();
  blendImage = screen.addImage("images/example.png");
  blendImage.blendMode = 'source-in';
  screen.onCycleCompleted = onCycleCompleted;
  screen.run();
}
window.startTheme = start;
document.addEventListener("DOMContentLoaded", function () {
  start('bouncing');
});