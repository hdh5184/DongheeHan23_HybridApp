
// 이벤트 별 함수 실행
document.addEventListener("mousemove", onMouseMove)
document.addEventListener("mousedown", PlayerSpeedUp)
document.addEventListener("mouseup", PlayerSpeedDown)
document.addEventListener("keydown", GameStart)

// 처음 실행 시
function Load(){
    ctx.textAlign = "center"
    ctx.font = "bold 50px Arial, sans-serif"
    ctx.fillText("시작하려면 'Z' 키를 누르시오.", canvas.width / 2, canvas.height / 2 - 40)
    ctx.font = "bold 30px Arial, sans-serif"
    ctx.fillText("(마우스를 캔버스 중심으로부터 떨어트리세요.)", canvas.width / 2, canvas.height / 2 + 40)
}


//////////////////// 게임 실행 관련 함수 ////////////////////

// 게임 초기화
function InitGame(){
    isgameover = false
    
    LoopTime = 0
    timer = 0
    Loop = setInterval(GameLoop, 1000 / 50)
    TimeCount = setInterval(Timer, 10)
    
    player = []
    obstacle = []
    
    player.push(new PlayerBodyObj())
    player.push(new PlayerBodyObj())
    player.push(new PlayerBodyObj())
    Apple = new AppleObj()
}

// 타이머
function Timer() {timer++}

// 게임 루프
function GameLoop(){
    Update()
    Draw()
    Compare()
    LoopTime++;
}


//////////////////// 게임 루프에 실행하는 함수 ////////////////////

// 게임 요소 업데이트
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

// 캔버스 내 요소 그리기
function Draw(){
    for (let i = 0; i < obstacle.length; i++) {
        obstacle[i].draw()
    }
    for (let i = player.length - 1; i >= 0; i--) {
        player[i].draw()
    }
    Apple.draw()
}

// 요소 별 검사 실행
function Compare(){
    player[0].CompareOutCanvas()
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
    if(LoopTime % 250 == 0) obstacle.push(new obstacleObj())
    if(isgameover) gameover();
}


/////////////// 게임 시작 및 종료 함수 ////////////////////

// 게임 시작
function GameStart(event){
    if((event.key == 'Z' || event.key == 'z') && !isGameStart){
        InitGame()
        isGameStart = true
    }
}

// 게임 종료
function gameover(){
    clearInterval(Loop)
    clearInterval(TimeCount)
    isGameStart = false

    ctx.font = "bold 50px Arial, sans-serif"
    ctx.textAlign = "center", ctx.fillStyle = "red"
    ctx.fillText(gameOverMsg, canvas.width / 2, canvas.height / 2 - 40)
    ctx.beginPath()
    ctx.font = "bold 30px Arial, sans-serif"
    ctx.textAlign = "center", ctx.fillStyle = "black"
    ctx.fillText("다시 시작하려면 'Z' 키를 누르시오. (마우스를 캔버스 중심으로부터 떨어트리세요.)", 
                canvas.width / 2, canvas.height / 2 + 40)
}


//////////////////// 이벤트 함수 모음 ////////////////////

function PlayerSpeedUp(event) {isSpeedUp = true}    // 뱀 스피드 증가 - 마우스 누름
function PlayerSpeedDown(event) {isSpeedUp = false} // 뱀 스피드 감소 - 마우스 뗌

// 마우스 커서 위치 설정 - 마우스 움직임
function onMouseMove(event){
    mouseX = event.clientX - canvas.getBoundingClientRect().left;
    mouseY = event.clientY - canvas.getBoundingClientRect().top;
}