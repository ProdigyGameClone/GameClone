class Horse {
	constructor(canvas, context, url, pos, size, speed, frames) {
		this.canvas = canvas;
		this.context = context;
		this.pos = pos;
		this.size = size;
		this.speed = typeof speed === 'number' ? speed : 0;
		this.frames = frames;
		this._index = 0;
		this.url = url;
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
		let x = this.pos[0];
		let y = this.pos[1];

		x += frame * this.size[0];

		let horseImage = new Image();
		horseImage.src = this.url;
		let width = window.innerWidth, height = window.innerHeight;

		this.context.clearRect(width*0.1, height*0.45,
			width*0.25, height*0.35);

		this.context.drawImage(horseImage,
			x, y,
			this.size[0], this.size[1],
			width*0.1, height*0.45,
			width*0.25, height*0.35);
	}
}