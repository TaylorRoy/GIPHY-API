var array = ["cat", "dog", "bird"];



$(document).on("click", ".array-button", function() {

    //event.preventDefault();
    
    var search = $(this).attr("data-value");
    //console.log(this);
    //console.log(search);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&limit=10&api_key=imAxurpr6b0arPCmmTJrtwZ8tg5jaBGY&"
    
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log(response.data[0].images.fixed_height);
        //var gifDiv = $("<div>");
        //$(".gif-area").append(gifDiv);
        var image = $("<img>").attr("src", response.data[0].images.fixed_height.mp4);
        $(".gif-area").append(image);
        //var pOne = $("<p>").text(JSON.stringify(response));
        //gifDiv.html(pOne);

      });
});

function addButtons(){
    $(".buttons").empty();

    for (i=0; i < array.length; i++) {
        var buttonDiv = $("<button>");
        buttonDiv.addClass("array-button");
        buttonDiv.attr("data-value", array[i])
        //console.log (buttonDiv.attr("data-value"));
        buttonDiv.text(array[i]);
        $(".buttons").append(buttonDiv);
    }
};

$("#search-input").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var newItem = $(".search-bar").val().trim();
    
    //replace(' ', '+')

    // Adding movie from the textbox to our array
    array.push(newItem);
    console.log(array)
    // Calling renderButtons which handles the processing of our movie array
    addButtons();
  });

addButtons();