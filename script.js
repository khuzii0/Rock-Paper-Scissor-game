// Mode switch Light\Dark

let turnModeBtn = document.querySelector("#turn-mode-btn");
let root = document.documentElement;
let lightMode = true;
const modeChange = () => {
  if (lightMode) {
    root.style.setProperty("--back-color", "#101820");
    root.style.setProperty("--box-color", "#FEE715");
    root.style.setProperty("--text-color", "#dff2f7");
    root.style.setProperty("--other-color", "#007cf1");
    lightMode = false;
    turnModeBtn.innerHTML = "Turn Light Mode";
  } else {
    root.style.setProperty("--back-color", "#FDF6F6");
    root.style.setProperty("--box-color", "#C5001A");
    root.style.setProperty("--text-color", "black");
    root.style.setProperty("--other-color", "#0e11d1");
    lightMode = true;
    turnModeBtn.innerHTML = "Turn Dark Mode";
  }
};
turnModeBtn.addEventListener("click", modeChange);

const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissor = document.querySelector("#scissor");
const winnerSec = document.querySelector(".winner-sec");
const resetBtn = document.querySelector("#reset-btn");
const difficultyLevel = document.querySelector("#difficulty");
const yourTurnElement = document.querySelector("#your-turn");
const compTurnElement = document.querySelector("#comp-turn");
const roundCountElement = document.querySelector("#round-count");
let roundCount = 0;
let yourTurn = "";
let compTurn = "";

// computer auto turn 

const winLogic = function(){
  if (yourTurn === "rock") {
    compTurn = "scissor"
  }
  else if (yourTurn === "paper") {
    compTurn = "rock"
  }
  else if (yourTurn === "scissor") {
    compTurn = "paper"
  }
}

const loseLogic = function(){
  if (yourTurn === "rock") {
    compTurn = "paper"
  }
  else if (yourTurn === "paper") {
    compTurn = "scissor"
  }
  else if (yourTurn === "scissor") {
    compTurn = "rock"
  }
}

let compAutoTurn;
if (difficultyLevel.innerHTML === "Easy") {
  compAutoTurn = () => {
    let val = Math.random();
    if (val <= 0.60) {
      winLogic()
    }
    else if (val <= 0.99) {
      loseLogic()
    }
  };
}
else if (difficultyLevel.innerHTML === "Medium") {
  compAutoTurn = () => {
    let val = Math.random();
    if (val <= 0.40) {
      winLogic()
    }
    else if (val <= 0.99) {
      loseLogic()
    }
  };
}
else if (difficultyLevel.innerHTML === "Hard") {
  compAutoTurn = () => {
    let val = Math.random();
    if (val <= 0.20) {
      winLogic()
    }
    else if (val <= 0.99) {
      loseLogic()
    }
  };
}

// difficulty level

difficultyLevel.addEventListener("click", () => {
  resetGame();
  if (difficultyLevel.innerHTML === "Easy") {
    difficultyLevel.innerHTML = "Medium"
  }
  else if (difficultyLevel.innerHTML === "Medium") {
    difficultyLevel.innerHTML = "Hard"
  }
  else if (difficultyLevel.innerHTML === "Hard") {
    difficultyLevel.innerHTML = "Easy"
  }
})

// player turn logic

const nextRound = () => {
  winner();
  resetRound();
  roundCount++;
  roundCountElement.innerText = `Round count : ${roundCount}`;
};
let playerTurn = () => {
  rock.addEventListener("click", () => {
    yourTurn = "rock";
    compAutoTurn();
    nextRound();
  });
  paper.addEventListener("click", () => {
    yourTurn = "paper";
    compAutoTurn();
    nextRound();
  });
  scissor.addEventListener("click", () => {
    yourTurn = "scissor";
    compAutoTurn();
    nextRound();
  });
};

// winner
const winner = () => {
  if (
    (yourTurn === "rock" && compTurn === "paper") ||
    (yourTurn === "paper" && compTurn === "scissor") ||
    (yourTurn === "scissor" && compTurn === "rock")
  ) {
    winnerSec.innerText = "you loss ⭕";
    compScore++;
    winnerSec.style.color = "red";
  } else if (
    (yourTurn === "rock" && compTurn === "scissor") ||
    (yourTurn === "paper" && compTurn === "rock") ||
    (yourTurn === "scissor" && compTurn === "paper")
  ) {
    winnerSec.innerText = "you won 🥇";
    yourScore++;
    winnerSec.style.color = "var(--other-color)";
  } else if (yourTurn === compTurn && yourTurn != "" && compTurn != "") {
    winnerSec.innerText = "match withdrawn 🔄️";
    winnerSec.style.color = "white";
  }
  winnerSec.classList.remove("hide");
  scoreUpdate();

  yourTurnElement.innerText = `Your turn : ${yourTurn}`;
  compTurnElement.innerText = `Computer turn : ${compTurn}`;
};

playerTurn();

// reset round
const resetRound = () => {
  yourTurn = "";
  compTurn = "";
};

// score update

const yourScoreElement = document.querySelector("#your-score");
const compScoreElement = document.querySelector("#comp-score");
const yourEmoji = document.querySelector("#your-score-emoji");
const compEmoji = document.querySelector("#comp-score-emoji");
const yourColor = document.querySelectorAll(".your-color");
const compColor = document.querySelectorAll(".comp-color");

let yourScore = 0;
let compScore = 0;

const scoreUpdate = () => {
  yourScoreElement.innerText = yourScore;
  compScoreElement.innerText = compScore;

  if (yourScore > compScore) {
    yourEmoji.innerText = "🏆";
    compEmoji.innerText = "⭕";
    yourColor.forEach((your) => {
      your.style.color = "var(--other-color)";
    });
    compColor.forEach((comp) => {
      comp.style.color = "red";
    });
  } else if (compScore > yourScore) {
    yourEmoji.innerText = "⭕";
    compEmoji.innerText = "🏆";
    yourColor.forEach((your) => {
      your.style.color = "red";
    });
    compColor.forEach((comp) => {
      comp.style.color = "var(--other-color)";
    });
  }
  else if(compScore == yourScore){
    yourEmoji.innerText = "🟰";
    compEmoji.innerText = "🟰";
    yourColor.forEach((your) => {
      your.style.color = "gray";
    });
    compColor.forEach((comp) => {
      comp.style.color = "gray";
    });
  }
};

// reset game

const resetGame = () => {
  roundCount = 0;
  roundCountElement.innerText =
  yourTurnElement.innerText = ``;
  compTurnElement.innerText = ``;
  yourEmoji.innerText = "";
  compEmoji.innerText = "";
  yourScore = 0;
  compScore = 0;
  scoreUpdate()
  yourTurn = "";
  compTurn = "";
  yourColor.forEach((your) => {
    your.style.color = "";
  });
  compColor.forEach((comp) => {
    comp.style.color = "";
  });
  winnerSec.classList.add("hide")
};

// reset button

resetBtn.addEventListener("click", resetGame);