import Screen from "./Screen.js";
class Bouncing extends Screen {
    collisionCallback = null;
    spritesAmount = 30;
    /**
     * 
     * @param {HTMLElement} canvas 
     * @param {Function} initSpriteCallback 
     * @param {Function} drawSpriteCallback 
     * @param {Function} collisionCallback 
     * @param {Function} collisionCheckCallback 
     */
    constructor(canvas, defaultSpriteShape = null, initSpriteCallback = null, drawSpriteCallback = null, escapeSpriteCallback = null, collisionCallback = null, collisionCheckCallback = null) {
        super(canvas, defaultSpriteShape, initSpriteCallback, drawSpriteCallback, escapeSpriteCallback, collisionCheckCallback);
        this.collisionDetectionCallback = this.internalCollisionCheck;
        this.collisionCheckCallback = collisionCheckCallback;
        this.collisionCallback = collisionCallback;
    }
    /**
     * 
     * @param {int} spriteA 
     * @param {int} spriteB 
     * @param {int} direction (1 = horizontal, 2 = vertical, 3 = horizontal and vertical)
     * @returns {boolean|undefined}
     */
    onCollisionDetected(spriteA, spriteB, direction = null) {
        /* calls collisionCallback (if specified) and stops event Propagation if the callback returned "true" */
        if (this.collisionCallback && this.collisionCallback(spriteA, spriteB, direction) === true) {
            return true;
        }
        this.sprites[spriteA].r = Math.random()*255;
        this.sprites[spriteA].g = Math.random()*255;
        this.sprites[spriteA].b = Math.random()*255;
        this.sprites[spriteA].a = 1;
        if (spriteB) {
            this.sprites[spriteB].r = Math.random()*255;
            this.sprites[spriteB].g = Math.random()*255;
            this.sprites[spriteB].b = Math.random()*255;
            this.sprites[spriteB].a = 1;
        }
      }
    /**
     * 
     * @param {int} spriteNum 
     * @returns {boolean|undefined}
     */
    internalCollisionCheck(spriteNum) {
        /* calls collisionCheckCallback (if specified) and event stops Propagation if the callback returned "true" */
        if (this.collisionCheckCallback && this.collisionCheckCallback(spriteNum) === true) {
            return true;
        }
        let s = this.sprites[spriteNum]
        let collision = false;
        if (this.collisionDetectionMethod === 1) {
            /* checks if there already is content at the location of the sprite to be drawn next */
            if (this.getPixel(s.x,s.y,true) && s.sx < 0 || this.getPixel(s.x+s.w,s.y,true) && s.sx > 0) {
                s.sx = -s.sx;
                this.onCollisionDetected(spriteNum, null, 1);
            }
            if (this.getPixel(s.x,s.y,true) && s.sy < 0 || this.getPixel(s.x,s.y+s.h,true) && s.sx > 0) {
                s.sy = -s.sy;
                this.onCollisionDetected(spriteNum, null, 2);
            }
            if (this.getPixel(s.x+s.w,s.y+s.h,true)) {
                if (s.sy > 0) {
                    s.sy = -s.sy;
                    this.onCollisionDetected(spriteNum, null, 2);
                }
                if (s.sx > 0) {
                    s.sx = -s.sx;
                    this.onCollisionDetected(spriteNum, null, 1);
                }
            }   
        } else {
            /* checks if the sprite´s bounding box overlaps with other sprites */
            for (let i in this.sprites) {
                if (i === spriteNum) continue;
                let c = this.sprites[i];
                if (this.doSpritesCollide(s, c)) {
                    this.rebound(spriteNum, i);
                    this.onCollisionDetected(spriteNum, i, (s.x + s.w > c.x && s.x < c.x + c.w ? 1 : 0) + (s.y + s.h > c.y && s.y < c.y + c.h ? 2 : 0));
                }
            }
        }
    }
    /**
     * 
     * @param {int} spriteA 
     * @param {int} spriteA
     */
    rebound(spriteA, spriteB) {
        let s1 = this.sprites[spriteA];
        let s2 = this.sprites[spriteB];
        // Define the parameters for the balls
        const ball1 = {
            mass: s1.w*s1.h,
            position: [s1.x, s1.y],
            velocity: [s1.sx, s1.sy]
        };
        const ball2 = {
            mass: s2.w*s2.h,
            position: [s2.x, s2.y],
            velocity: [s2.sx, s2.sy]
        };
        
        // Calculate the distance and direction between the balls
        const dx = ball2.position[0] - ball1.position[0];
        const dy = ball2.position[1] - ball1.position[1];
        const distance = Math.sqrt(dx * dx + dy * dy);
        const direction = [dx / distance, dy / distance];
        
        // Calculate the velocity components along the direction of collision
        const v1 = ball1.velocity[0] * direction[0] + ball1.velocity[1] * direction[1];
        const v2 = ball2.velocity[0] * direction[0] + ball2.velocity[1] * direction[1];
        
        // Calculate the new velocities after the collision
        const newV1 = (ball1.mass * v1 + ball2.mass * (2 * v2 - v1)) / (ball1.mass + ball2.mass);
        const newV2 = (ball2.mass * v2 + ball1.mass * (2 * v1 - v2)) / (ball1.mass + ball2.mass);
        
        // Calculate the new velocity vectors for both balls
        const newVelocity1 = [
            ball1.velocity[0] + (newV1 - v1) * direction[0],
            ball1.velocity[1] + (newV1 - v1) * direction[1]
        ];
        const newVelocity2 = [
            ball2.velocity[0] + (newV2 - v2) * direction[0],
            ball2.velocity[1] + (newV2 - v2) * direction[1]
        ];
        
        this.sprites[spriteA].sx = newVelocity1[0];
        this.sprites[spriteA].sy = newVelocity1[1];
        this.sprites[spriteB].sx = newVelocity2[0];
        this.sprites[spriteB].sy = newVelocity2[1];
 
    }
}
export default Bouncing;