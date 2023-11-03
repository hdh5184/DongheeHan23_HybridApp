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
        this.color = "#" + (0x40 + 0x30 * (player.length % 3)).toString(16).repeat(2) + "FF"

        this.temp = []
        for (let i = 0; i < 5; i++) {
            this.temp.push([this.PlayerPosX, this.PlayerPosY])
        }
    }

    UpdatePos(index){
        this.dirX = mouseX - this.PlayerPosX
        this.dirY = mouseY - this.PlayerPosY

        let scalar = Math.sqrt(this.dirX ** 2 + this.dirY ** 2)
        this.dirX /= scalar, this.dirY /= scalar

        if(scalar > 20){
            if(index == 0){
                this.PlayerPosX += this.dirX * speed
                this.PlayerPosY += this.dirY * speed
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
            clearInterval(Loop)
            isgameover = true
            //gameover
        }
    }

    draw(){
        ctx.beginPath()
        ctx.arc(this.PlayerPosX, this.PlayerPosY, 20, 0, 2*Math.PI)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.beginPath()
    }

}

class AppleObj{
    constructor(){
        this.ApplePosX = Math.random() * (canvas.width - 100) + 50
        this.ApplePosY = Math.random() * (canvas.height - 100) + 50
        
        this.dirX = 0, this.dirY = 0
        this.color = "#FF0000"
    }

    CompareGetApple(){
        this.dirX = this.ApplePosX - player[0].PlayerPosX
        this.dirY = this.ApplePosY - player[0].PlayerPosY

        let scalar = Math.sqrt(this.dirX ** 2 + this.dirY ** 2)

        if(scalar < 36){
            this.SetPositionApple()
            player.push(new PlayerBodyObj())
        }
    }

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

    draw(){
        ctx.beginPath()
        ctx.arc(this.ApplePosX, this.ApplePosY, 16, 0, 2*Math.PI)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.beginPath()
    }
}

class obstacleObj{
    color = ["red", "green", "blue", "gray", "black", "purple", "orange"]

    constructor(){
        this.obstacleX = 0, this.obstacleY = 0
        
        this.dirX = 0, this.dirY = 0
        this.color1 = parseInt(Math.random() * this.color.length)
        this.color2 = parseInt(Math.random() * this.color.length)

        this.size = (Math.random() * 20) + 10
        this.shapeType = parseInt(Math.random() * 3)
        this.degree = 0
        this.SetMovePosition()
    }

    SetMovePosition(){
        var random = parseInt(Math.random() * 4)

        switch(random){
            case 0: this.obstacleX = Math.random() * (canvas.width + 50) - 25
                    this.obstacleY = -25
                    this.dirX = (Math.random() * 8) - 4
                    this.dirY = (Math.random() * 4)
                    break
            case 1: this.obstacleX = Math.random() * (canvas.width + 50) - 25
                    this.obstacleY = canvas.height + 25
                    this.dirX = (Math.random() * 8) - 4
                    this.dirY = (Math.random() * -4)
                    break
            case 2: this.obstacleX = -25
                    this.obstacleY = Math.random() * (canvas.height + 50) - 25
                    this.dirX = (Math.random() * 4)
                    this.dirY = (Math.random() * 8) - 4
                    break
            case 3: this.obstacleX = canvas.width + 25
                    this.obstacleY = Math.random() * (canvas.height + 50) - 25
                    this.dirX = (Math.random() * -4)
                    this.dirY = (Math.random() * 8) - 4
                    break
        }
        console.log(this.obstacleX, this.obstacleY)
    }

    MovingPos(){
        this.obstacleX += this.dirX
        this.obstacleY += this.dirY
    }

    CompareOutCanvas(){
        if(this.obstacleX < -50 || this.obstacleX > canvas.width + 50 ||
            this.obstacleY < -50 || this.obstacleY > canvas.height + 50){
                console.log("나감 : " + this.obstacleX + ' / ' + this.obstacleY)
            }
        return this.obstacleX < -50 || this.obstacleX > canvas.width + 50 ||
                this.obstacleY < -50 || this.obstacleY > canvas.height + 50
    }

    // CompareGetApple(){
    //     this.dirX = this.ApplePosX - player[0].PlayerPosX
    //     this.dirY = this.ApplePosY - player[0].PlayerPosY

    //     let scalar = Math.sqrt(this.dirX ** 2 + this.dirY ** 2)

    //     if(scalar < 36){
    //         this.SetPositionApple()
    //         player.push(new PlayerBodyObj())
    //     }
    // }

    // SetPositionApple(){
    //     var isOverlappingPos = false

    //     while(true){
    //         this.ApplePosX = Math.random() * (canvas.width - 100) + 50
    //         this.ApplePosY = Math.random() * (canvas.height - 100) + 50

    //         for (let i = 0; i < player.length; i++) {
    //             var dirX = this.ApplePosX - player[i].PlayerPosX
    //             var dirY = this.ApplePosY - player[i].PlayerPosY
        
    //             var scalar = Math.sqrt(dirX ** 2 + dirY ** 2)
    //             if(scalar < 36) {isOverlappingPos = true; break}
    //         }
    //         if(isOverlappingPos) {
    //             isOverlappingPos = false
    //             continue
    //         }
    //         else break
    //     }
    // }

    draw(){
        
        ctx.beginPath()
        ctx.save()

        this.degree += Math.PI / 90
        ctx.translate(this.obstacleX, this.obstacleY)
        ctx.rotate(this.degree)

        switch (this.shapeType) {
            case 0:
                ctx.arc(0, 0, this.size, 0, 1*Math.PI)
                ctx.fillStyle = this.color[this.color1]
                ctx.fill()
                ctx.beginPath()
                ctx.arc(0, 0, this.size, 0, 1*Math.PI, true)
                ctx.fillStyle = this.color[this.color2]
                ctx.fill()
                ctx.beginPath()
                break
            case 1:
                ctx.fillStyle = this.color[this.color1]
                ctx.fillRect(-this.size, -this.size, this.size * 2, this.size * 2)
                ctx.beginPath()
                ctx.fillStyle = this.color[this.color2]
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size)
                ctx.beginPath()
                break
            case 2:
                ctx.moveTo(0, -this.size);
                ctx.lineTo(-this.size, this.size);
                ctx.lineTo(this.size, this.size);
                ctx.fillStyle = this.color[this.color1]
                ctx.fill();
                ctx.beginPath();
                break
        }
        
        
        ctx.restore()
    }
}