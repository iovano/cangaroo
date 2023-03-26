class Sprite {
    style = ''
    frame = 0;
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
    setStyle(value) {
        this.style = value;
    }
    draw(context) {
        this.frame ++;
        context.fillStyle = "rgba("+this.r+", "+this.g+", "+this.b+", "+this.a+")";
        if (this.shape === "ball") {
            context.beginPath();
            context.arc(this.x, this.y, this.w / 2, 0, 2 * Math.PI);
            context.fill();
        } else if (Array.isArray(this.shape)) {
            context.font = this.style;
            context.fillText(this.shape[Math.floor(Math.random()*this.shape.length)], this.x, this.y);
        } else {
            context.fillRect(this.x + this.w / 2, this.y + this.w / 2, this.w, this.h);
        }
    }

}
export default Sprite;