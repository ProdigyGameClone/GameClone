class Task {
	constructor(canvas, context, spell, observer) {
		this.canvas = canvas;
		this.context = context;
		this.spell = spell;
		this.observer = observer;
		this.context.textAlign = "center"; 
		this.initTaskField();
		this.initAnswerButton();
		this.generateTask();
		this.printTask();
	}

	initTaskField() {
		this.context.fillStyle = "rgba(0, 0, 0, 0.8)";
		this.context.fillRect(window.innerWidth / 5, window.innerHeight / 3.5, window.innerWidth * 0.6, window.innerHeight * 0.6);
		this.context.fillStyle = "white";
		this.context.font = "30pt Arial";
		this.context.fillText("Your Task is", window.innerWidth * 0.5, window.innerHeight * 0.4);
	}

	generateTask() {
		this.taskNumbers = [];
		let taskOperations = ['+', '-', '*'];
		this.taskNumbers.push(Math.trunc(Math.random() * 100));
		this.taskNumbers.push(taskOperations[Math.floor(Math.random() * taskOperations.length)]); 
		let digitNumber = 100;
		if (this.taskNumbers[1] == '*')
			digitNumber = 10;
		this.taskNumbers.push(Math.trunc(Math.random() * digitNumber));
	}

	printTask() {
		this.taskNumbersString = this.taskNumbers.join(' ');
		this.context.fillStyle = "white";
		this.context.fillText(this.taskNumbersString + ' = ?', window.innerWidth * 0.5, window.innerHeight * 0.5);
		this.input = document.createElement('input');
		this.input.type = 'number';
		this.input.style.position = 'fixed';
		this.input.style.left = window.innerWidth * 0.45 + 'px';
		this.input.style.top = window.innerHeight * 0.6 + 'px';
		document.body.appendChild(this.input);
		this.input.focus();
	}

	initAnswerButton() {
		this.context.fillStyle = "rgba(255, 255, 255, 0.6)";
		let buttonWidth = 200,
		buttonHeight = 90;
		this.context.fillRect(window.innerWidth / 2.25, window.innerHeight / 1.5, buttonWidth, buttonHeight);
		this.context.fillStyle = "black";
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
				this.context.fillStyle = "rgba(255, 255, 255)";
				this.context.fillRect(0, window.innerHeight / 3, window.innerWidth, 400);
				this.context.fillStyle = "black";
				if ( this.input.value == eval(this.taskNumbersString)) {
					this.context.fillText("Correct!", window.innerWidth / 2.01, window.innerHeight / 1.8);	
					this.userAnswer = true;				
				}
				else { 
					this.context.fillText("Incorrect!", window.innerWidth / 2.01, window.innerHeight / 1.8);	
					this.userAnswer = false;
				}
				this.observer.broadcast(this.userAnswer);		
			}			
		}
		this.canvas.removeEventListener('click', this.listener);
	}
}	