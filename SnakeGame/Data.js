
//////////////////// 데이터 모음 ////////////////////

// 게임 시간, 뱀 길이(점수), 장애물 개수 표시
const TimeLabel = document.getElementById("time")
const ScoreLabel = document.getElementById("playerScore")
const difficultyLabel = document.getElementById("difficulty")

// 게임 필드가 되는 캔버스
const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d");

// 마우스 위치 저장
var mouseX = 0, mouseY = 0

// 게임 요소
let player = []     // 뱀
let obstacle = []   // 장애물
let Apple           // 사과

// 게임 상태
let isGameStart = false     // 게임 실행 유무
let isgameover = false      // 게임 오버 상태
let gameOverMsg             // 게임 오버 사유 메세지 저장

// 게임 루프 관련
let Loop, TimeCount // 게임 루프, 타이머 함수 저장
let LoopTime;       // 게임 루프 반복 횟수
let timer = 0       // 타이머 (1 = 0.01초)

// 게임 옵션
let isSpeedUp = false   // 뱀 이동 속도 증가 유무





