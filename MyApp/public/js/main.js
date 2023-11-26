
const undo = document.getElementById('undo')
const middle = document.getElementById('middle_main')
const footer = document.getElementById('footer_main')
const viewHistory = document.getElementById('history')
const middle_history = document.getElementById('middle_history')
const footer_history = document.getElementById("footer_history")


function init(){
  viewHistory.style = middle.style = footer.style = "display : flex"
  undo.style = middle_history.style = footer_history.style = "display : none"
}


$("#undo").click((enent) => {
    viewHistory.style = middle.style = footer.style = "display : flex"
    undo.style = middle_history.style = footer_history.style = "display : none"
    console.log('ViewMain')
})

$("#history").click((enent) => {
    viewHistory.style = middle.style = footer.style = "display : none"
    undo.style = middle_history.style = footer_history.style = "display : flex"
    console.log('ViewHistory')
})


