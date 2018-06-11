class GameField {
	constructor () {
		this.canvas = document.getElementById('canvas');	
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.initHorse();
		this.initScore();
		this.initSpells();
		window.addEventListener('resize', this.resizeCanvas, false);
	}

	initHorse() {
		let horseImage = new Image();
		horseImage.src = 'images/horse.png';
		horseImage.addEventListener('load', () => {
			this.mainCharacter = new Horse(this.canvas, this.context, 'images/horse.png', [0, 0], [334,266], 3, [0,1,2,3,2,1]);
			this.lastTime = Date.now();
			this.main();
		});
	}

	initScore() {
		let width = window.innerWidth, height = window.innerHeight;
		let starImage = new Image();
		starImage.src = 'images/star.png';
		starImage.addEventListener('load', () => {
			this.scoreMainCharacter = new Score(starImage, this.canvas, this.context, [width / 35, height / 25], [width / 10, width / 10], 1, 100);
			this.scoreVillian = new Score(starImage, this.canvas, this.context, [width - width / 10 - width / 35, height / 25], [width / 10, width / 10], -1, 70);
		})
	}

	initSpells() {
		this.context.fillStyle = '#00a7be';
		this.context.fillRect(window.innerWidth / 2.3, window.innerHeight / 1.2, window.innerWidth * 0.2, window.innerHeight * 0.2);
		this.context.fillStyle = "maroon";
		this.context.strokeStyle = "maroon";
		this.context.font = "italic 30pt Arial";
		this.context.fillText("Spells", window.innerWidth / 2, window.innerHeight / 1.22);
		let health = new Image();
		health.src = 'images/heart.png';
		const imageWidth = 150, 
		imageHeight = 150;
		let sword = new Image();
		sword.src = 'images/sword.png';
		health.addEventListener('load', () => {
			this.context.drawImage(health, window.innerWidth / 2.25, window.innerHeight / 1.2, 150, 150 );
		});

		sword.addEventListener('load', () => {
			this.context.drawImage(sword, window.innerWidth / 1.85, window.innerHeight / 1.2, 150, 150 );

		});
		this.canvas.addEventListener('click', (e)=> { this.chooseSpell(e, imageWidth, imageHeight);				
		});
	}

	chooseSpell(e, imageWidth, imageHeight) {
		const pos = {
			x: e.clientX,
			y: e.clientY
		};
		if (pos.x >= window.innerWidth / 2.25 && pos.x <= window.innerWidth / 2.25 + imageWidth) {
			if (pos.y >= window.innerHeight / 1.2 && pos.y <= window.innerHeight / 1.2 + imageHeight)
				this.initTaskScreen('health');
		}
		if (pos.x >= window.innerWidth / 1.85 && pos.x <= window.innerWidth / 1.85 + imageWidth) {
			if (pos.y >= window.innerHeight / 1.2 && pos.y <= window.innerHeight / 1.2 + imageHeight)
				this.initTaskScreen('sword');
		}


	};

	initTaskScreen(spell) {
		let background = "url('images/platformer_background_1.png')";
		this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
		cancelAnimationFrame(this.animation);
		this.canvas.style.background = background;
		let task = new Task(this.canvas, this.context);
	}

	get context () {
		return this.canvas.getContext('2d');
	}

	main() {
		this.context.clearRect(window.innerWidth / 4, window.innerHeight / 1.8, 334, 266);
		let now = Date.now();
		let dt = (now - this.lastTime) / 1000.0;

		this.update(dt);
		this.mainCharacter.render();
		this.scoreMainCharacter.render();
		this.scoreVillian.render();

		this.lastTime = now;
		this.animation = requestAnimationFrame(() => this.main());
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