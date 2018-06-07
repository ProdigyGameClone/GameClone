class GameField {
	constructor () {
		this.canvas = document.getElementById('canvas');
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		let horseImage = new Image();
		horseImage.src = 'images/horse.png';
		horseImage.addEventListener('load', () => {
			this.mainCharacter = new Horse(this.canvas, this.context, 'images/horse.png', [0, 0], [334,266], 2, [0,1,2,3,2,1]);
			this.lastTime = Date.now();
			this.main();
		});
		window.addEventListener('resize', this.resizeCanvas, false);
	}

	get context () {
		return this.canvas.getContext('2d');
	}

	main() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		let now = Date.now();
		let dt = (now - this.lastTime) / 1000.0;

		this.update(dt);
		this.mainCharacter.render();

		this.lastTime = now;
		requestAnimationFrame(() => this.main());
	};

	update(dt) {
		this.mainCharacter.update(dt);    
	}

	resizeCanvas() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}
}

document.addEventListener('DOMContentLoaded', function() {
	let gameField = new GameField();
});