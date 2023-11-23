const mainPage = document.getElementById('mainPage')
const undo = document.getElementById('undo')
const viewHistory = document.getElementById('history')
const middle = document.getElementById('middle_main')
const middle_history = document.getElementById('middle_history')
const footer = document.getElementById('footer_main')
const ShareButton = document.getElementById('share')

ShareButton.addEventListener('click', share)
undo.addEventListener('click', ViewMain)
viewHistory.addEventListener('click', ViewHistory)

function init(){
    viewHistory.style = middle.style = footer.style = "display : flex"
    undo.style = middle_history.style = "display : none"
    //debug1()
}

function share() {
    if (navigator.share) {
        navigator.share({
            title: 'Your App Title',
            text: 'Check out this awesome app!',
            url: '/yee'
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
        console.log('Web Share API not supported');
        alert('Web Share API not supported');
    }
}

async function ViewMain() {
    viewHistory.style = middle.style = footer.style = "display : flex"
    undo.style = middle_history.style = "display : none"
    console.log('ViewMain')
}

function ViewHistory() {
    viewHistory.style = middle.style = footer.style = "display : none"
    undo.style = middle_history.style = "display : flex"
    console.log('ViewHistory')
}

function debug1(){
    viewHistory.style = middle.style = footer.style = "display : none"
    undo.style = middle_history.style = "display : flex"
    console.log('Debug1')
}

