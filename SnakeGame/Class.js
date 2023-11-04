
//////////////////// 게임 요소 클래스 ////////////////////

// 플레이어(뱀)
class PlayerBodyObj{
    constructor(){
        try {
            this.PlayerPosX = player[player.length - 1].temp[0][0]
            this.PlayerPosY = player[player.length - 1].temp[0][1]
        } catch (error) {
            this.PlayerPosX = canvas.width / 2
            this.PlayerPosY = canvas.height / 2
        }
        
        this.dirX = 0, this.dirY = 0
        this.speed = 5
        this.randomColor = (0x40 + 0x30 * (player.length % 3)).toString(16)
        this.color = "#" + this.randomColor.repeat(2) + "FF"


        this.temp = []
        for (let i = 0; i < 5; i++) {
            this.temp.push([this.PlayerPosX, this.PlayerPosY])
        }
    }

    // 뱀 위치 이동, 뱀이 마우스 커서에 닿으면 게임 종료
    UpdatePos(index){
        this.speed = (isSpeedUp) ? 9 : 5

        this.dirX = mouseX - this.PlayerPosX
        this.dirY = mouseY - this.PlayerPosY
        
        
        let scalar = Math.sqrt(this.dirX ** 2 + this.dirY ** 2)
        this.dirX /= scalar, this.dirY /= scalar

        if(scalar > 20){
            if(index == 0){
                this.PlayerPosX += this.dirX * this.speed
                this.PlayerPosY += this.dirY * this.speed
                this.temp.push([this.PlayerPosX, this.PlayerPosY])
                this.temp.shift()

            }
            else{
                this.PlayerPosX = player[index - 1].temp[0][0]
                this.PlayerPosY = player[index - 1].temp[0][1]
                this.temp.push([this.PlayerPosX, this.PlayerPosY])
                this.temp.shift()
            }
        }
        else{
            for (let i = index; i > 0; i--) {
                player[i - 1].PlayerPosX = player[i - 1].temp[3][0]
                player[i - 1].PlayerPosY = player[i - 1].temp[3][1]
            }
            isgameover = true
            gameOverMsg = "당신이 내린 계시가 뱀을 짓눌러버렸습니다."
        }
    }

    // 뱀이 캔버스를 벗어날 경우 게임 종료
    CompareOutCanvas(){
        if(this.PlayerPosX <= 0 || this.PlayerPosX >= canvas.width ||
            this.PlayerPosY <= 0 || this.PlayerPosY >= canvas.height)
            {
                isgameover = true
                gameOverMsg = "[알림] \'뱀\'이(가) 세상을 탈퇴하였습니다."
            }
    }

    // 뱀 그리기 (원 하나)
    draw(){
        ctx.beginPath()
        ctx.arc(this.PlayerPosX, this.PlayerPosY, 20, 0, 2*Math.PI)
        ctx.fillStyle = (isSpeedUp) ? "#ff" + this.randomColor.repeat(2) : "#" + this.randomColor.repeat(2) + "ff"
        ctx.fill()
        ctx.beginPath()
    }
}


// 사과 오브젝트
class AppleObj{
    constructor(){
        this.ApplePosX = Math.random() * (canvas.width - 100) + 50
        this.ApplePosY = Math.random() * (canvas.height - 100) + 50
        
        this.dirX = 0, this.dirY = 0
        this.color = "#FF0000"
    }

    // 뱀이 사과 획득 시 뱀 길이 증가 및 사과 생성
    CompareGetApple(){
        this.dirX = this.ApplePosX - player[0].PlayerPosX
        this.dirY = this.ApplePosY - player[0].PlayerPosY

        let scalar = Math.sqrt(this.dirX ** 2 + this.dirY ** 2)

        if(scalar < 36){
            this.SetPositionApple()
            player.push(new PlayerBodyObj())
        }
    }

    // 사과 생성 위치 설정
    SetPositionApple(){
        var isOverlappingPos = false

        while(true){
            this.ApplePosX = Math.random() * (canvas.width - 100) + 50
            this.ApplePosY = Math.random() * (canvas.height - 100) + 50

            for (let i = 0; i < player.length; i++) {
                var dirX = this.ApplePosX - player[i].PlayerPosX
                var dirY = this.ApplePosY - player[i].PlayerPosY
        
                var scalar = Math.sqrt(dirX ** 2 + dirY ** 2)
                if(scalar < 36) {isOverlappingPos = true; break}
            }
            if(isOverlappingPos) {
                isOverlappingPos = false
                continue
            }
            else break
        }
    }

