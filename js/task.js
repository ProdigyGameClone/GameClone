class Task {
	constructor(canvas, context, spell, observer) {
		this.canvas = canvas;
		this.context = context;
		this.spell = spell;
		this.observer = observer;
		this.context.textAlign = styles.task.textAlign;
		this.possibleTasks = [[this.generateNumbersTask, this.checkNumberAnswer], [this.printTranslateTask, this.checkTranslateAnswer]]; 
		this.initTaskField();
		this.initAnswerButton();
		this.createInput();
		this.taskNumber = getRandomInt(0, this.possibleTasks.length - 1);
		this.possibleTasks[this.taskNumber][0].call(this);
	}

	initTaskField() {
		this.context.fillStyle = styles.task.backgroundAnswerFillStyle;
		this.context.fillRect(window.innerWidth / 5, window.innerHeight / 3.5, window.innerWidth * 0.6, window.innerHeight * 0.6);
		this.context.fillStyle = styles.task.fillStyle;
		this.context.font = styles.task.font;
		this.context.fillText("Your Task is", window.innerWidth * 0.5, window.innerHeight * 0.4);
	}

	generateNumbersTask() {
		this.taskNumbers = [];
		let taskOperations = ['+', '-', '*'];
		this.taskNumbers.push(Math.trunc(Math.random() * 100));
		this.taskNumbers.push(taskOperations[Math.floor(Math.random() * taskOperations.length)]); 
		let digitNumber = 100;
		if (this.taskNumbers[1] == '*')
			digitNumber = 10;
		this.taskNumbers.push(Math.trunc(Math.random() * digitNumber));
		this.printNumbersTask();

	}

	printNumbersTask() {
		this.taskNumbersString = this.taskNumbers.join(' ');
		this.context.fillStyle = styles.task.fillStyle;
		this.context.fillText(this.taskNumbersString + ' = ?', window.innerWidth * 0.5, window.innerHeight * 0.5);
	}

	printTranslateTask() {
		let dictionaryKeys = Object.getOwnPropertyNames(dict);
		this.context.fillStyle = styles.task.fillStyle;
		this.context.fillText('to translate', window.innerWidth * 0.5, window.innerHeight * 0.48);
		this.taskElem = dictionaryKeys[getRandomInt(0, dictionaryKeys.length - 1)];
		this.context.fillStyle = styles.task.translatingWordFillStyle;
		this.context.fillText(this.taskElem, window.innerWidth * 0.5, window.innerHeight * 0.55);
	}

	createInput() {
		this.input = document.createElement('input');
		this.input.type = 'text';
		this.input.style.position = 'fixed';
		this.input.style.left = window.innerWidth * 0.45 + 'px';
		this.input.style.top = window.innerHeight * 0.6 + 'px';
		document.body.appendChild(this.input);
		this.input.focus();
	}

	initAnswerButton() {
		this.context.fillStyle = styles.task.answerButtonFillStyle;
		let buttonWidth = 200,
		buttonHeight = 90;
		this.context.fillRect(window.innerWidth / 2.25, window.innerHeight / 1.5, buttonWidth, buttonHeight);
		this.context.fillStyle = styles.task.answerValueColor;
		this.context.fillText("Aswer!", window.innerWidth / 2.01, window.innerHeight / 1.4);
		this.clickAnswerButton(buttonWidth, buttonHeight);
	}

	clickAnswerButton(buttonWidth, buttonHeight) {
		this.listener = (e) => this.checkAnswer(e, buttonWidth, buttonHeight);
		this.canvas.addEventListener('click', this.listener);
	}

	checkAnswer(e, buttonWidth, buttonHeight) {
		if (e.clientX >= window.innerWidth / 2.25 && e.clientX <= window.innerWidth / 2.25 + buttonWidth) {
			if (e.clientY >= window.innerHeight / 1.5 && e.clientY <= window.innerHeight / 1.5 + buttonHeight) {
				this.input.remove();
				this.context.fillStyle = styles.task.fillStyle;
				this.context.fillRect(0, window.innerHeight / 3, window.innerWidth, 400);
				this.context.fillStyle = styles.task.answerValueColor;
				this.possibleTasks[this.taskNumber][1].call(this);
				
				this.observer.broadcast(this.userAnswer);		
			}			
		}
		this.canvas.removeEventListener('click', this.listener);
	}

	checkNumberAnswer() {
		if ( this.input.value == eval(this.taskNumbersString)) {
			this.answerCorrect();		
		}
		else { 
			this.answerIncorrect();	
		}
	}

	checkTranslateAnswer() {
		let currentWord = this.taskElem; 
		if (dict[currentWord].indexOf(this.input.value.trim()) != -1) {
			this.answerCorrect();			
		}
		else { 
			this.answerIncorrect();
		}

	}

	answerCorrect() {
		this.context.fillText("Correct!", window.innerWidth / 2.01, window.innerHeight / 1.8);	
		this.userAnswer = true;	
	}

	answerIncorrect() {
		this.context.fillText("Incorrect!", window.innerWidth / 2.01, window.innerHeight / 1.8);	
		this.userAnswer = false;
	}
}	