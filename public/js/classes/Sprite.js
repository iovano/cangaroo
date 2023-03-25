class Sprite {
    constructor(shape = "rect", x = null, y = null, width = null, height = null, speedX = null, speedY = null, red = null, green = null, blue = null, alpha = null) {
        this.shape = shape;
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
    draw(context) {
        context.fillStyle = "rgba("+this.r+", "+this.g+", "+this.b+", "+this.a+")";
        if (this.shape === "ball") {
            context.beginPath();
            context.arc(this.x, this.y, this.w / 2, 0, 2 * Math.PI);
            context.fill();
        } else {
            context.fillRect(this.x, this.y, this.w, this.h);

        }
    }

}
export default Sprite;