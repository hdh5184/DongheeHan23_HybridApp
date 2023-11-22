const fs = require('node:fs')

var content = "테스트이다ㄴㅇㅇㄹㅋㅎ넝ㄴ리ㅏㅓㅎwehfowfdkjnvfjdnbs"

const filepath = "text.txt"

//callback

//writeFile(Sync)

try {
    fs.writeFileSync(filepath, content)
    fs.appendFileSync(filepath, "개샛기")
    fs.appendFileSync(filepath, "지금부터 환상의 아정쇼를")

    var data = fs.readFileSync(filepath, 'utf8')
    console.log('적절한 내용 : ' + data)

    //삭제
    //fs.unlinkSync(filepath)
} catch (error) {
    console.log("에러 즐ㅗ");
}
