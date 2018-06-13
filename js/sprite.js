class Horse {
	constructor(canvas, context, image, imagePos, horsePos, size, horseSize, speed, frames) {
		this.canvas = canvas;
		this.context = context;
		this.imagePos = imagePos;
		this.horsePos = horsePos;
		this.size = size;
		this.horseSize = horseSize;
		this.speed = typeof speed === 'number' ? speed : 0;
		this.frames = frames;
		this._index = 0;
		this.image = image;
	}

	update(dt) {
		this._index += this.speed * dt;
	}

	render() {
		let frame;
		if(this.speed > 0) {
			let max = this.frames.length;
			let idx = Math.floor(this._index);
			frame = this.frames[idx % max];
		}
		else {
			frame = 0;
		}
		let x = this.imagePos[0];
		let y = this.imagePos[1];

		x += frame * this.size[0];


		let width = window.innerWidth, height = window.innerHeight;

		this.context.clearRect(this.horsePos[0], this.horsePos[1],
			width*0.25, height*0.35);

		this.context.drawImage(this.image,
			x, y,
			this.size[0], this.size[1],
			this.horsePos[0], this.horsePos[1],
			this.horseSize[0], this.horseSize[1]);
	}
}