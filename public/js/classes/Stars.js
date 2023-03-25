import Screen from "./Screen.js";
import Sprite from "./Sprite.js";
class Stars extends Screen {
    collisionCallback = null;
    speed = 1;
    spritesAmount = 450;
    /**
     * 
     * @param {HTMLElement} canvas 
     * @param {Function} initSpriteCallback 
     * @param {Function} drawSpriteCallback 
     * @param {Function} collisionCallback 
     * @param {Function} collisionCheckCallback 
     */
    constructor(canvas, defaultSpriteShape = null, initSpriteCallback = null, drawSpriteCallback = null, collisionCallback = null, collisionCheckCallback = null) {
        super(canvas, defaultSpriteShape, initSpriteCallback, drawSpriteCallback, collisionCheckCallback);
        this.collisionDetectionCallback = this.internalCollisionCheck;
        this.collisionCheckCallback = collisionCheckCallback;
        this.collisionCallback = collisionCallback;
    }
    init(shape = null, width = null, height = null) {
        if (!shape) shape = this.defaultSpriteShape;
        this.cWidth = width || canvas.width;
        this.cHeight = height || canvas.height;
        this.sprites = [];
        for (let i=0; i<this.spritesAmount; i++) {
            let sprite = new Sprite(shape);
            this.new(sprite);
            // warmup
            for (let ii=0; ii<80; ii++) {
                this.fly(sprite);
            }
            this.sprites.push(sprite);
            if (this.initSpriteCallback) {
                this.initSpriteCallback(sprite);
            }
        }
    }
    new(sprite) {
        sprite.r = 155 + Math.random() * 100;
        sprite.g = 155 + Math.random() * 100;
        sprite.b = 155 + Math.random() * 100;
        sprite.x = this.cWidth / 2 + Math.random() * 8 - 4;
        sprite.y = this.cHeight / 2 + Math.random() * 8 - 4;
        sprite.sx = Math.random() * 4 - 2;
        sprite.sy = Math.random() * 4 - 2;
        sprite.w = sprite.h = Math.random() * 1;
        sprite.a = 0.01;
    }
    fly(sprite) {
        let ax = sprite.x - this.cWidth / 2;
        let ay = sprite.y - this.cHeight / 2;
        sprite.x += ax / 100 * this.speed + sprite.sx;
        sprite.y += ay / 100 * this.speed + sprite.sy;
        sprite.w = sprite.h = Math.abs(ax / 50) + Math.abs(ay / 50);
        sprite.a = Math.abs(ax / 10) + Math.abs(ay / 10);
        if (sprite.x > this.cWidth + sprite.w || sprite.x < - sprite.w || sprite.y > this.cHeight + sprite.h || sprite.y < - sprite.h) {
            this.new(sprite);
          }
    }
    draw() {
        if (this.canvas?.getContext) {
          const ctx = this.context;
          ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

          for (let i in this.sprites) {
              let s = this.sprites[i];
              this.fly(s);
              if (this.drawSpriteCallback) {
                  this.drawSpriteCallback(s);
              }
              s.draw(ctx);
          }
          this.frame ++;
       }
    }
}
export default Stars;