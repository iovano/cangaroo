class Sprite {
    style = ''
    frame = 0;
    static = false;
    blendMode = 'source-over';
    clip = false; // clip === true : alias for "blendMode='source-in"
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
    setStatic(value) {
        this.static = value;
    }
    isStatic() {
        return this.static === true;
    }
    setStyle(value) {
        this.style = value;
    }
    draw(context) {
        this.frame ++;
        context.globalCompositeOperation = this.clip === true ? 'source-in' : this.blendMode;
        context.fillStyle = "rgba("+this.r+", "+this.g+", "+this.b+", "+this.a+")";
        if (this.shape === "ball") {
            context.beginPath();
            if (this.w >= 0) {
                context.arc(this.x, this.y, this.w / 2, 0, 2 * Math.PI);
            }
            context.fill();
            context.closePath();
        } else if (Array.isArray(this.shape)) {
            context.font = this.style;
            context.fillText(this.shape[Math.floor(Math.random()*this.shape.length)], this.x, this.y);
        } else if (this.shape == "rect") {
            context.fillRect(this.x + this.w / 2, this.y + this.w / 2, this.w, this.h);
        } else if (this.shape instanceof Image) {
            if (this.shape.complete && this.shape.naturalHeight !==0) {
                context.drawImage(this.shape, this.x ?? 0, this.y ?? 0);
            }
        }
        context.globalCompositeOperation = 'source-over';
    }

}
export default Sprite;