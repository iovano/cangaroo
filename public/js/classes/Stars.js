import Screen from "./Screen.js";
import Sprite from "./Sprite.js";
class Stars extends Screen {
    collisionCallback = null;
    speed = 1;
    spritesAmount = 450;
    regression = false;
    infinity = true;
    warmupCycles = 80;
    sizeRange = [0, 2]
    rgbaRange = {r: [155, 255], g: [155, 255], b: [155, 255], a: [0.01, 0.01]}
    /**
     * initialize one sprite
     * @param {Sprite} sprite 
     */
    new(sprite) {
        super.new(sprite);
        sprite.x = this.cWidth / 2 + Math.random() * 8 - 4;
        sprite.y = this.cHeight / 2 + Math.random() * 8 - 4;
    }
    /**
     * if set to "true", objects will not disappear once they reach the boundaries, but float back
     * @param {Boolean} value 
     */
    setRegression(value) {
        this.regression = value;
    }
    /**
     * moves one Sprite
     * @param {Sprite} sprite 
     */
    moveSprite(sprite) {
        if (this.regression) {
            super.moveSprite(sprite);
        }
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
}
export default Stars;