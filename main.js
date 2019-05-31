$(document).ready(function () {
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
            var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ userInput +"&format=json&callback=?";
            if (userInput !== "") {
                whitespaceSearchVal = userInput.replace(whitespaceRegex, "%20") + '&format=json&callback=?';

                wikiURL = prefixURL + whitespaceSearchVal;
                wikiURL + "&continue=";

                $.ajax({
                    type : "GET",
                    url : url,
                    contentType:"application/json;charset=utf-8",
                    async : false,
                    dataType: "json",
                    success : function(data,textStatus,jqXHR){
                      $('#output').html('');  //Перезаписать содержимое всех соответствующих элементов
                      for(var i=0; i<data[1].length; i++){
                        $('#output').prepend("<li><a href="+ data[3][i] +">"+ data[1][i] +"</a><p>"+ data[2][i] +"</p></li>");
                      }
                      $('#user_input').val('');
                     // console.log(data);
                     //console.log(url);
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