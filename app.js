var possibleRuns = [0, 1]; 
var team1 = {
	name: "SRH",
	runs: [],
	score: 0
};
var team2 = {
	name: "CSK",
	runs: [],
	score: 0
};

var turn; 
var confetti;

window.addEventListener("load", () => {
	selectTurn(); 
	updateButtonText(); 
	updateScore(); 
	updateNames(); 


	var confettiSettings = {
		target: "confetti-canvas",
		props: ["square", "triangle", "line"],
		clock: 70
	};
	confetti = new ConfettiGenerator(confettiSettings);
});


var handleStrikeButtonClick = () => {

	var run = possibleRuns[Math.floor(Math.random() * possibleRuns.length)];
	run = run === 8 ? "W" : run; 
	
	if (turn === 1) {
		team1.runs.push(run); 
		team1.score = calculateScore(team1.runs); 
	} else {
		team2.runs.push(run);
		team2.score = calculateScore(team2.runs);
	}

	
	
	
	updateScore();
	updateButtonText();
};

var selectTurn = () => {
	turn = Math.round(Math.random()) + 1;
};

var updateButtonText = () => {
	var button = document.getElementById("strike-button"); 
	var result = document.getElementById("result"); 
	result.style.visibility = ""; 

	if (team1.runs.length == 6 && team2.runs.length == 6) {
		button.remove(); 

		
		result.textContent =
			team1.score === team2.score
				? `Its a draw`
				: 
				  `${team1.score > team2.score ? team1.name : team2.name} Wins`;

		
		confetti.render();
		document.getElementById("confetti-canvas").style.zIndex = "1";
	} else {
		
		turn = team1.runs.length === 6 ? 2 : team2.runs.length === 6 ? 1 : turn;

		
		button.textContent = `HIT (${turn === 1 ? team1.name : team2.name})`;
	}
};


var updateScore = () => {
	
	document.getElementById("team-1-score").textContent = team1.score;
	
	document.getElementById("team-2-score").textContent = team2.score;
	updateRuns(); 
};


var updateNames = () => {
	document.getElementById("team-1-name").textContent = team1.name; 
	document.getElementById("team-2-name").textContent = team2.name; 
};

var updateRuns = () => {
	var teamOneRunsElement = document.getElementById("team-1-round-runs")
		.children;
	var teamTwoRunsElement = document.getElementById("team-2-round-runs")
		.children;

	team1.runs.forEach((run, index) => {
		if(run==1)
		{
			teamOneRunsElement[index].style.backgroundColor="green";
		}
		else
		{
			teamOneRunsElement[index].style.backgroundColor="red";
		}
	});

	team2.runs.forEach((run, index) => {
		
		if(run==1)
		{
			teamTwoRunsElement[index].style.backgroundColor="green";
		}
		else
		{
			teamTwoRunsElement[index].style.backgroundColor="red";
		}
	});
};

var calculateScore = runs => {
	return runs
		.map(num => {
			return num == "W" ? 0 : num;
		})
		.reduce((total, num) => total + num);
};
(() => {
	setTimeout(() => {
	  document.getElementsByTagName("body")[0].style.backgroundColor = 'lightgreen';
	}, 50)
  })();
  function sampleFunction() {
	location.reload();
  }
