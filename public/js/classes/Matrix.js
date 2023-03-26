import Screen from "./Screen.js";
import Sprite from "./Sprite.js";
class Matrix extends Screen {
    collisionCallback = null;
    speed = 1;
    spritesAmount = 250;
    infinity = true;
    warmupCycles = 0;
    fontStyle = "16px monospace"
    positionRange = {x: [0, "100%"], y: ["-50%", "90%"], grid: [12, 12]};
    speedRange = {y: [2, 6]}
    rgbaRange = {r: [55, 255], g: [155, 255], b: [55, 255], a: [0.1, 0.5]}
    /**
     * initialize one sprite
     * @param {Sprite} sprite 
     */
    new(sprite) {
        super.new(sprite);
        sprite.style = this.fontStyle;
    }
    moveSprite(sprite) {
        sprite.a = sprite.frame < 20 ? sprite.a * 1.05 : sprite.a / 1.04;
        if (sprite.a < 0.1) {
            this.new(sprite);
        }
        super.moveSprite(sprite);
    }
}
export default Matrix;