class Burst {
    constructor(burstImage, heartsImage, canvas, context, size, speed) {
        this.burstImage = burstImage;
        this.heartsImage = heartsImage;
        this.canvas = canvas;
        this.context = context;
        this.size = size;
        this.speed = speed;
    }

    update() {
        this.relativeLocation += this.speed;
    }

    // sword

    renderFire(pos1, size1, pos2) {
        let xPosImage, xPosWindow;
        if (pos1[0] < pos2[0]) {
            xPosImage = 0;
            xPosWindow = pos1[0] + size1[0] + this.relativeLocation;
        } else {
            xPosImage = FIRE_PICTURE_SIZE[0];
            xPosWindow = pos1[0] - this.size[0] - this.relativeLocation;
        }

        this.context.drawImage(this.burstImage,
            xPosImage, 0,
            FIRE_PICTURE_SIZE[0], FIRE_PICTURE_SIZE[1],
            xPosWindow, pos1[1] + size1[1] * 0.3,
            this.size[0], this.size[1]);
    }

    renderBang(pos1, size1, pos2) {
        let xPosImage, xPosWindow;
        if (pos1[0] < pos2[0]) {
            xPosImage = FIRE_PICTURE_SIZE[0] * 2;
            xPosWindow = pos2[0] - this.size[0] * 1.7;
        } else {
            xPosImage = FIRE_PICTURE_SIZE[0] * 2 + BANG_PICTURE_SIZE[0];
            xPosWindow = pos2[0] + size1[0] - this.size[0] * 0.1;
        }

        this.context.drawImage(this.burstImage,
            xPosImage, 0,
            BANG_PICTURE_SIZE[0], BANG_PICTURE_SIZE[1],
            xPosWindow, pos1[1] + size1[1] * 0.1,
            this.size[0] * 2, this.size[1] * 2);
    }

    drawing(pos1, size1, pos2) {
        this.renderFire(pos1, size1, pos2);
        this.update();
    }

    clearingStrike(pos1, size1, pos2) {
        let x = (pos1[0] < pos2[0]) ? pos1 : pos2;
        this.context.clearRect(x[0] + size1[0], pos1[1] + size1[1] * 0.1,
            Math.abs(pos2[0] - pos1[0]), this.size[1] * 2);
    }

    strike(pos1, size1, pos2) {
        this.relativeLocation = 0;
        let intervalDrawing;
        let dt = 30,
            time = (Math.abs(pos2[0] - pos1[0]) - size1[0] - this.size[0] * 0.8) / this.speed * dt;
        let oneDrawing = () => this.drawing(pos1, size1, pos2);
        setTimeout(() => { intervalDrawing = setInterval(oneDrawing, dt) }, 300);
        setTimeout(() => clearInterval(intervalDrawing), time);

        setTimeout(() => {
            this.renderBang(pos1, size1, pos2);
            let burstAudio = new Audio(BURST_AUDIO_PATH);
            burstAudio.play();
        }, time);
        setTimeout(() => this.renderBang(pos1, size1, pos2), time);

        setTimeout(() => this.clearingStrike(pos1, size1, pos2), time + 500);
    }

    // heart

    renderHealth(pos, size) {
        this.context.drawImage(this.heartsImage,
            pos[0] + size[0] / 2, pos[1] - this.relativeLocation,
            size[0] / 2, size[1] / 3);
    }

    clearingHearts(pos, size) {
        this.context.clearRect(pos[0] + size[0] / 2, pos[1] - size[1] / 3,
            size[0] / 2, size[1] / 3);
    }

    addingHealth(pos, size) {
        this.relativeLocation = 0;
        let intervalDrawing, intervalClearing;
        let dt = 100,
            time = (size[1] * 0.38) / this.speed * dt;
        let oneDrawing = () => this.renderHealth(pos, size);
        let oneClearing = () => {
            this.clearingHearts(pos, size);
            this.update()
        };
        intervalDrawing = setInterval(oneDrawing, dt);

        let healthAudio = new Audio(HEALTH_AUDIO_PATH);
        healthAudio.play();
        setTimeout(() => { intervalClearing = setInterval(oneClearing, dt) }, dt * 0.6);

        setTimeout(() => clearInterval(intervalDrawing), time);
        setTimeout(() => clearInterval(intervalClearing), time);
    }
}