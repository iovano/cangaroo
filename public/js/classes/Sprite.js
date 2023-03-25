class Sprite {
    constructor(x = null, y = null, width = null, height = null, speedX = null, speedY = null, red = null, green = null, blue = null, alpha = null) {
        this.x = x;
        this.y = y;
        this.h = height;
        this.w = width;
        this.r = red;
        this.g = green;
        this.b = blue;
        this.a = alpha;
        this.sx = speedX;
        this.sy = speedY;
    }
}
export default Sprite;