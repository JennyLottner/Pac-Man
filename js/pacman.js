'use strict'

const PACMAN = `<img src="img/pacman.gif"/>`
var gPacman

function createPacman(board) {
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false,
        deg : 0
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    if (!gGame.isOn) return
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            removeGhost(nextLocation)
        } else {
            gameOver()
            return
        }
    }
    if (nextCell === FOOD) {
        updateScore(1)
    }
    if (nextCell === COOKIE) updateScore(10)
    if (nextCell === SUPER_FOOD) {
        if (!gPacman.isSuper) {
            updateSuper()
        } else return
    }
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    renderCell(gPacman.location, EMPTY)

    gPacman.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    renderCell(nextLocation, getPacmanHTML(gPacman.deg))
    
    if (nextCell === FOOD) {
        checkVictory()
    }
}

function getPacmanHTML(deg) {
    return `<div style="transform: rotate(${deg}deg)">${PACMAN}</div>`
}

function getNextLocation(eventKeyboard) {
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            gPacman.deg = -90
            break;
        case 'ArrowRight':
            nextLocation.j++
            gPacman.deg = 0
            break;
        case 'ArrowDown':
            nextLocation.i++
            gPacman.deg = 90
            break;
        case 'ArrowLeft':
            nextLocation.j--
            gPacman.deg = 180
            break;
    }
    return nextLocation
}