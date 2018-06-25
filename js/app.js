class GameField {
	constructor(userName) {
		this.user = new User(userName, 0);
		this.round = 1;
		this.initCanvas();
		this.initMonster();
		this.monsterFullName = this.generateMonsterName();
		this.initScore(MAX_SCORE, MAX_SCORE);
		this.initRound();
		this.initSpells();
	}

	initCanvas() {
		this.canvas = document.getElementById('canvas');
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		window.addEventListener('resize', this.resizeCanvas, false);
		const imageWidth = window.innerWidth / 11,
		imageHeight = window.innerHeight / 6;
		this.canvas.addEventListener('click', (e) => {
			this.chooseSpell(e, imageWidth, imageHeight);
		});
	}

	initHorse() {
		let horseImage = new Image();
		horseImage.src = HORSE_PATH;
		horseImage.addEventListener('load', () => {
			this.mainCharacter = new Horse(this.canvas, this.context, horseImage,
				HORSE_PICTURE_POS, [window.innerWidth * 0.1, window.innerHeight * 0.4],
				HORSE_PICTURE_SIZE, [window.innerWidth * 0.25, window.innerHeight * 0.35], HORSE_ANIMATION_SPEED, HORSE_FRAMES);
			this.initBurst();
			this.lastTime = Date.now();
			this.main();
		});
	}

	initScore(mainCharacterHp, villianHp) {
		let width = window.innerWidth, height = window.innerHeight;
		let starImage = new Image();
		starImage.src = STAR_PATH;
		starImage.addEventListener('load', () => {
			this.scoreMainCharacter = new Score(this.user.characterName, starImage, this.canvas, this.context, 
				[width / 35, height / 25], [width / 10, width / 10], 
				RIGHT_DIRECTION, mainCharacterHp);
			this.scoreVillian = new Score(this.monsterFullName, starImage, this.canvas, this.context, 
				[width - width / 10 - width / 35, height / 25], [width / 10, width / 10], 
				LEFT_DIRECTION, villianHp);
			this.scoreMainCharacter.render();
			this.scoreVillian.render();
		});
	}

	initMonster() {
		let monsterImagesArray = [];
		let monsterImagesNumber = 0;
		let width = window.innerWidth, height = window.innerHeight;
		let monsterBodyImage = new Image();
		monsterBodyImage.src = `images/body/${getRandomInt(1, BODY_IMAGES_NUMBER)}.png`;
		monsterImagesArray.push(monsterBodyImage);
		let monsterHeadImage = new Image();
		monsterHeadImage.src = `images/head/${getRandomInt(1, HEAD_IMAGES_NUMBER)}.png`;
		monsterImagesArray.push(monsterHeadImage);
		let monsterWeaponsImage = new Image();
		monsterWeaponsImage.src = `images/weapons/${getRandomInt(1, WEAPONS_IMAGES_NUMBER)}.png`;
		monsterImagesArray.push(monsterWeaponsImage);
		let monsterBootsImage = new Image();
		monsterBootsImage.src = BOOTS_PATH;
		monsterImagesArray.push(monsterBootsImage);
		monsterImagesArray.forEach((image) => {
			image.addEventListener('load', () => {
				++monsterImagesNumber;
				if (monsterImagesNumber == MONSTER_PARTS_NUMBER) {
					this.monster = new Monster(monsterBodyImage, monsterHeadImage, monsterWeaponsImage,
						monsterBootsImage, getRandomInt(0, BOOTS_IMAGES_NUMBER - 1), this.canvas, this.context,
						[width * 0.7, height * 0.4], [width / 7, width / 7], 
						MONSTER_ANIMATION_SPEED, MONSTER_JUMP_HEIGHT);
					this.initHorse();
				}
			})
		});
	}

	generateMonsterName() {
		return `${ADJECTIVE[getRandomInt(0, ADJECTIVE.length - 1)]} ${TYPE[getRandomInt(0, TYPE.length - 1)]} ${NAME[getRandomInt(0, NAME.length - 1)]}`;
	}

	initRound() {
		let width = window.innerWidth, height = window.innerHeight;
		let roundImage = new Image();
		roundImage.src = STAR1_PATH;
		roundImage.addEventListener('load', () => {
			this.context.drawImage(roundImage,
				width * 0.46, 0,
				width * 0.1, width * 0.11);
			this.context.fillText(this.round, window.innerWidth * 0.504, window.innerHeight * 0.11);
			this.context.font = styles.font;
			this.context.fillText("Round", window.innerWidth * 0.495, window.innerHeight * 0.11 + 30);
		});
	}

	initSpells() {
		this.context.fillStyle = styles.fillStyle;
		this.context.fillRect(window.innerWidth / 2.3, window.innerHeight / 1.2, window.innerWidth * 0.2, window.innerHeight * 0.2);
		this.context.fillStyle = styles.spells.fillStyle;
		this.context.strokeStyle = styles.spells.strokeStyle;
		this.context.font = styles.spells.font;
		this.context.fillText("Spells", window.innerWidth / 2, window.innerHeight / 1.22);
		let health = new Image();
		health.src = HEART_PATH;
		let sword = new Image();
		sword.src = SWORD_PATH;
		health.addEventListener('load', () => {
			this.context.drawImage(health, window.innerWidth / 2.25, window.innerHeight / 1.2, window.innerWidth / 11, window.innerHeight / 6);

		});
		sword.addEventListener('load', () => {
			this.context.drawImage(sword, window.innerWidth / 1.85, window.innerHeight / 1.2, window.innerWidth / 11, window.innerHeight / 6);
		});
	}

	chooseSpell(e, imageWidth, imageHeight) {
		const pos = {
			x: e.clientX,
			y: e.clientY
		};
		if (pos.x >= window.innerWidth / 2.25 && pos.x <= window.innerWidth / 2.25 + imageWidth) { //identify user's click
			if (pos.y >= window.innerHeight / 1.2 && pos.y <= window.innerHeight / 1.2 + imageHeight) //user has clicked on health spell
				if (this.scoreMainCharacter.hp < MAX_SCORE)
					this.initTaskScreen('health');
			}
			if (pos.x >= window.innerWidth / 1.85 && pos.x <= window.innerWidth / 1.85 + imageWidth) { //user has clicked on sword spell
				if (pos.y >= window.innerHeight / 1.2 && pos.y <= window.innerHeight / 1.2 + imageHeight)
					this.initTaskScreen('sword');
			}
		};


		initTaskScreen(spell) {
			this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
			cancelAnimationFrame(this.animation);
			this.canvas.classList.add('taskScreen');
			let observer = new EventObserver();
			observer.subscribe(userAnswer => {
				setTimeout(() => this.processUserAnswer(userAnswer), 1000);
			});
			this.task = new Task(this.canvas, this.context, spell, observer);
		};

		processUserAnswer(userAnswer) {
			this.context.textAlign = styles.textAlign;
			this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
			this.canvas.classList.remove('taskScreen');
			let flag = 0;

			if (this.task.spell == 'health' && userAnswer) {
				this.burst.addingHealth(this.mainCharacter.horsePos, this.mainCharacter.horseSize);
				this.scoreMainCharacter.hp += Math.round(ROUND_WEIGHT * BOOST_FACTOR);
				if (this.scoreMainCharacter.hp > MAX_SCORE)
					this.scoreMainCharacter.hp = MAX_SCORE;
			}

			else if (userAnswer) {
				this.scoreVillian.hp -= ROUND_WEIGHT;
				if (this.scoreVillian.hp > MIN_SCORE)
					this.burst.strike(this.mainCharacter.horsePos, this.mainCharacter.horseSize, this.monster.pos);
			}

			else if (!userAnswer) {
				this.burst.strike(this.monster.pos, this.mainCharacter.horseSize, this.mainCharacter.horsePos);
				flag = 1;
				this.villianHit();
			}

			if (this.scoreVillian.hp <= MIN_SCORE) {
				this.round += 1;
				this.user.defiatedMonstersNumber += 1;
				this.scoreVillian.characterName = this.generateMonsterName();
				this.scoreVillian.hp = MAX_SCORE;
				this.scoreMainCharacter.hp = MAX_SCORE;
				this.initMonster();
			}
			else if (!flag)
				setTimeout(() => {
					this.burst.strike(this.monster.pos, this.mainCharacter.horseSize, this.mainCharacter.horsePos);
					this.villianHit();
				}, 3000);

			this.scoreMainCharacter.render();
			this.scoreVillian.render();
			this.initRound();
			this.initSpells();
			this.main();
		}

		initBurst() {
			let heartsImage = new Image();
			heartsImage.src = HEARTS_PATH;
			let burstImage = new Image();
			burstImage.src = BURST_PATH;
			burstImage.addEventListener('load', () => {
				this.burst = new Burst(burstImage, heartsImage, this.canvas, this.context, 
					BURST_SIZE, BURST_SPEED);
			});
		}

		get context() {
			return this.canvas.getContext('2d');
		}

		villianHit() {
			let width = window.innerWidth, height = window.innerHeight;
			this.context.clearRect(width / 35, height / 25, width / 10, width / 10);
			this.scoreMainCharacter.hp -= ROUND_WEIGHT;
			this.scoreMainCharacter.render();
			setTimeout(() => {
				this.scoreMainCharacter.render();
			}, 1000);

			if (this.scoreMainCharacter.hp <= MIN_SCORE) {
				setTimeout(() => {
					let tableResults = new Table(this.user);
				}, 3000);
			}
		}

		main() {
			let now = Date.now();
			let dt = (now - this.lastTime) / 1000.0;

			this.update(dt);
			this.mainCharacter.render();
			this.monster.render();
			this.lastTime = now;
			this.animation = requestAnimationFrame(() => this.main());
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

	document.addEventListener('DOMContentLoaded', function () {
		document.getElementById('start-game').addEventListener('click', () => {
			let userName =document.forms['user-information'].elements['first-name'].value;
			if (userName) {
				let canvas = document.createElement('canvas');
				document.body.appendChild(canvas);
				canvas.id = 'canvas';
				document.getElementById('greeting').remove();
				let gameField = new GameField(userName);
			}
			else {
				let emptyName = document.getElementsByClassName('empty-name-hidden')[0];
				if (emptyName) {
					emptyName.classList.remove('empty-name-hidden');
					emptyName.classList.add('empty-name');
				}
			}
		});
	})
