'use strict'

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function showModal(msg) {
    const elModal = document.querySelector('.modal')
    elModal.querySelector('span').innerText = msg
    elModal.classList.remove('hide')
}

function hideModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.add('hide')
}


function getRandomInt(min, max) {
    if (Math.ceil(min) > Math.floor(max)) {
        console.log('Next time try a bigger range')
        return NaN
    }                                           // add '+ 1'        HERE      to make it inclusive of max
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min))
}