class Table {
	constructor(user) {
		this.currentUser = user;
		this.initTopResults();
		this.showResults();
		this.createTable();
	}

	initTopResults() {
		if (localStorage.getItem("top results"))
			this.topResults = JSON.parse(localStorage.getItem("top results"));
		else {
			this.topResults = [];
			localStorage.setItem("top results", JSON.stringify(this.topResults));
		}
	}

	showResults() {
		let canvas = document.getElementById('canvas');
		canvas.remove();
		let results = document.getElementById('results');
		results.classList.remove('results-hidden');
		results.classList.add('results');
		this.topResults.push(this.currentUser);

		if (this.topResults.length > 1) {
			this.topResults.sort((a, b) => {
				return b.defiatedMonstersNumber - a.defiatedMonstersNumber;
			});
		}

		localStorage.setItem('top results', JSON.stringify(this.topResults));
	}

	createTable() {
		let table = document.getElementById('table-result');
		let row = document.getElementsByClassName('pattern-row')[0];
		let i = 2;
		let rows = document.getElementsByTagName('tr');
		let cells = document.getElementsByTagName('td');
		table.rows[1].cells[0].innerHTML = this.topResults[0].characterName;
		table.rows[1].cells[1].innerHTML = this.topResults[0].defiatedMonstersNumber;
		while (i <= RECORDS_NUMBER && this.topResults[i - 1]) {
			let newRow = row.cloneNode(true);
			table.appendChild(newRow);
			table.rows[i].cells[0].innerHTML = this.topResults[i - 1].characterName;
			table.rows[i].cells[1].innerHTML = this.topResults[i - 1].defiatedMonstersNumber;
			i++;
		}
	}
}