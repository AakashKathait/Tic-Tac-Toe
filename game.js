const cells = document.querySelectorAll(".cell");
const board = document.querySelector(".board");
const winningMessage = document.querySelector(".wins");
const winner = document.querySelector(".game-winning");
const restartBtn = document.querySelector(".restart");
const vsPlayer = document.querySelector("#player");
const vsComputer = document.querySelector("#computer");
const pickVs = document.querySelector(".choose-game-text");
const whosTurn = document.querySelector(".turn");
const gameMode = document.querySelector(".game-mode");
const easyMode = document.querySelector("#easy");
const hardMode = document.querySelector("#hard");
const player1 = "x";
const player2 = "o";
let player2Turn;
let computerTurn;
const winCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//Open Game
openApp();
function openApp() {
  pickVs.innerText = "Pick an opponent";
  vsPlayer.style.display = "block";
  vsComputer.style.display = "block";
  vsPlayer.addEventListener("click", startGame);
  vsComputer.addEventListener("click", computerGame);
}

function easyCellEvent() {
  hardMode.style.display = "none";
  easyMode.classList.add("active");
  setBoardHoverClass();
  whosTurn.innerText = `Your turn!`;
  cells.forEach((cell) => {
    cell.addEventListener("click", easyStart, { once: true });
  });
}
function hardCellEvent() {
  easyMode.style.display = "none";
  hardMode.classList.add("active");
  setBoardHoverClass();
  whosTurn.innerText = `Your turn!`;
  cells.forEach((cell) => {
    cell.addEventListener("click", hardStart, { once: true });
  });
}

function computerGame() {
  vsPlayer.style.display = "none";
  vsComputer.style.display = "none";
  easyMode.style.display = "block";
  hardMode.style.display = "block";
  computerTurn = false;
  pickVs.innerHTML = ``;
  easyMode.addEventListener("click", easyCellEvent);
  hardMode.addEventListener("click", hardCellEvent);
}

//EASY MODE

function easyStart(e) {
  const cell = e.target;
  let currentClassAI = computerTurn ? player2 : player1;

  if (cell.classList.contains(player1) || cell.classList.contains(player2)) {
    cell.removeEventListener("click");
  } else {
    placeMark(cell, player1);
    whosTurn.innerText = ``;
  }
  if (checkWinAI(player1)) {
    computerTurn = false;
    endGameAI(false, currentClassAI);
  } else if (isDraw()) {
    endGameAI(true);
  } else {
    computerMark(player2, currentClassAI);
  }
}

const emptyCells = () => {
  let empltyCells = [];
  cells.forEach((cell) => {
    if (
      !cell.classList.contains(player1) &&
      !cell.classList.contains(player2)
    ) {
      empltyCells.push(cell);
    }
  });
  return empltyCells;
};

function computerMark(player2, currentClassAI) {
  board.classList.remove(player1);
  const availSpots = emptyCells();
  cells.forEach((cell) => {
    cell.removeEventListener("click", easyStart, { once: true });
  });
  setTimeout(() => {
    availSpots[Math.floor(Math.random() * availSpots.length)].classList.add(
      player2
    );
    if (checkWinAI(currentClassAI)) {
      endGameAI(false, currentClassAI);
    }
    whosTurn.innerText = `Your turn!`;
    easyCellEvent();
  }, 700);
  swapTurnsAI();
}

function placeMark(cell, currentClassAI) {
  cell.classList.add(currentClassAI);
}

function swapTurnsAI() {
  computerTurn = !computerTurn;
}

function endGameAI(draw) {
  if (draw) {
    winningMessage.innerText = "Draw!";
  } else {
    winningMessage.innerText = `${computerTurn ? "You Lost!" : "You won!"}`;
  }
  winner.classList.add("show");
}

function isDraw() {
  return [...cells].every((cell) => {
    return cell.classList.contains(player1) || cell.classList.contains(player2);
  });
}
isDraw();

function checkWinAI(currentClassAI) {
  return winCombo.some((combo) => {
    return combo.every((i) => {
      return cells[i].classList.contains(currentClassAI);
    });
  });
}

//HARD MODE

