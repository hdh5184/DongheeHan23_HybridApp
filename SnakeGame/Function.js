document.addEventListener("mousemove", onMouseMove)


let Loop
let LoopTime = 0;

setInterval(Timer, 10)

function InitGame(){
    player = []
    obstacle = []

    player.push(new PlayerBodyObj())
    player.push(new PlayerBodyObj())
    player.push(new PlayerBodyObj())


    Apple = new AppleObj()
}

function GameLoop(){
    Update()
    Compare()
    Draw()
    LoopTime++;
}

function Update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < obstacle.length; i++) {
        obstacle[i].MovingPos()
    }

    for (let i = 0; i < player.length; i++) {
        player[i].UpdatePos(i)
    }

    TimeLabel.textContent = "시간(초) : " + timer / 100
    ScoreLabel.textContent = "뱀 길이 : " + player.length
    difficultyLabel.textContent = "난이도(장애물 개수) : " + obstacle.length
}

function Draw(){
    for (let i = 0; i < obstacle.length; i++) {
        obstacle[i].draw()
    }
    for (let i = player.length - 1; i >= 0; i--) {
        player[i].draw()
    }
    Apple.draw()
}

function Compare(){
    Apple.CompareGetApple()
    for (let i = 0; i < obstacle.length; i++) {
        if(obstacle[i].CompareOutCanvas()) {
            obstacle.splice(i, 1)
            obstacle.push(new obstacleObj())
        }
    }
    for (let i = 0; i < obstacle.length; i++) {
        obstacle[i].CompareCrash()
    }
    if(LoopTime % 500 == 0) obstacle.push(new obstacleObj())
    if(isgameover) gameover();
}

function gameover(){
    clearInterval(Loop)
    isGameStart = false
}

function Timer(){
    timer++
}

function onMouseMove(event){
    mouseX = event.clientX - canvas.getBoundingClientRect().left;
    mouseY = event.clientY - canvas.getBoundingClientRect().top;
}

canvas.addEventListener('mousedown', function(event){
    isSpeedUp = true
})

canvas.addEventListener('mouseup', function(event){
    isSpeedUp = false
})

document.addEventListener('keydown', function(event){
    if(event.key == 'Z' || event.key == 'z' || !isGameStart){
        InitGame()
        Loop = setInterval(GameLoop, 1000 / 50)
        isGameStart = true
    }
})