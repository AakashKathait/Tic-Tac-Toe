
const cells = document.querySelectorAll('.cell');
const board = document.querySelector('.board')
const winningMessage = document.querySelector('.wins')
const winner = document.querySelector('.game-winning')
const restartBtn = document.querySelector('.restart')
const player1 = 'x'
const player2 = 'o'
let player2Turn

const winCombo = [
    [0,1,2],
    [4,5,6],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


startGame()

restartBtn.addEventListener('click', startGame)

function startGame() {
    player2Turn = false
    cells.forEach(cell => {
        cell.classList.remove(player1)
        cell.classList.remove(player2)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    winner.classList.remove('show') 
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
    }
}

function endGame(draw) {
    if (draw) {
        winningMessage.innerText = 'Draw!'
    }else {
        winningMessage.innerText = `${player2Turn ? 'O' : 'X'} Wins!`
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