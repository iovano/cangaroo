import Sprite from "./Sprite.js";
class Screen {
    cWidth = 250;
    cHeight = 250;
    frame = 0;
    sprites = [];
    spritesAmount = 50;
    defaultSpriteShape = null;
    canvas = null;
    collisionDetectionCallback = null;
    context = null;
    infinity = true;
    warmupCycles = 0;

    calculatedPositionRange = null;
    positionRange = {x: [0, "100%"], y: [0, "100%"]};
    speedRange = {x: [-3, 3], y: [-3, 3]};
    sizeRange = {x: [10, 10], y: [10, 10]};
    rgbaRange = {r: [0, 255], g: [0, 255], b: [0, 255], a: [0, 1]};
    /**
     * Screen constructor object: Attaches Screen instance to existing Canvas Object, defines default sprite shape and specifies optional event Callbacks
     * @param {HTMLObjectElement} canvas 
     * @param {object|string} defaultSpriteShape 
     * @param {Function} initSpriteCallback 
     * @param {Function} drawSpriteCallback 
     * @param {Function} collisionDetectionCallback 
     */
    constructor(canvas, defaultSpriteShape = "rect", initSpriteCallback = null, drawSpriteCallback = null, escapeSpriteCallback = null, collisionDetectionCallback = null) {
        this.canvas = canvas;
        this.defaultSpriteShape = defaultSpriteShape;
        this.collisionDetectionCallback = collisionDetectionCallback;
        this.initSpriteCallback = initSpriteCallback;
        this.drawSpriteCallback = drawSpriteCallback;
        this.escapeSpriteCallback = escapeSpriteCallback;
        this.context = this.canvas.getContext("2d", {willReadFrequently: true});
    }
    /**
     * cleans the screen.
     */
    destroy() {
        const ctx = this.context;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.sprites = [];
        this.canvas = null;
        this.frame = 0;
    }
    /**
     * specifies whether Sprites bounce off the Screen boundaries (infinity == false) or not (infinity == true)
     * @param {boolean} value 
     */
    setInfinity(value) {
        this.infinity = value;
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
        for (let i=0; i<this.spritesAmount; i++) {
            let sprite = new Sprite(shape);
            this.calculatePositionRange();
            this.new(sprite);
            // warmup
            for (let ii=0; ii<this.warmupCycles; ii++) {
                this.moveSprite(sprite);
            }
            if (this.initSpriteCallback) {
                this.initSpriteCallback(sprite);
            }
            this.sprites.push(sprite);
        }
    }
    /** 
     * calculates Position Range in relation to canvas dimensions
     */
    calculatePositionRange() {
        this.calculatedPositionRange = this.positionRange;
        if ((typeof this.positionRange.x[0] === 'string' || this.positionRange.x[0] instanceof String) && this.positionRange.x[0].slice(-1) == "%") {
            this.calculatedPositionRange.x[0] = this.cWidth * parseFloat(this.calculatedPositionRange.x[0].slice(0, -1)) / 100;
        }
        if ((typeof this.positionRange.x[1] === 'string' || this.positionRange.x[1] instanceof String) && this.positionRange.x[1].slice(-1) == "%") {
            this.calculatedPositionRange.x[1] = this.cWidth * parseFloat(this.calculatedPositionRange.x[1].slice(0, -1)) / 100;
        }
        if ((typeof this.positionRange.y[0] === 'string' || this.positionRange.y[0] instanceof String) && this.positionRange.y[0].slice(-1) == "%") {
            this.calculatedPositionRange.y[0] = this.cHeight * parseFloat(this.calculatedPositionRange.y[0].slice(0, -1)) / 100;
        }
        if ((typeof this.positionRange.y[1] === 'string' || this.positionRange.y[1] instanceof String) && this.positionRange.y[1].slice(-1) == "%") {
            this.calculatedPositionRange.y[1] = this.cHeight * parseFloat(this.calculatedPositionRange.y[1].slice(0, -1)) / 100;
        }
    }
    /**
     * reinitializes an existing sprite
     * @param {Sprite} sprite 
     */
    new(sprite) {
        sprite.frame = 0;
        if (this.calculatedPositionRange?.x && this.calculatedPositionRange?.y) {
            sprite.x = Math.random()*(this.calculatedPositionRange.x[1] - this.calculatedPositionRange.x[0]) + this.calculatedPositionRange.x[0];
            sprite.y = Math.random()*(this.calculatedPositionRange.y[1] - this.calculatedPositionRange.y[0]) + this.calculatedPositionRange.y[0]; 
    
        }
        if (this.calculatedPositionRange?.grid) {
            sprite.x = this.calculatedPositionRange.grid[0] ? Math.round(sprite.x / this.calculatedPositionRange.grid[0]) * this.calculatedPositionRange.grid[0] : Math.round(sprite.x / this.calculatedPositionRange.grid) * this.calculatedPositionRange.grid;
            sprite.y = this.calculatedPositionRange.grid[1] ? Math.round(sprite.y / this.calculatedPositionRange.grid[1]) * this.calculatedPositionRange.grid[1] : Math.round(sprite.x / this.calculatedPositionRange.grid) * this.calculatedPositionRange.grid;
        }
        if (Array.isArray(this.sizeRange)) {
            /* sizeRange is defined as a scalar Array [<min>, <max>], so width and height are meant to be equal */
            sprite.w = sprite.h = Math.random()*(this.sizeRange[1] - this.sizeRange[0]) + this.sizeRange[0];
        } else {
            /* sizeRange is defined as a object {x: [<min>,<max>], y: [<min>,<max>]} */
            sprite.w = Math.random()*(this.sizeRange.x[1] - this.sizeRange.x[0]) + this.sizeRange.x[0];
            sprite.h = Math.random()*(this.sizeRange.y[1] - this.sizeRange.y[0]) + this.sizeRange.y[0]; 
        }
        sprite.sx = this.speedRange.x ? (this.speedRange.x[1] ? (Math.random()*(this.speedRange.x[1] - this.speedRange.x[0])) : this.speedRange.x) + this.speedRange.x[0] : 0;
        sprite.sy = this.speedRange.y ? (this.speedRange.y[1] ? (Math.random()*(this.speedRange.y[1] - this.speedRange.y[0])) : this.speedRange.y) + this.speedRange.y[0] : 0;

        sprite.r = Math.random()*(this.rgbaRange.r[1] - this.rgbaRange.r[0]) + this.rgbaRange.r[0];
        sprite.g = Math.random()*(this.rgbaRange.g[1] - this.rgbaRange.g[0]) + this.rgbaRange.g[0]; 
        sprite.b = Math.random()*(this.rgbaRange.b[1] - this.rgbaRange.b[0]) + this.rgbaRange.b[0]; 
        sprite.a = Math.random()*(this.rgbaRange.a[1] - this.rgbaRange.a[0]) + this.rgbaRange.a[0];
    }
    /**
     * moves one sprite at its current speed
     * @param {Sprite} sprite 
     */
    moveSprite(sprite) {
        if (!sprite.static) {
            sprite.x += sprite.sx;
            sprite.y += sprite.sy;
            this.doesSpriteEscape(sprite);
        }
    }
    /**
     * checks whether a sprite escapes the given boundaries
     * @param {Sprite} sprite 
     */
    doesSpriteEscape(sprite) {
        if (this.infinity) {
            if (sprite.x > this.cWidth && sprite.sx > 0) {
                if (!this.escapeSpriteCallback || !this.escapeSpriteCallback(sprite, "+x")) {
                    sprite.x -= this.cWidth + sprite.w;
                }
            } else if (sprite.x < - sprite.w && sprite.sx < 0) {
                if (!this.escapeSpriteCallback || !this.escapeSpriteCallback(sprite, "-x")) {
                    sprite.x += this.cWidth + sprite.w;
                }
            }
            if (sprite.y > this.cHeight && sprite.sy > 0) {
                if (!this.escapeSpriteCallback || !this.escapeSpriteCallback(sprite, "+y")) {
                    sprite.y =- this.cHeight + sprite.h;
                }   
            } else if (sprite.y < - sprite.h && sprite.sy < 0) {
                if (!this.escapeSpriteCallback || !this.escapeSpriteCallback(sprite, "-y")) {
                    sprite.y += this.cHeight + sprite.h;
                }
            }
        } else {
            if (sprite.x + sprite.w > this.cWidth && sprite.sx > 0 || sprite.x < 0 && sprite.sx < 0) {
                if (!this.escapeSpriteCallback || !this.escapeSpriteCallback(sprite, sprite.sx > 0 ? "+x" : "-x")) {
                    sprite.sx = -sprite.sx;
                }
            }
            if (sprite.y + sprite.h > this.cHeight && sprite.sy > 0 || sprite.y < 0 && sprite.sy < 0) {
                if (!this.escapeSpriteCallback || !this.escapeSpriteCallback(sprite, sprite.sy > 0 ? "+y" : "-y")) {
                    sprite.sy = -sprite.sy;
                }
            }

        }
    }
    /**
     * checks if two sprites´ bounding boxes overlap
     * @param {Sprite} spriteA 
     * @param {Sprite} spriteB 
     * @returns {Boolean}
     */
    doSpritesCollide(spriteA, spriteB) {
        return (spriteA.x + spriteA.w > spriteB.x && spriteA.x < spriteB.x + spriteB.w && spriteA.y + spriteA.h > spriteB.y && spriteA.y < spriteB.y + spriteB.h);
    }
    /**
     * updates the canvas once
     * @returns 
     */
    update() {
        if (this.canvas?.getContext) {
          const ctx = this.context;
          ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          for (let i in this.sprites) {
              let sprite = this.sprites[i];
              /* calls collisionCallback (if specified) and stops event Propagation if the callback returned "true" */
              if (this.collisionDetectionCallback && this.collisionDetectionCallback(i) === true) {
                return true;
              }
              if (sprite.isStatic() === false) {
                this.moveSprite(sprite);
              }
              if (this.drawSpriteCallback) {
                  this.drawSpriteCallback(sprite);
              }
              sprite.draw(ctx);
          }
          this.frame ++;
       }
    }
    /**
     * starts scene (continuously calls update())
     */
    run() {
        this.update();
        setTimeout(() => {this.run()}, 20)
    }
    /**
     * retrieves the rgba value of a given pixel (or true/false depending on whether pixel´s alpha is > 0)
     * @param {number} x 
     * @param {number} y 
     * @param {object|returnType} returnType 
     * @returns 
     */
    getPixel (x, y, returnType = 'object') {
        const ctx = this.context;
        const data = ctx.getImageData(x, y, 1, 1).data;
        if (returnType === true) {
            return data[3] > 0;
        }
        return {red: data[0], green: data[1], blue: data[2], alpha: data[3]}
    };
    addImage(src, x = 0, y = 0, width = undefined, height = undefined, fixed = true, position = -1) {
        const img = new Image(width, height);
        img.src = src;
        const sprite = new Sprite(img);
        sprite.sx = sprite.sy = 0;
        sprite.setStatic(fixed);
        if (position == -1) {
            this.sprites.push(sprite);
        } else {
            this.sprites.splice(position, 0, sprite);
        }
        return sprite;
    }

}

export default Screen;