    // 사과 그리기
    draw(){
        this.color = "#ff" + (0x40 + 0x10 * (LoopTime % 9)).toString(16).repeat(2)

        ctx.beginPath()
        ctx.arc(this.ApplePosX, this.ApplePosY, 16, 0, 2*Math.PI)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.beginPath()
    }
}



// 장애물 오브젝트
class obstacleObj{
    color = ["red", "green", "blue", "gray", "black", "purple", "orange"]

    constructor(){
        this.obstacleX = 0, this.obstacleY = 0
        
        this.moveX = 0, this.moveY = 0
        this.color1 = parseInt(Math.random() * this.color.length)
        this.color2 = parseInt(Math.random() * this.color.length)

        this.size = (Math.random() * 20) + 10
        this.shapeType = parseInt(Math.random() * 3)
        this.degree = 0
        this.SetMovePosition()
    }

    // 장애물 위치 이동
    SetMovePosition(){
        var random = parseInt(Math.random() * 4)

        switch(random){
            case 0: this.obstacleX = Math.random() * (canvas.width + 50) - 25
                    this.obstacleY = -25
                    this.moveX = (Math.random() * 8) - 4
                    this.moveY = (Math.random() * 4)
                    break
            case 1: this.obstacleX = Math.random() * (canvas.width + 50) - 25
                    this.obstacleY = canvas.height + 25
                    this.moveX = (Math.random() * 8) - 4
                    this.moveY = (Math.random() * -4)
                    break
            case 2: this.obstacleX = -25
                    this.obstacleY = Math.random() * (canvas.height + 50) - 25
                    this.moveX = (Math.random() * 4)
                    this.moveY = (Math.random() * 8) - 4
                    break
            case 3: this.obstacleX = canvas.width + 25
                    this.obstacleY = Math.random() * (canvas.height + 50) - 25
                    this.moveX = (Math.random() * -4)
                    this.moveY = (Math.random() * 8) - 4
                    break
        }
    }

    // 장애물 이동
    MovingPos(){
        this.obstacleX += this.moveX
        this.obstacleY += this.moveY
    }

    // 장애물이 캔버스를 벗어날 경우 장애물 재생성
    CompareOutCanvas(){
        return this.obstacleX < -50 || this.obstacleX > canvas.width + 50 ||
                this.obstacleY < -50 || this.obstacleY > canvas.height + 50
    }

    // 뱀이 장에물에 부딪힐 경우 게임 종료
    CompareCrash(){
        var isCrash = false

        for (let i = 0; i < player.length; i++) {
            var dirX = this.obstacleX - player[i].PlayerPosX
            var dirY = this.obstacleY - player[i].PlayerPosY

            var scalar = Math.sqrt(dirX ** 2 + dirY ** 2)
            if(scalar < this.size + 20) {isCrash = true; break}
        }

        if(isCrash) {
            isgameover = true
            gameOverMsg = "대충 무언가에 부딪혀 뱀이 저 세상 갔습니다."
        }
    }

    // 장애물 그리기
    draw(){
        ctx.beginPath()
        ctx.save()

        this.degree += Math.PI / 90
        ctx.translate(this.obstacleX, this.obstacleY)
        ctx.rotate(this.degree)

        switch (this.shapeType) {
            case 0:
                ctx.fillStyle = this.color[this.color1]
                ctx.arc(0, 0, this.size, 0, 1*Math.PI)
                ctx.fill()
                ctx.beginPath()
                ctx.fillStyle = this.color[this.color2]
                ctx.arc(0, 0, this.size, 0, 1*Math.PI, true)
                ctx.fill()
                ctx.beginPath()
                break
            case 1:
                ctx.fillStyle = this.color[this.color1]
                ctx.fillRect(-this.size, -this.size, this.size * 2, this.size * 2)
                ctx.beginPath()
                ctx.fillStyle = this.color[this.color2]
                ctx.arc(0, 0, this.size, 0, 2*Math.PI)
                ctx.fill()
                ctx.beginPath()
                break
            case 2:
                ctx.fillStyle = this.color[this.color1]
                ctx.moveTo(0, (-this.size -(this.size / 3)) * 1.4);
                ctx.lineTo(-this.size * 1.5, (this.size -(this.size / 3)) * 1.5);
                ctx.lineTo(this.size * 1.5, (this.size -(this.size / 3)) * 1.5);
                ctx.fill();
                ctx.beginPath();
                ctx.fillStyle = this.color[this.color2]
                ctx.arc(0, 0, this.size, 0, 2*Math.PI)
                ctx.fill()
                ctx.beginPath()
                break
        }
        ctx.restore()
    }
}