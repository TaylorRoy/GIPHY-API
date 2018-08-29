var array = ["cat", "dog", "bird"];

var image;

$(document).on("click", ".array-button", function () {


    $(".gif-area").empty();
    var search = $(this).attr("data-value");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&limit=10&rating=g&api_key=imAxurpr6b0arPCmmTJrtwZ8tg5jaBGY&"
    console.log(array);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        for (i = 0; i < response.data.length; i++) {

            image = $("<img>").attr("src", response.data[i].images.fixed_height.url);
            image.addClass("gif");
            $(".gif-area").append(image);
            var gifDiv = $("<div>");
            $(".gif-area").append(gifDiv);
            var pOne = $("<p>").text(response.data[i].rating);
            gifDiv.append(pOne);
        }
    });
});

function addButtons() {
    $(".buttons").empty();

    for (i = 0; i < array.length; i++) {
        var buttonDiv = $("<button>");
        buttonDiv.addClass("array-button");
        buttonDiv.attr("data-value", array[i])
        buttonDiv.text(array[i]);
        $(".buttons").append(buttonDiv);
    }
};

$("#search-input").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var newItem = $(".search-bar").val().trim();

    // Adding movie from the textbox to our array
    array.push(newItem);
    console.log(array)
    // Calling renderButtons which handles the processing of our movie array
    addButtons();
});

//$(document).on("click")

addButtons();