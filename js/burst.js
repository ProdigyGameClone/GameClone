class Burst {
    constructor(burstImage, canvas, context, size, speed) {
        this.burstImage = burstImage;
        this.canvas = canvas;
        this.context = context;
        this.size = size;
        this.speed = speed;
    }

    update() {
        this.relativeLocation += this.speed;
    }

    render(pos1, size1, pos2) {
        // let x1 = (pos1[0] < pos2[0]) ? 0 : 115;
        let x, _x;
        if (pos1[0] < pos2[0]) {
            x = 0;
            _x = pos1[0] + size1[0] + this.relativeLocation;
        } else {
            x = 115;
            _x = pos1[0] - this.size[0] * 0.7 - this.relativeLocation;
        }

        this.context.drawImage(this.burstImage,
            x, 0,
            115, 70,
            _x, pos1[1] + size1[1] / 2,
            this.size[0], this.size[1]);
    }

    render2(pos1, size1, pos2) {
        let x1 = (pos1[0] < pos2[0]) ? 230 : 340;
        let x2 = pos2[0] - this.size[0] * 1.5;

        let x, _x;
        if (pos1[0] < pos2[0]) {
            x = 230;
            _x = pos2[0] - this.size[0] * 1.5;
        } else {
            x = 340;
            _x = pos2[0] + size1[0] - this.size[0] * 0.1;
        }

        this.context.drawImage(this.burstImage,
            x, 0,
            110, 70,
            _x, pos1[1] + size1[1] * 0.2,
            this.size[0] * 2, this.size[1] * 2);
    }

    drawing(pos1, size1, pos2) {
        this.render(pos1, size1, pos2);
        this.update();
    }

    clearing(pos1, size1, pos2) {
        let x = (pos1[0] < pos2[0]) ? pos1 : pos2;
        this.context.clearRect(x[0], x[1],
            Math.abs(pos2[0] - pos1[0]), this.size[1] * 2);
    }

    strike(pos1, size1, pos2) {
        this.relativeLocation = 0;
        let fn;
        let dt = 30,
            time = (Math.abs(pos2[0] - pos1[0]) - size1[0] - this.size[0] / 2) / this.speed * dt;
        let oneDrawing = () => this.drawing(pos1, size1, pos2);
        setTimeout(() => { fn = setInterval(oneDrawing, dt) }, 300);
        setTimeout(() => clearInterval(fn), time);

        setTimeout(() => this.render2(pos1, size1, pos2), time);
        setTimeout(() => this.clearing(pos1, size1, pos2), time + 500);
    }
}