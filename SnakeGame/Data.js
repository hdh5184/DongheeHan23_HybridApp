const TimeLabel = document.getElementById("time")
const ScoreLabel = document.getElementById("playerScore")
const difficultyLabel = document.getElementById("difficulty")

const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d");

var mouseX = 0, mouseY = 0


let timer = 0

let isGameStart = false
let isgameover = false;
let isSpeedUp = false

let player = []


let obstacle = []

let Apple







