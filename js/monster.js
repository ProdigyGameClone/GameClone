class Monster {
    constructor(bodyImage, headImage, weaponsImage, bootsImage, numBoots, canvas, context, pos, size, speed, jumpHeight) {
        this.bodyImage = bodyImage;
        this.headImage = headImage;
        this.weaponsImage = weaponsImage;
        this.bootsImage = bootsImage;
        this.numBoots = numBoots;
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
        if (this.count >= 2 * this.jumpHeight) {
            this.count = 0;
        }
    }

    render() {
        this.context.clearRect(this.pos[0], this.pos[1],
            this.size[0], this.size[1] + 2 * this.jumpHeight);

        this.context.drawImage(this.bodyImage,
            this.pos[0], this.relativeLocation + this.pos[1] + this.size[1] / 4,
            this.size[0] / 2, this.size[1] * 0.6);
        this.context.drawImage(this.headImage,
            this.pos[0], this.relativeLocation + this.pos[1],
            this.size[0] / 2, this.size[1] * 1 / 3);
        this.context.drawImage(this.weaponsImage,
            this.pos[0] + this.size[0] * 0.35, this.relativeLocation + this.pos[1] + this.size[1] * 0.35,
            this.size[0] / 2, this.size[1] / 5);


        let sizeBootsX = this.size[0] / 2, 
            sizeBootsY = this.size[1] / 4;
        if (this.numBoots % 2 == 0) {
            this.context.drawImage(this.bootsImage,
                2 + 48 * this.numBoots, 2,
                45, 45,
                this.pos[0], this.relativeLocation + this.pos[1] + this.size[1] * 0.75,
                sizeBootsX, sizeBootsY);
        } else {
            this.context.drawImage(this.bootsImage,
                2 + 48 * this.numBoots, 2,
                45, 45,
                this.pos[0], this.relativeLocation + this.pos[1] + this.size[1] * 0.75,
                sizeBootsX / 2, sizeBootsY);
            this.context.drawImage(this.bootsImage,
                2 + 48 * this.numBoots, 2,
                45, 45,
                this.pos[0] + sizeBootsX / 2, this.relativeLocation + this.pos[1] + this.size[1] * 0.75,
                sizeBootsX / 2, sizeBootsY);
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}