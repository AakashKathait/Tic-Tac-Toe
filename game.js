
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
vsComputer.addEventListener('click', computerGame)
}

function cellEvent() {
    cells.forEach(cell => {
        cell.addEventListener('click', easyStart, {once: true})
    })
}

//EASY MODE
function computerGame() {
    vsPlayer.style.display = 'none'
    computerTurn = false;
    pickVs.innerHTML= ``
    vsComputer.classList.add('active')
    whosTurn.innerText = `Your turn!`


    cellEvent()
}

function easyStart(e) {
    const cell = e.target
    let currentClassAI = computerTurn ? player2 : player1

    if(cell.classList.contains(player1) || cell.classList.contains(player2)) {
        cell.removeEventListener('click')
    }else {
    placeMark(cell, player1);
    whosTurn.innerText = ``
    }
    if (checkWinAI(player1)) {
        computerTurn = false;
        endGameAI(false, currentClassAI)
    }else if (isDraw()) {
        endGameAI(true)
    } else {
        computerMark(player2, currentClassAI)
    }
}

        function computerMark(player2, currentClassAI) {
        let empltyCells = []
        cells.forEach(cell => {
            if(!cell.classList.contains(player1) && !cell.classList.contains(player2)){
                empltyCells.push(cell)
            }
        });
        cells.forEach(cell => {
            cell.removeEventListener('click', easyStart, {once: true})
        })
        setTimeout(() => {
            empltyCells[Math.floor(Math.random() * empltyCells.length)].classList.add(player2)
            if(checkWinAI(currentClassAI)) {
                endGameAI(false, currentClassAI)
            } 
            whosTurn.innerText = `Your turn!`
            cellEvent()
        }, 700);
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