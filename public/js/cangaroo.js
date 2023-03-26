import Bouncing from './classes/Bouncing.js'
import Screen from './classes/Screen.js';
import Stars from './classes/Stars.js';
import Matrix from './classes/Matrix.js';
import Boxes from './classes/Boxes.js';

let screen;
let events = 0;
  function onMouseMove(ev, canvas) {
//        let {offsetX, offsetY} = ev;
//        console.log(screen.getPixel(offsetX, offsetY));
  }
  function onCollision() {
    events++;
    document.getElementById("trackedEventName").innerHTML = 'Collisions';
    document.getElementById("trackedEventAmount").innerHTML = events;
  }
  function start(theme) {
    const canvas = document.getElementById("canvas");
    if (screen) {
      screen.destroy();
    }    
    if (theme == 'bouncing') {
      screen = new Bouncing(canvas, "ball", null, null, onCollision);
    } else if (theme == 'standard') {
      screen = new Screen(canvas);
    } else if (theme == 'stars') {
      screen = new Stars(canvas, "ball");
    } else if (theme == 'matrix') {
      screen = new Matrix(canvas, [0,1,2,3,4,5,6,7,8,9]);
    } else if (theme == 'boxes') {
      screen = new Boxes(canvas);
    }
    screen.init();
    screen.run();
  }
  window.startTheme = start;
  document.addEventListener("DOMContentLoaded", function () {
    start('bouncing');
    document.querySelectorAll('button.topic').forEach(
      button =>
        button.addEventListener("click", () => start(button.dataset.topic))


    );
  });
