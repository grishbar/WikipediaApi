$(document).ready(function () {
    // run code when search button is clicked
    $("#search").click(function () {
        let userInput = $("#user_input").val();         // gets the search input by the user
        let url = "https://ru.wikipedia.org/w/api.php?action=opensearch&search=" + userInput + "&format=json&callback=?";
        if (userInput !== "") {
            $.ajax({
                type: "GET",
                url: url,
                contentType: "application/json;charset=utf-8",
                async: false,
                dataType: "json",
                success: function (data) {
                    $('#output').html(''); //Перезаписать содержимое всех соответствующих элементов
                    for (let i = 0; i < data[1].length; i++) {
                        $('#output').prepend("<h2><a href=" + data[3][i] + ">" + data[1][i] + "</a></h2><p>" + data[2][i] + "</p></li>");
                        //data[3][i] - ссылка на статью  data[1][i] - заголловок статьи data[2][i] - сниппет
                    }
                },
                error: function (error) {
                    alert("error!");
                }
            });
        }
    });
    // allows search to run when enter button is clicked
    $('#user_input').keypress(function (event) {
        if (event.which === 13) {
            $("#search").click();
        }
    });
});