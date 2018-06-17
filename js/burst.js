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

    renderSword(pos1, size1, pos2) {
        let x, _x;
        if (pos1[0] < pos2[0]) {
            x = 0;
            _x = pos1[0] + size1[0] + this.relativeLocation;
        } else {
            x = 115;
            _x = pos1[0] - this.size[0] - this.relativeLocation;
        }

        this.context.drawImage(this.burstImage,
            x, 0,
            115, 70,
            _x, pos1[1] + size1[1] * 0.3,
            this.size[0], this.size[1]);
    }

    renderSword2(pos1, size1, pos2) {
        let x, _x;
        if (pos1[0] < pos2[0]) {
            x = 230;
            _x = pos2[0] - this.size[0] * 1.7;
        } else {
            x = 340;
            _x = pos2[0] + size1[0] - this.size[0] * 0.1;
        }

        this.context.drawImage(this.burstImage,
            x, 0,
            110, 70,
            _x, pos1[1] + size1[1] * 0.1,
            this.size[0] * 2, this.size[1] * 2);
    }

    drawing(pos1, size1, pos2) {
        this.renderSword(pos1, size1, pos2);
        this.update();
    }

    clearingStrike(pos1, size1, pos2) {
        let x = (pos1[0] < pos2[0]) ? pos1 : pos2;
        this.context.clearRect(x[0] + size1[0], pos1[1] + size1[1] * 0.1,
            Math.abs(pos2[0] - pos1[0]), this.size[1] * 2);
    }

    strike(pos1, size1, pos2) {
        this.relativeLocation = 0;
        let fn;
        let dt = 30,
        time = (Math.abs(pos2[0] - pos1[0]) - size1[0] - this.size[0] * 0.8) / this.speed * dt;
        let oneDrawing = () => this.drawing(pos1, size1, pos2);
        setTimeout(() => { fn = setInterval(oneDrawing, dt) }, 300);
        setTimeout(() => clearInterval(fn), time);

        setTimeout(() => {
            this.renderSword2(pos1, size1, pos2);
            let burstAudio = new Audio ("audio/explosion.flac"); 
            burstAudio.play();          
        }, time);
        setTimeout(() => this.clearingStrike(pos1, size1, pos2), time + 500);
    }

    // heart

    renderHealth(pos, size) {
        this.context.drawImage(this.heartsImage,
            pos[0] + size[0] * 0.5, pos[1] - this.relativeLocation,
            size[0] / 2, size[1] / 3);
    }

    clearingHearts(pos, size) {
        this.context.clearRect(pos[0] + size[0] * 0.5, pos[1] - size[1] / 3,
            size[0] / 2, size[1] / 3);
    }

    addingHealth(pos, size) {
        this.relativeLocation = 0;
        let fn, fn2;
        let dt = 100,
        time = (size[1] * 0.38) / this.speed * dt;
        let oneDrawing = () => this.renderHealth(pos, size);
        let oneClearing = () => {
            this.clearingHearts(pos, size);
            this.update()
        };
        fn = setInterval(oneDrawing, dt);
        setTimeout(() => { fn2 = setInterval(oneClearing, dt);
        let healthAudio = new Audio ("audio/yeah.wav"); 
            healthAudio.play();    }, dt - 1);
        setTimeout(() => clearInterval(fn), time);
        setTimeout(() => clearInterval(fn2), time);
    }
}