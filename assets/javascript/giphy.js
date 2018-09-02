var array = ["cat", "dog", "bird"];

var image;
var search;
var queryURL;

//used to call giphy api when a button is clicked and display search appropriate gifs that are g rated
$(document).on("click", ".array-button", function () {

    //clears gif area in html dom for next set of gifs
    $(".gif-area").empty();
    //updates data-value that is used in api query
    search = $(this).attr("data-value");

    //calling giphy api with dynamic search for 10 gifs with g rating
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&limit=10&rating=g&api_key=imAxurpr6b0arPCmmTJrtwZ8tg5jaBGY&"
    
    console.log(array);

    //ajax call 
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        
        //iterating through 10 gif results to have them show up on html dom
        for (i = 0; i < response.data.length; i++) {
            //add div to hold image and rating divs
            var gifDiv = $("<div>");

            //add div to hold gif image
            gifDiv.addClass("gifDiv");

            //set image div to image
            var image = $("<img>");

            console.log(response);
            //add div and place image and rating.
            image.attr("src", response.data[i].images.fixed_height.url);
            image.addClass("gif");

            //adds an "active" state to image- meaning it moves.  Can use later to pause gif with "still" state
            image.attr("data-status", "active");
            
            //next two line add image sources when data-still or data-active are called. used for pausing and playing gif
            image.attr("data-still", response.data[i].images.fixed_height_still.url);
            image.attr("data-active", response.data[i].images.fixed_height.url);

            //append image(with all the data attr and gif image soure) to gifDiv
            var gif= gifDiv.append(image);

            //adding gif to gif-area on html dom
            $(".gif-area").append(gif);
            
            // //setting rating to location of rating in response
             var rating = $("<p>").text("Rating: " + response.data[i].rating);

            // //adding gif rating below gif image in html dom
            gifDiv.append(rating);
        }
    });
});

//used to dynamically add buttons with search input to html dom

var buttonDiv;

function addButtons() {
    $(".buttons").empty();

    for (i = 0; i < array.length; i++) {
        buttonDiv = $("<button>");
        buttonDiv.addClass("array-button btn btn-outline-dark ");

        buttonDiv.attr("data-value", array[i])
        buttonDiv.text(array[i]);
        $(".buttons").append(buttonDiv);
    }
};

//takes input from search field and adds to array- creating a new button.

var newItem;

$("#search-input").on("click", function (event) {
    event.preventDefault();
    
    // This line grabs the input from the textbox
    newItem = $(".search-bar").val().trim();

    // Adding movie from the search field to our array
    array.push(newItem);
    console.log(array)

    // Calling renderButtons which handles the processing of our movie array
    addButtons();
});


//this on click handles playing and pausing gifs when they are clicked on.


$(document).on("click", ".gif", function () {
  
   var state = $(this).attr("data-status");

    //checking the state of gif.  then switches image source and state
    //was using $(".gif").attr was changing all gif to clicked gif.
    if (state === "active") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-status", "still");
    }
    else {
        $(this).attr("src", $(this).attr("data-active"));
        $(this).attr("data-status", "active");
    }
});

//adds buttons to the html dom
addButtons();