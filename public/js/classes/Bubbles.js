import Screen from "./Screen.js";
import Sprite from "./Sprite.js";
class Bubbles extends Screen {
    collisionCallback = null;
    speed = 1;
    frame = 0;
    grid = {x: 20, y: 20};
    cyclesMax = 0;
    phase = {duration: 30, sustain: "sync", pause: 0}; /* sustain === true prevents fadeout */
    direction = {x: -1, y: -1}
    defaultSpriteShape = "ball";
    offset = {x: 0, y: 0, w: 0, h: 0, a: 1};
    rgbaRange = {r: [55, 255], g: [155, 255], b: [55, 255], a: [0.1, 0.5]}
    onCycleCompleted = null;
    cycleCompleted = true;
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
        this.stats = {rows: Math.floor(this.cWidth / this.grid.x) + 1, cols: Math.floor(this.cHeight / this.grid.y) + 1};
        this.maxDelay=0;
        for (let x=0; x<=this.cWidth; x+=this.grid.x) {
            for (let y=0; y<=this.cHeight; y+=this.grid.y) {
                let sprite = new Sprite(shape);
                this.new(sprite);
                sprite.x = this.offset.x + (this.direction.x > 0 ? x : this.cWidth - x);
                sprite.y = this.offset.y + (this.direction.y > 0 ? y : this.cHeight - y);
                sprite.w = this.offset.w;
                sprite.h = this.offset.h;
                sprite.a = this.offset.a;
                sprite.delay = x / this.grid.x * Math.abs(this.direction.x) + y / this.grid.y * Math.abs(this.direction.y) + 1;
                if (this.initSpriteCallback) {
                    this.initSpriteCallback(sprite);
                }
                if (sprite.delay > this.maxDelay) {
                    this.maxDelay = sprite.delay;
                }
                this.sprites.push(sprite);
            }
        }
    }
    update() {
        this.frame ++;
        this.stats.asc = this.stats.max = this.stats.desc = this.stats.min = 0;
        super.update();
        if (this.stats.asc + this.stats.desc > 0) {
            this.cycleCompleted = false;
        } else if (this.cycleCompleted === false) {
            if (this.onCycleCompleted) {
                this.onCycleCompleted(this.stats);
            }
            this.cycleCompleted = (this.stats.max > 0) ? 1 : 2;
        }
    }
    moveSprite(sprite) {
        if (!this.cyclesMax || sprite.cycle < this.cyclesMax) {
            if (sprite.frame > sprite.delay) {
                if (sprite.frame < this.phase.duration + sprite.delay) {
                    /* grow */
                    sprite.w += this.speed;
                    sprite.h += this.speed;
                    this.stats.asc ++;
                } else if (sprite.frame < this.phase.duration + sprite.delay + (this.phase.sustain === "sync"?this.maxDelay:(this.phase.sustain ?? 0))) {
                    /* sustain */
                    this.stats.max ++;
                } else {
                    if (sprite.w >= 0 && sprite.h > 0) {
                        /* shrink */
                        sprite.w -= this.speed;
                        sprite.h -= this.speed;
                        this.stats.desc ++;
                    } else {
                        this.stats.min ++;
                    }
                }
                if (this.cycleCompleted === 2) {
                    sprite.frame = 0;
                    sprite.w = sprite.h = 0;
                    sprite.cycle += 1;
                }   
            }
        }
    }
}
export default Bubbles;