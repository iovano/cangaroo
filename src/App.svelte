<script>
    import css from './css/default.css'
    import Screen from './js/classes/Screen.js'
    let screen;
      function onMouseMove(ev, canvas) {
//        let {offsetX, offsetY} = ev;
//        console.log(screen.getPixel(offsetX, offsetY));
      }
      function onCollision(spriteA, spriteB, direction = null) {
        screen.sprites[spriteA].r = Math.random()*255;
        screen.sprites[spriteA].g = Math.random()*255;
        screen.sprites[spriteA].b = Math.random()*255;
        screen.sprites[spriteA].a = 1;
        if (spriteB) {
            screen.sprites[spriteB].r = Math.random()*255;
            screen.sprites[spriteB].g = Math.random()*255;
            screen.sprites[spriteB].b = Math.random()*255;
            screen.sprites[spriteB].a = 1;
        }
    }
      document.addEventListener("DOMContentLoaded", function () {
        const canvas = document.getElementById("canvas");
        screen = new Screen(canvas, onCollision);
        canvas.addEventListener("mousemove", function(event, canvas) {onMouseMove(event, canvas)});
        screen.init();
        run();
      });
      function run() {
        screen.draw();
        setTimeout(run, 20)
      }

</script>

<h1>Hello Svelte!</h1>


<canvas id="canvas" width="250" height="250">

</canvas>