'use strict'

const GHOST = '👻'
var gGhosts = []
var gRemovedGhosts = []

var gIntervalGhosts

function createGhosts(board) {
    // DONE: 3 ghosts and an interval
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    if (gIntervalGhosts) clearInterval(gIntervalGhosts)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    // DONE
    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD,
        className: `ghost ghost-${gGhosts.length + 1}`
    }

    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) {
        renderCell(ghost.location, getGhostHTML(ghost))
        return
    }
    if (nextCell === GHOST) {
        renderCell(ghost.location, getGhostHTML(ghost))
        return
    }
    // DONE: hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        if (gPacman.isSuper) {
            removeGhost(nextLocation)
        } else {
            gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
            renderCell(ghost.location, ghost.currCellContent)

            ghost.location = nextLocation
            ghost.currCellContent = nextCell

            gBoard[nextLocation.i][nextLocation.j] = GHOST
            renderCell(ghost.location, getGhostHTML(ghost))
            gameOver()
            return
        }
    }

    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    renderCell(ghost.location, ghost.currCellContent)

    ghost.location = nextLocation
    ghost.currCellContent = nextCell

    gBoard[nextLocation.i][nextLocation.j] = GHOST
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    var colorStr = (gPacman.isSuper) ? 'activated' : ''
    return `<span class="${ghost.className} ${colorStr}">${GHOST}</span>`
}

function removeGhost(nextLocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (nextLocation.i === gGhosts[i].location.i &&
            nextLocation.j === gGhosts[i].location.j) {
            console.log('gRemovedGhosts:', gRemovedGhosts)
            gRemovedGhosts.push(gGhosts.splice(i, 1)[0])
        }
    }
}