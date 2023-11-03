document.addEventListener("mousemove", onMouseMove)

let Loop = setInterval(gameLoop, 1000 / 50)
let time = 0;

function gameLoop(){
    Update()
    Compare()
    Draw()
    
    
    time++;
}

function Update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < obstacle.length; i++) {
        obstacle[i].MovingPos()
    }

    for (let i = 0; i < player.length; i++) {
        player[i].UpdatePos(i)
        if(isgameover) {gameover(); break}
    }

    
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
    if(time % 1000 == 0) obstacle.push(new obstacleObj())
}

function gameover(){
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    // for (let i = 0; i < player.length; i++) {
    //     player[i].draw()
    // }
}

function onMouseMove(event){
    mouseX = event.clientX - canvas.getBoundingClientRect().left;
    mouseY = event.clientY - canvas.getBoundingClientRect().top;
}

canvas.addEventListener('mousedown', function(event){
    speed = 8
})

canvas.addEventListener('mouseup', function(event){
    speed = 5
})