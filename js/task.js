class Task {
	constructor(canvas, context) {
		this.canvas = canvas;
		this.context = context;
		this.initTaskField();
		this.generateTask();
	}

	initTaskField() {
		this.context.fillStyle = "rgba(0, 0, 0, 0.8)";
		this.context.fillRect(window.innerWidth / 5, window.innerHeight / 3.5, window.innerWidth * 0.6, window.innerHeight * 0.6);
		this.context.textAlign="center"; 
		this.context.textBaseline = "middle";
		this.context.fillStyle = "white";
		this.context.fillText("Your Task is", window.innerWidth * 0.5, window.innerHeight * 0.4);
	}

	generateTask() {
		let taskNumbers = [];
		let taskOperations = ['+', '-', '*'];
		taskNumbers.push(Math.trunc(Math.random() * 100));
		taskNumbers.push(taskOperations[Math.floor(Math.random() * taskOperations.length)]); 
		taskNumbers.push(Math.trunc(Math.random() * 100));
		this.printTask(taskNumbers);
	}

	printTask(taskNumbers) {
		this.taskNumbersString = taskNumbers.join(' ');
		this.context.fillText(this.taskNumbersString + ' = ?', window.innerWidth * 0.5, window.innerHeight * 0.5);
		this.input = document.createElement('input');
		this.input.type = 'number';
		this.input.style.position = 'fixed';
		this.input.style.left = window.innerWidth * 0.45 + 'px';
		this.input.style.top = window.innerHeight * 0.6 + 'px';
		document.body.appendChild(this.input);
		this.input.focus();
		this.initAnswerButton();
	}

	initAnswerButton() {
		this.context.fillStyle = "rgba(255, 255, 255, 0.6)";
		let buttonWidth = 200,
			buttonHeight = 90;
		this.context.fillRect(window.innerWidth / 2.25, window.innerHeight / 1.5, buttonWidth, buttonHeight);
		this.context.textAlign="center"; 
		this.context.fillStyle = "black";
		this.context.fillText("Aswer!", window.innerWidth / 2.01, window.innerHeight / 1.4);
		this.clickAnswerButton(buttonWidth, buttonHeight);
	}

	clickAnswerButton(buttonWidth, buttonHeight) {
		this.canvas.addEventListener('click', (e)=> { this.checkAnswer(e, buttonWidth, buttonHeight)		
		});
	}

	checkAnswer(e, buttonWidth, buttonHeight) {
		if (e.clientX >= window.innerWidth / 2.25 && e.clientX <= window.innerWidth / 2.25 + buttonWidth) {
			if (e.clientY >= window.innerHeight / 1.5 && e.clientY <= window.innerHeight / 1.5 + buttonHeight)
				if ( this.input.value == eval(this.taskNumbersString)) 
					alert('Correct!');
				else
					alert('Incorrect!');
		}
	}
}	