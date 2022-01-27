
const cells = document.querySelectorAll('.cell');
const board = document.querySelector('.board')
const winningMessage = document.querySelector('.wins')
const winner = document.querySelector('.game-winning')
const restartBtn = document.querySelector('.restart')
const vsPlayer = document.querySelector('#player')
const vsComputer = document.querySelector('#computer')
const pickVs = document.querySelector('.choose-game-text')
const whosTurn = document.querySelector('.turn')
const player1 = 'x'
const player2 = 'o'
let player2Turn

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

pickVs.innerText = 'Pick an opponent';

vsPlayer.addEventListener('click', startGame);

restartBtn.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.classList.remove(player1)
        cell.classList.remove(player2)
        cell.removeEventListener('click', handleClick)
    })
    vsPlayer.classList.remove('active')
    board.classList.remove(player1)
    board.classList.remove(player2)
    pickVs.innerText = 'Pick an opponent';
    winner.classList.remove('show') 
    whosTurn.innerText = ``
})

function startGame() {
    player2Turn = false
    cells.forEach(cell => {
        cell.addEventListener('click', handleClick, {once: true})
    })
    pickVs.innerText = '';
    vsPlayer.classList.add('active')
    whosTurn.innerText = `X's turn!`
    setBoardHoverClass()
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