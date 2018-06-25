class Score {
    constructor(name, starImage, canvas, context, pos, size, direction, hp) {
        this.characterName = name;
        this.starImage = starImage;
        this.canvas = canvas;
        this.context = context;
        this.pos = pos;
        this.size = size;
        this.direction = direction;
        this.hp = hp;
    }

    render() {
        this.context.fillStyle = styles.score.backgroundFillStyle;
        this.context.fillRect(this.pos[0] + this.size[0] / 4 * (2 + this.direction), this.pos[1] + this.size[1] / 2,
            this.direction * this.size[0] * 2, this.size[1] / 5);

        this.context.fillStyle = styles.score.frontFillStyle;
        this.context.fillRect(this.pos[0] + this.size[0] / 4 * (2 + this.direction) + this.direction * 5, this.pos[1] + this.size[1] / 2 + 5,
            this.direction * (this.size[0] * 2 - 10) * (this.hp / 100), this.size[1] / 5 - 10);

        this.context.drawImage(this.starImage,
            this.pos[0], this.pos[1],
            this.size[0], this.size[1]);

        this.context.font = styles.score.font;
        this.context.fillStyle = styles.score.fillStyle;

        this.context.fillText(this.characterName, window.innerWidth / 2 * (1 - this.direction) + this.direction * (this.context.measureText(this.characterName).width + 120), this.pos[1] + this.size[1] * 1.2);
        this.context.fillStyle = styles.score.backgroundFillStyle;
        this.context.fillText(this.hp, this.pos[0] + this.size[0] * 0.35, this.pos[1] + this.size[1] * 0.65);
    }
}