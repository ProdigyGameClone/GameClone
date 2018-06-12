class Score {
    constructor(starImage, canvas, context, pos, size, direction, hp) {
        this.starImage = starImage;
        this.canvas = canvas;
        this.context = context;
        this.pos = pos;
        this.size = size;
        this.direction = direction;
        this.hp = hp;
    }

    render() {
        this.context.fillStyle = 'orange';
        this.context.fillRect(this.pos[0] + this.size[0] / 4 * (2 + this.direction), this.pos[1] + this.size[1] / 2,
            this.direction * this.size[0] * 2, this.size[1] / 5);

        this.context.fillStyle = 'yellow';
        this.context.fillRect(this.pos[0] + this.size[0] / 4 * (2 + this.direction) + this.direction * 5, this.pos[1] + this.size[1] / 2 + 5,
            this.direction * (this.size[0] * 2 - 10) * (this.hp / 100), this.size[1] / 5 - 10);

        this.context.drawImage(this.starImage,
            this.pos[0], this.pos[1],
            this.size[0], this.size[1]);

        this.context.font = "italic 30pt Arial";
        this.context.fillText(this.hp, this.pos[0] + this.size[0] * 0.25, this.pos[1] + this.size[1] * 0.65);
    }
}