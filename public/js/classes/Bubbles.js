import Screen from "./Screen.js";
import Sprite from "./Sprite.js";
class Bubbles extends Screen {
    collisionCallback = null;
    speed = 1;
    grid = {x: 20, y: 20};
    cyclesMax = 0;
    phase = {duration: 30, pause: 0};
    direction = {x: -1, y: -1}
    defaultSpriteShape = "ball";
    rgbaRange = {r: [55, 255], g: [155, 255], b: [55, 255], a: [0.1, 0.5]}
    new(sprite) {
        super.new(sprite);
        sprite.frame = 0;
        sprite.cycle = 0;
    }
    /**
     * initializes the Screen object
     * @param {object} shape 
     * @param {number} width 
     * @param {number} height 
     */
    init(shape = null, width = null, height = null) {
        if (!shape) shape = this.defaultSpriteShape;
        this.cWidth = width || canvas.width;
        this.cHeight = height || canvas.height;
        this.sprites = [];
        this.rows=0;
        this.cols=0;
        for (let x=0; x<this.cWidth; x+=this.grid.x) {
            for (let y=0; y<this.cHeight; y+=this.grid.y) {
                let sprite = new Sprite(shape);
                this.new(sprite);
                sprite.x = this.direction.x > 0 ? x : this.cWidth - x;
                sprite.y = this.direction.y > 0 ? y : this.cHeight - y;
                sprite.w = 0;
                sprite.h = 0;
                sprite.a = 1;
                sprite.delay = x / this.grid.x * Math.abs(this.direction.x) + y / this.grid.y * Math.abs(this.direction.y);
                if (this.initSpriteCallback) {
                    this.initSpriteCallback(sprite);
                }
                this.sprites.push(sprite);
                this.cows++;
            }
            this.rows++;
        }
        if (!this.cycleDuration) {
            this.cycleDuration = this.cWidth / this.grid.x * this.cHeight / this.grid.y * 2;
        }
    }
    moveSprite(sprite) {
        if (!this.cyclesMax || sprite.cycle < this.cyclesMax) {
            if (sprite.frame > sprite.delay) {
                sprite.w += sprite.frame < this.phase.duration + sprite.delay ? this.speed : -this.speed;
                sprite.h += sprite.frame < this.phase.duration + sprite.delay ? this.speed : -this.speed;
                if (sprite.frame > Math.max(this.rows,this.cols) * 2 + this.phase.duration * 2 + this.phase.pause) {
                    sprite.frame = 0;
                    sprite.w = sprite.h = 0;
                    sprite.cycle += 1;
                }   
            }
        }
    }
}
export default Bubbles;