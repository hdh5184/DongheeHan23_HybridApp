$("#NewsCurrent").click((event) => { $("#mainPage").hide(); $("#newsPage").show() })
$("#exit_news").click((event) => { $("#newsPage").hide(); $("#mainPage").show() })


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