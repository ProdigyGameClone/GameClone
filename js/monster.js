class Monster {
    constructor(bodyImage, headImage, weaponsImage, canvas, context, pos, size, speed, jumpHeight) {
        this.bodyImage = bodyImage;
        this.headImage = headImage;
        this.weaponsImage = weaponsImage;
        this.canvas = canvas;
        this.context = context;
        this.pos = pos;
        this.size = size;
        this.speed = speed;
        this.jumpHeight = jumpHeight;
        this.count = 0;
        this.relativeLocation = 0;
    }

    update() {
        this.relativeLocation = (this.count < this.jumpHeight) ? 
            this.relativeLocation + this.speed : this.relativeLocation - this.speed;
        this.count++;
        if (this.count > 2 * this.jumpHeight) {
            this.count = 0;
        }
    }

    render() {
        this.context.drawImage(this.bodyImage,
            this.pos[0], this.relativeLocation + this.pos[1] + this.size[1] / 4,
            this.size[0] / 2, this.size[1] * 2 / 3);
        this.context.drawImage(this.headImage,
            this.pos[0], this.relativeLocation + this.pos[1],
            this.size[0] / 2, this.size[1] * 1 / 3);
        this.context.drawImage(this.weaponsImage,
            this.pos[0] + this.size[0] / 3, this.relativeLocation + this.pos[1] + this.size[1] / 2,
            this.size[0] / 2, this.size[1] / 5);
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}