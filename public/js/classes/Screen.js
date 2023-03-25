import Sprite from "./Sprite.js";
class Screen {
    cWidth = 250;
    cHeight = 250;
    speed = 3;
    frame = 0;
    sprites = [];
    spritesAmount = 50;
    canvas = null;
    imgData = null;
    collisionDetectionCallback = null;
    context = null;
    constructor(canvas, initSpriteCallback = null, drawSpriteCallback = null, collisionDetectionCallback = null) {
        this.canvas = canvas;
        this.collisionDetectionCallback = collisionDetectionCallback;
        this.initSpriteCallback = initSpriteCallback;
        this.drawSpriteCallback = drawSpriteCallback;
        this.context = this.canvas.getContext("2d", {willReadFrequently: true});
    }
    init(width = null, height = null) {
        this.cWidth = width || canvas.width;
        this.cHeight = height || canvas.height;
        for (let i=0; i<this.spritesAmount; i++) {
            let sprite = new Sprite(
                Math.random()*this.cWidth, 
                Math.random()*this.cHeight, 
                10, 
                10, 
                Math.random()*this.speed*2-this.speed, 
                Math.random()*this.speed*2-this.speed,
                Math.random()*255, 
                Math.random()*255, 
                Math.random()*255, 
                Math.random()
                );
            if (this.initSpriteCallback) {
                this.initSpriteCallback(sprite);
            }
            this.sprites.push(sprite);
        }
    }
    draw() {
          if (this.canvas.getContext) {
            const ctx = this.context;
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
            for (let i in this.sprites) {
                let s = this.sprites[i];
                ctx.fillStyle = "rgba("+s.r+", "+s.g+", "+s.b+", "+s.a+")";
                if (this.collisionDetectionCallback) {
                    this.collisionDetectionCallback(i);
                }
                s.x += s.sx;
                s.y += s.sy;
                if (s.x + s.w > this.cWidth && s.sx > 0 || s.x < 0 && s.sx < 0) {
                    s.sx = -s.sx;
                }
                if (s.y + s.h > this.cHeight && s.sy > 0 || s.y < 0 && s.sy < 0) {
                    s.sy = -s.sy;
                }
                if (this.drawSpriteCallback) {
                    this.drawSpriteCallback(s);
                }
                ctx.fillRect(s.x, s.y, s.w, s.h);
            }
            this.frame ++;
         }
      }
    getPixel (x, y, returnType = 'object') {
        const ctx = this.context;
        const data = ctx.getImageData(x, y, 1, 1).data;
        if (returnType === true) {
            return data[3] > 0;
        }
        return {red: data[0], green: data[1], blue: data[2], alpha: data[3]}
    };

}

export default Screen;