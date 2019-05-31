$(document).ready(function () {
    let userInput = '';
    let wikiURL = '';
    let prefixURL = "https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srsearch=";
    let contentUrl = 'https://ru.wikipedia.org/wiki/';

    let whitespaceRegex = /\s+/g;
    let totalSummary = "";
    let parsedSummary = "";
    let whitespaceSearchVal = "";
    let whitespaceTitleVal = "";
    let titleVal = "";
    // total number of pages to return upon a search
    let pagesCount = 10;

    // run code when search button is clicked

    $("#search").click(function () {
            // gets the search input by the user
            let userInput = $("#user_input").val();

            if (userInput !== "") {
                whitespaceSearchVal = userInput.replace(whitespaceRegex, "%20") + '&format=json&callback=?';

                wikiURL = prefixURL + whitespaceSearchVal;
                wikiURL + "&continue=";

                $.ajax({
                        type: "GET",
                        url: wikiURL,
                        async: false,
                        dataType: "jsonp",
                        success: function (response) {
                            if (response == undefined)
                                $("#output").prepend("Соответствий запросу не найдено.");
                            $("#output").html('');
                            for (var i = 0; i < pagesCount; i++) {
                            titleVal = response.query.search[i].title;
                            whitespaceTitleVal = contentUrl + titleVal.replace(/\s+/g, '_');
                            $("#output").prepend("<div class='result-display'><h2>" + response.query.search[i].title + "</h2><p>" + response.query.search[i].snippet + "</p><a target='_blank' href='" + whitespaceTitleVal + "'>Read More</a></div>");
                            } 
                    },
                    error: function (error) {
                        alert("error!");
                    }
                });
            }
        });

// allows search to run when enter button is clicked
userInput = $("#user_input").val(); $('#user_input').keypress(function (event) {
    if (event.which === 13) {
        $("#search").click();
    }
});

function isURL(str) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!regex.test(str)) {
        return false;
    } else {
        return true;
    }
}
});