function hardStart(e) {
  const cell = e.target;
  let currentClassAI = computerTurn ? player2 : player1;

  if (cell.classList.contains(player1) || cell.classList.contains(player2)) {
    cell.removeEventListener("click");
  } else {
    placeMark(cell, player1);
    whosTurn.innerText = ``;
  }
  if (checkWinAI(player1)) {
    computerTurn = false;
    endGameAI(false, currentClassAI);
  } else if (isDraw()) {
    endGameAI(true);
  } else {
    hardComputerMark(currentClassAI);
  }
}

function hardComputerMark(currentClassAI) {
  board.classList.remove(player1);
  cells.forEach((cell) => {
    board.classList.remove(player1);
    cell.removeEventListener("click", hardStart, { once: true });
  });
  setTimeout(() => {
    bestSpot().classList.add(player2);
    if (checkWinAI(currentClassAI)) {
      endGameAI(false, currentClassAI);
    }
    whosTurn.innerText = `Your turn!`;
    hardCellEvent();
  }, 700);
  swapTurnsAI();
}

const bestSpot = () => {
  return minimax(player2).cell;
};

const minimax = (player) => {
  let availSpots = emptyCells();

  if (checkWinAI(player1)) {
    return { score: -10 };
  } else if (checkWinAI(player2)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }
  let moves = [];
  for (let i = 0; i < availSpots.length; i++) {
    let move = {};
    move.cell = availSpots[i];
    availSpots[i].classList.add(player);
    if (player == player2) {
      let result = minimax(player1);
      move.score = result.score;
    } else {
      let result = minimax(player2);
      move.score = result.score;
    }
    availSpots[i].classList.remove(player);
    moves.push(move);
  }

  let bestMove;
  if (player == player2) {
    let bestScore = -100;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = 100;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
};

// VS PLAYER GAME

function startGame() {
  player2Turn = false;
  cells.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
  pickVs.innerText = "";
  vsPlayer.classList.add("active");
  whosTurn.innerText = `X's turn!`;
  setBoardHoverClass();
  vsComputer.style.display = "none";
  vsPlayer.removeEventListener("click", startGame);
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = player2Turn ? player2 : player1;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
    if (currentClass == player2) {
      whosTurn.innerText = `X's turn!`;
    } else {
      whosTurn.innerText = `O's turn!`;
    }
  }
}

function endGame(draw) {
  if (draw) {
    winningMessage.innerText = "Draw!";
  } else {
    winningMessage.innerText = `${player2Turn ? "O" : "X"} Wins!`;
    whosTurn.innerText = `${player2Turn ? "O" : "X"} Wins!`;
  }
  winner.classList.add("show");
}

function isDraw() {
  return [...cells].every((cell) => {
    return cell.classList.contains(player1) || cell.classList.contains(player2);
  });
}
isDraw();

function checkWin(currentClass) {
  return winCombo.some((combo) => {
    return combo.every((i) => {
      return cells[i].classList.contains(currentClass);
    });
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  player2Turn = !player2Turn;
}

function setBoardHoverClass() {
  board.classList.remove(player1);
  board.classList.remove(player2);
  if (player2Turn) {
    board.classList.add(player2);
  } else {
    board.classList.add(player1);
  }
}

function checkWin(currentClass) {
  return winCombo.some((combo) => {
    return combo.every((i) => {
      return cells[i].classList.contains(currentClass);
    });
  });
}

// GAME END (RESTART)

restartBtn.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.classList.remove(player1);
    cell.classList.remove(player2);
    cell.removeEventListener("click", handleClick);
    cell.removeEventListener("click", hardStart);
    cell.removeEventListener("click", easyStart);
  });
  vsPlayer.style.display = "block";
  vsComputer.style.display = "block";
  easyMode.classList.remove("active");
  hardMode.classList.remove("active");
  vsPlayer.classList.remove("active");
  easyMode.style.display = "none";
  hardMode.style.display = "none";
  board.classList.remove(player1);
  board.classList.remove(player2);
  pickVs.innerText = "Pick an opponent";
  winner.classList.remove("show");
  whosTurn.innerText = ``;
  gameMode.innerText = ``;
  openApp();
});
