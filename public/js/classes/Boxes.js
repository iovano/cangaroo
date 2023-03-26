import Screen from "./Screen.js";
import Sprite from "./Sprite.js";
class Boxes extends Screen {
    collisionCallback = null;
    speed = 1;
    spritesAmount = 150;
    infinity = true;
    warmupCycles = 0;
    pulseFrequency = 400;
    positionRange = {x: [0, "100%"], y: ["-50%", "90%"], grid: [12, 12]};
    speedRange = {x: [-3, 3], y: [-3, 3]}
    sizeRange = {x: [1, 10], y: [1, 10]}
    rgbaRange = {r: [55, 255], g: [155, 255], b: [55, 255], a: [0.1, 0.6]}
    /**
     * initialize one sprite
     * @param {Sprite} sprite 
     */
    new(sprite) {
        super.new(sprite);
    }
    moveSprite(sprite) {
        sprite.w += sprite.sx / 10 * (sprite.frame % this.pulseFrequency > this.pulseFrequency / 2 ? 1 : -1);
        sprite.h += sprite.sy / 10 * (sprite.frame % this.pulseFrequency > this.pulseFrequency / 2 ? 1 : -1);
        if (sprite.a < 0.01) {
            this.new(sprite);
        }
        super.moveSprite(sprite);
    }
}
export default Boxes;