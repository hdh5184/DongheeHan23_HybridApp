import { eventData } from "./init.js"

$("#NewsCurrent").click((event) => { $("#mainPage").hide(); $("#newsPage").show() })
$("#exit_news").click((event) => { $("#newsPage").hide(); $("#mainPage").show() })
$("#exit_news_detail").click((event) => { $("#newsPageDetail").hide(); $("#newsPage").show() })


$("#category_benefit").click((event) => {
    $("#event").hide(); $("#news").show()
    $("#category_benefit").css({ "background-color": "#385023", "color": "white" })
    $("#category_event").css({ "background-color": "white", "color": "#385023" })
})
$("#category_event").click((event) => {
    $("#news").hide(); $("#event").show()
    $("#category_benefit").css({ "background-color": "white", "color": "#385023" })
    $("#category_event").css({ "background-color": "#385023", "color": "white" })
})

$(".news_content").click((event)=>{
    const elementsWithClass = document.querySelectorAll('.news_content');
    const elementsArray = Array.from(elementsWithClass);
    let selectId

    elementsArray.forEach(element => {
        const clickedElement = event.target;
        const parentElement = element; // 특정 부모 요소

        // 클릭한 요소가 특정 부모 요소 안에 있는지 확인
        let isInsideParent = false;
        let currentElement = clickedElement;

        while (currentElement) {
            if (currentElement === parentElement) {
            isInsideParent = true;
            break;
            }
            currentElement = currentElement.parentNode;
        }

        if (isInsideParent) selectId = element.id; return
    });
    console.log(selectId)
})

//이벤트 목록 내용 확인
$(".event_content").click((event)=>{
    $("#newsPage").hide()
    $("#newsPageDetail").show()

    const elementsWithClass = document.querySelectorAll('.event_content');
    const elementsArray = Array.from(elementsWithClass);
    let selectId

    elementsArray.forEach(element => {
        const clickedElement = event.target;
        const parentElement = element; // 특정 부모 요소

        // 클릭한 요소가 특정 부모 요소 안에 있는지 확인
        let isInsideParent = false;
        let currentElement = clickedElement;

        while (currentElement) {
            if (currentElement === parentElement) {
            isInsideParent = true;
            break;
            }
            currentElement = currentElement.parentNode;
        }

        if (isInsideParent) selectId = element.id; return
    });

    console.log(selectId)

    eventData.forEach((data) => {
        if(selectId == `event_${data.id}`){
            var appendDiv = document.createElement("div");
            appendDiv.className = "news_detail"
            appendDiv.style = data.background
            appendDiv.style.backgroundImage =
            document.getElementById(selectId).style.backgroundImage

            appendDiv.innerHTML = `
            <div id="news_detail_sub">
                <div id="news_detail_div">
                    <p id="news_detail_date">${data.date}</p>
                    <p id="news_detail_title">${data.content}</p>
                    <hr>
                    <p id="news_detail_content1">${data.contentDetailA}</p>
                    <p id="news_detail_content2">${data.contentDetailB}</p>
                    <p id="news_detail_event_description">
                        ${data.eventDateDescription}</p>
                    <p id="news_detail_description">${data.detailDescription}</p>
                </div>
            </div>
            `

            document.getElementById("middle_news_detail").innerHTML = ''
            document.getElementById("middle_news_detail").appendChild(appendDiv)
        }
    })
})

