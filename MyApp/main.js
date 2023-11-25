const undo = document.getElementById('undo')
const viewHistory = document.getElementById('history')
const middle = document.getElementById('middle_main')
const middle_history = document.getElementById('middle_history')
const footer = document.getElementById('footer_main')


function init(){
    viewHistory.style = middle.style = footer.style = "display : flex"
    undo.style = middle_history.style = "display : none"
}

$("#share").click((enent) => {
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
})

$("#undo").click((enent) => {
    viewHistory.style = middle.style = footer.style = "display : flex"
    undo.style = middle_history.style = "display : none"
    console.log('ViewMain')
})

$("#history").click((enent) => {
    viewHistory.style = middle.style = footer.style = "display : none"
    undo.style = middle_history.style = "display : flex"
    console.log('ViewHistory')
})