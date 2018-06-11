class GameField {
	constructor () {
		this.canvas = document.getElementById('canvas');
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		let width = window.innerWidth, height = window.innerHeight;

		let horseImage = new Image();
		horseImage.src = 'images/horse.png';
		let starImage = new Image();
		starImage.src = 'images/star.png';
		let monsterBodyImage = new Image();
		monsterBodyImage.src = 'images/body/' + getRandomInt(1,5) + '.png';
		let monsterHeadImage = new Image();
		monsterHeadImage.src = 'images/head/' + getRandomInt(1,12) + '.png';
		let monsterWeaponsImage = new Image();
		monsterWeaponsImage.src = 'images/weapons/' + getRandomInt(1,9) + '.png';

		starImage.addEventListener('load', () => {
			this.scoreMainCharacter = new Score(starImage, this.canvas, this.context, 
				[width/35, height/25], [width/10, width/10], 1, 100);
			this.scoreVillian = new Score(starImage, this.canvas, this.context, 
				[width-width/10-width/35, height/25], [width/10, width/10], -1, 70);
		});

		monsterBodyImage.addEventListener('load', () => {
			this.monster = new Monster(monsterBodyImage, monsterHeadImage, monsterWeaponsImage, this.canvas, this.context, 
				[width*2/3, height*3/5], [width/7, width/7], 2, 30);
		});

		horseImage.addEventListener('load', () => {
			this.mainCharacter = new Horse(this.canvas, this.context, 'images/horse.png', 
				[0, 0], [334,266], 4, [0,1,2,3,2,1]);
			this.lastTime = Date.now();
			this.main();
		});
		window.addEventListener('resize', this.resizeCanvas, false);
	}

	get context () {
		return this.canvas.getContext('2d');
	}

	main() {
		this.context.clearRect(0, 0, window.innerWidth, window.innerWidth);
		let now = Date.now();
		let dt = (now - this.lastTime) / 1000.0;

		this.update(dt);
		this.mainCharacter.render();
		this.monster.render();
		this.scoreMainCharacter.render();
		this.scoreVillian.render();

		this.lastTime = now;
		requestAnimationFrame(() => this.main());
	};

	update(dt) {
		this.mainCharacter.update(dt);    
		this.monster.update();
	}

	resizeCanvas() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}
}

document.addEventListener('DOMContentLoaded', function() {
	let gameField = new GameField();
});