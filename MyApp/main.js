const undo = document.getElementById('undo')
const viewHistory = document.getElementById('history')
const middle = document.getElementById('middle_Element')
const middle_history = document.getElementById('middle_history')
const footer = document.getElementById('footer_Element')

function init(){
    viewHistory.style = middle.style = footer.style = "display : flex"
    undo.style = middle_history.style = "display : none"
    //debug1()
}

viewHistory.addEventListener('click', function ViewHistory() {
    viewHistory.style = middle.style = footer.style = "display : none"
    undo.style = middle_history.style = "display : flex"
    console.log('ViewHistory')
})
undo.addEventListener('click', function ViewMain() {
    viewHistory.style = middle.style = footer.style = "display : flex"
    undo.style = middle_history.style = "display : none"
    console.log('ViewMain')
})
        




function debug1(){
    viewHistory.style = middle.style = footer.style = "display : none"
    undo.style = middle_history.style = "display : flex"
    console.log('Debug1')
}