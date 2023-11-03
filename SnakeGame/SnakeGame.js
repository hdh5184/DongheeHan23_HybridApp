const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d");

var mouseX = 0, mouseY = 0



let isgameover = false;
let speed = 5

let player = []
player.push(new PlayerBodyObj())
player.push(new PlayerBodyObj())
player.push(new PlayerBodyObj())

let Apple = new AppleObj()

let obstacle = []







