'use strict'

const WALL = '⬛'
const FOOD = '.'
const EMPTY = ' '
const SUPER_FOOD = '🥦'
const COOKIE = '🍪'

const gGame = {
    score: 0,
    isOn: false
}
var gBoard
var gCookieInterval
var gLeftOver

function onInit() {
    hideModal()
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard)
    updateScore(0)
    gGame.isOn = true
    gCookieInterval = setInterval(() => {
        cookiePlacement();
    }, 15000)
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            } else if ((i === 1 && (j === 1 || j === size - 2)) ||
                (i === size - 2 && (j === 1 || j === size - 2))) {
                board[i][j] = SUPER_FOOD
            }
        }
    }
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]            
            const className = (cell === WALL) ? `wall cell-${i}-${j}` : `cell cell-${i}-${j}`
            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function updateScore(diff) {
    // DONE: update model and dom
    if (!diff) {
        gGame.score = 0
    } else {
        gGame.score += diff
    }
    document.querySelector('span.score').innerText = gGame.score
}

function updateSuper() {
    gPacman.isSuper = true
    const elGhosts = document.querySelectorAll('.ghost')

    setTimeout(() => {
        for (var i = 0; i < gRemovedGhosts.length; i++) {
            gGhosts.push(gRemovedGhosts[i])
        }
        gRemovedGhosts = []
        gPacman.isSuper = false
    }, 5000)
}

function cookiePlacement() {
    //Modal
    const additionCell = getEmptyCell()
    if (!additionCell) return
    gBoard[additionCell.i][additionCell.j] = COOKIE
    //DOM
    renderCell(additionCell, COOKIE)
}

function getEmptyCell() {
    const emptyCells = []
    for (var i = 1; i < gBoard.length - 1; i++) {
        for (var j = 1; j < gBoard[0].length - 1; j++) {
            if (gBoard[i][j] === EMPTY) emptyCells.push({ i, j })
        }
    }
    const chosenCell = emptyCells[getRandomInt(0, emptyCells.length)]
    return chosenCell
}

function checkVictory() {
    for (var i = 1; i < gBoard.length - 1; i++) {
        for (var j = 1; j < gBoard[0].length - 1; j++) {
            if (gBoard[i][j] === FOOD) return
        }
    }
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].currCellContent === FOOD) return
    }
    gameOver('Victory!')
}

function gameOver(msg = 'Game Over') {
    const type = (msg === 'Game Over') ? "audio/GameOver.mp3" : "audio/applause.mp3"
    const sound = new Audio(type)
    sound.play()
    showModal(msg)
    clearInterval(gIntervalGhosts)
    clearInterval(gCookieInterval)
    if (msg === 'Game Over') renderCell(gPacman.location, '🪦')
    gGame.isOn = false
}