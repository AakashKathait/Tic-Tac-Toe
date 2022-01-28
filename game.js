
const cells = document.querySelectorAll('.cell');
const board = document.querySelector('.board')
const winningMessage = document.querySelector('.wins')
const winner = document.querySelector('.game-winning')
const restartBtn = document.querySelector('.restart')
const vsPlayer = document.querySelector('#player')
const vsComputer = document.querySelector('#computer')
const pickVs = document.querySelector('.choose-game-text')
const whosTurn = document.querySelector('.turn')
const gameMode = document.querySelector('.game-mode')
const easyMode = document.querySelector('.easy')
const hardMode = document.querySelector('.hard')
const player1 = 'x'
const player2 = 'o'
let player2Turn
let computerTurn
const winCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

//Open Game
openApp();
function openApp() {
pickVs.innerText = 'Pick an opponent';
vsPlayer.style.display = 'block'
vsComputer.style.display = 'block'

cells.forEach(cell => {
    cell.removeEventListener('click', easyStart)
})

vsPlayer.addEventListener('click', startGame);
vsComputer.addEventListener('click', chooseMode)
}

// VS COMPUTER GAME
    function chooseMode() {
    let easyBtn = document.createElement('button')
    let hardBtn = document.createElement('button')
    vsPlayer.style.display = 'none'


    easyBtn.classList.add('easy')
    easyBtn.innerText = 'Easy'
    hardBtn.classList.add('hard')
    hardBtn.innerText = 'Hard'
    pickVs.innerText = '';
    pickVs.appendChild(easyBtn)
    pickVs.appendChild(hardBtn)

    vsComputer.classList.add('active')
    easyBtn.addEventListener('click', easyGame)
    hardBtn.addEventListener('click', hardGame)
    vsComputer.removeEventListener('click', chooseMode)
    cells.forEach(cell => {
        cell.removeEventListener('click', easyStart)
    })
}

//EASY MODE
function easyGame() {
    computerTurn = false;
    pickVs.innerHTML= ``
    gameMode.innerText= `Easy Mode`
    vsComputer.classList.add('active')
    whosTurn.innerText = `Your turn!`

    cells.forEach(cell => {
        cell.addEventListener('click', easyStart, {once: true})
    })
}

function easyStart(e) {
    const cell = e.target
    let currentClassAI = computerTurn ? player2 : player1

    if(cell.classList.contains(player1) || cell.classList.contains(player2)) {
        cell.removeEventListener('click')
    }else {
    placeMark(cell, player1);
    }
    if (checkWinAI(player1)) {
        computerTurn = false;
        endGameAI(false, currentClassAI)
    }else if (isDraw()) {
        endGameAI(true)
    } else {
        computerMark(player2, currentClassAI)
        if(currentClassAI == player2) {
            whosTurn.innerText = `Your turn!`
        }
    }
}

        function computerMark(player2, currentClassAI) {
        let empltyCells = []
        cells.forEach(cell => {
            if(!cell.classList.contains(player1) && !cell.classList.contains(player2)){
                empltyCells.push(cell)
                setTimeout(() => {
                    empltyCells[0].classList.add(player2)
                    if(checkWinAI(currentClassAI)) {
                        endGameAI(false, currentClassAI)
                    } 
                }, 500);
            }

        });
        swapTurnsAI()  
        setBoardHoverClass()  
        }

function placeMark(cell, currentClassAI)   {
    cell.classList.add(currentClassAI)
}

function swapTurnsAI() {
    computerTurn = true;
}

function endGameAI(draw, currentClassAI) {
    if (draw) {
        winningMessage.innerText = 'Draw!'
    }else {
        winningMessage.innerText = `${computerTurn ? 'You Lost!' : 'You won!'}`
        // whosTurn.innerText = `${computerTurn ? 'You Lost!' : 'You won!'}`
    }
    winner.classList.add('show')
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(player1) || 
        cell.classList.contains(player2)
    })
}
isDraw()

function checkWinAI(currentClassAI) {
    return winCombo.some(combo => {
        return combo.every(i => {
            return cells[i].classList.contains(currentClassAI)
        })
    })
}

//HARD MODE (MINIMAX ALGORITHM)
function hardGame() {
    pickVs.innerHTML= ``
    gameMode.innerText= `Hard Mode`
    vsComputer.classList.add('active')
}


// VS PLAYER GAME

function startGame() {
    player2Turn = false
    cells.forEach(cell => {
        cell.addEventListener('click', handleClick, {once: true})
    })
    pickVs.innerText = '';
    vsPlayer.classList.add('active')
    whosTurn.innerText = `X's turn!`
    setBoardHoverClass()
    vsComputer.style.display = 'none'
    vsPlayer.removeEventListener('click', startGame)
}


function handleClick(e) {
    const cell = e.target
    const currentClass = player2Turn ? player2 : player1 
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false)
    }else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
        if(currentClass == player2) {
            whosTurn.innerText = `X's turn!`
        }else {
            whosTurn.innerText = `O's turn!`
        }
    }
}

function endGame(draw) {
    if (draw) {
        winningMessage.innerText = 'Draw!'
    }else {
        winningMessage.innerText = `${player2Turn ? 'O' : 'X'} Wins!`
        whosTurn.innerText = `${player2Turn ? 'O' : 'X'} Wins!`
    }
    winner.classList.add('show')
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(player1) || 
        cell.classList.contains(player2)
    })
}
isDraw()


function checkWin(currentClass) {
    return winCombo.some(combo => {
        return combo.every(i => {
            return cells[i].classList.contains(currentClass)
        })
    })
}

function placeMark(cell, currentClass)   {
    cell.classList.add(currentClass)
}

function swapTurns() {
    player2Turn = !player2Turn;
}

function setBoardHoverClass() {
    board.classList.remove(player1)
    board.classList.remove(player2)
    if (player2Turn) {
        board.classList.add(player2)
    }else {
        board.classList.add(player1)
    }
}

function checkWin(currentClass) {
    return winCombo.some(combo => {
        return combo.every(i => {
            return cells[i].classList.contains(currentClass)
        })
    })
}


// GAME END (RESTART)

restartBtn.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.classList.remove(player1)
        cell.classList.remove(player2)
        cell.removeEventListener('click', handleClick)
    })
    vsPlayer.style.display = 'block'
    vsComputer.style.display = 'block'
    vsPlayer.classList.remove('active')
    vsComputer.classList.remove('active')
    board.classList.remove(player1)
    board.classList.remove(player2)
    pickVs.innerText = 'Pick an opponent';
    winner.classList.remove('show') 
    whosTurn.innerText = ``
    gameMode.innerText= ``
    openApp();
})