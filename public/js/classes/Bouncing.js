import Screen from "./Screen.js";
class Bouncing extends Screen {
    collisionCallback = null;
    constructor(canvas, initSpriteCallback = null, drawSpriteCallback = null, collisionCallback = null) {
        super(canvas, initSpriteCallback, drawSpriteCallback);
        this.collisionDetectionCallback = this.collision;
        this.collisionCallback = collisionCallback;
    }
    collision(spriteNum) {
        let s = this.sprites[spriteNum]
        let collision = false;
        if (this.collisionDetectionMethod === 1) {
            if (this.getPixel(s.x,s.y,true) && s.sx < 0 || this.getPixel(s.x+s.w,s.y,true) && s.sx > 0) {
                s.sx = -s.sx;
                if (this.collisionCallback) {
                    this.collisionCallback(spriteNum, null, "horizontal");
                }
            }
            if (this.getPixel(s.x,s.y,true) && s.sy < 0 || this.getPixel(s.x,s.y+s.h,true) && s.sx > 0) {
                s.sy = -s.sy;
                if (this.collisionCallback) {
                    this.collisionCallback(spriteNum, null, "vertical");
                }
            }
            if (this.getPixel(s.x+s.w,s.y+s.h,true)) {
                if (s.sy > 0) {
                    s.sy = -s.sy;
                    if (this.collisionCallback) {
                        this.collisionCallback(spriteNum, null, "vertical");
                    }
                }
                if (s.sx > 0) {
                    s.sx = -s.sx;
                    if (this.collisionCallback) {
                        this.collisionCallback(spriteNum, null, "horizontal");
                    }
                }
            }   
        } else {
            for (let i in this.sprites) {
                if (i === spriteNum) continue;
                let c = this.sprites[i];
                if (s.x + s.w > c.x && s.x < c.x + c.w && s.y + s.h > c.y && s.y < c.y + c.h) {
                    this.rebound(spriteNum, i);
                    if (this.collisionCallback) {
                        this.collisionCallback(spriteNum, i);
                    }
                }
            }
        }
    }
    rebound(o1, o2) {
        let s1 = this.sprites[o1];
        let s2 = this.sprites[o2];
        // Define the parameters for the balls
        const ball1 = {
            mass: 1,
            position: [s1.x, s1.y],
            velocity: [s1.sx, s1.sy]
        };
        const ball2 = {
            mass: 1,
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
        
        this.sprites[o1].sx = newVelocity1[0];
        this.sprites[o1].sy = newVelocity1[1];
        this.sprites[o2].sx = newVelocity2[0];
        this.sprites[o2].sy = newVelocity2[1];
 
    }
}
export default Bouncing;