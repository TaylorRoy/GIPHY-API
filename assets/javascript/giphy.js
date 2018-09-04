var array = ["cat", "dog", "bird"];
var favoritesArray = [];

var image;
var search;
var queryURL;

//used to call giphy api when a yellow term button is clicked and display search appropriate gifs that are g rated
$(document).on("click", ".array-button", function () {

    //clears gif area in html dom for next set of gifs
    $(".gif-area").empty();
    $(".add-ten").empty();
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
            var gif = gifDiv.append(image);

            //adding gif to gif-area on html dom
            $(".gif-area").append(gif);

            //setting rating to location of rating in response
            var rating = $("<p>").text("Rating: " + response.data[i].rating);

            // //adding gif rating below gif image in html dom
            gifDiv.append(rating);

            //add to favorites button
            var favorites = $("<button>");
            favorites.addClass("favorite-button")
            favorites.attr("src", response.data[i].images.fixed_height.url)
                .attr("data-status", "active");
            image.attr("data-still", response.data[i].images.fixed_height_still.url);
            image.attr("data-active", response.data[i].images.fixed_height.url);
            favorites.text("Add to Favorites");
            gifDiv.append(favorites);
        }
        //puts add ten more button on page after iteration.  Only one button at end of 10 gifs
        tenMoreButton()
    });
});

//adds button to get ten more gifs to display
function tenMoreButton() {
    var tenMore = $("<button>");
    tenMore.addClass("ten-more btn btn-outline-dark");
    tenMore.attr("data-search", search)
    tenMore.text("Add Ten More");
    $(".add-ten").append(tenMore);
};


//to add 10 more gifs when "add ten more" button is clicked.  Notice the ".gif-area" doesn't get cleared
$(document).on("click", ".ten-more", function () {

    //updates data-value that is used in api query
    search = $(this).attr("data-search");

    //calling giphy api with dynamic search for 10 gifs with g rating
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&limit=20&rating=g&api_key=imAxurpr6b0arPCmmTJrtwZ8tg5jaBGY&"

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
            var gif = gifDiv.append(image);

            //adding gif to gif-area on html dom
            $(".gif-area").append(gif);

            //setting rating to location of rating in response
            var rating = $("<p>").text("Rating: " + response.data[i].rating);

            // //adding gif rating below gif image in html dom
            gifDiv.append(rating);

            //add to favorites button
            var favorites = $("<button>");
            favorites.addClass("favorite-button")
            favorites.attr("src", response.data[i].images.fixed_height.url)
                .attr("data-status", "active");
            image.attr("data-still", response.data[i].images.fixed_height_still.url);
            image.attr("data-active", response.data[i].images.fixed_height.url);
            favorites.text("Add to Favorites");
            gifDiv.append(favorites);
        }
    });
});


//adds gifs to .favorite-area of html when add to favorites button is clicked.
$(document).on("click", ".favorite-button", function () {
   
    //adds h2 title to .favorite-title-area
    $(".favorite-title-area").html("<h2>Favorite GIFs</h2>");

    //adds top and bottom border to h2
    $(".favorite-title-area").css({ "border-bottom": "3px solid"});
    $(".favorite-title-area").css({ "border-top": "3px solid"});

    //newFav div to hold each favorite gif
    var newFav = $("<div>");

    //add class to newFav div
    newFav.addClass("newFav");

    //set image div to imageFav
    var imageFav = $("<img>");

    //add class to imageFav
    imageFav.addClass("gifFav");

    //add src to img element
    imageFav.attr("src", $(this).attr("src"));

    //add img element with all attr to newFav div and set equal to favGif
    var favGif = newFav.append(imageFav);

    //add newFav div containing imageFav div with gif into .favorite-area on html dom
    $(".favorite-gif-area").append(favGif);

    //adds an "active" state to imageFav- meaning it moves.  Can use later to pause gif with "still" state
    //     imageFav.attr("data-status", "active");

    //next two line add imageFav sources when data-still or data-active are called. used for pausing and playing gif
    //imageFav.attr($(this).attr("data-still"));
    //imageFav.attr($(this).attr("data-active"));

    //append imageFav(with all the data attr and gif imageFav soure) to newFav
    //     var gifFav = newFav.append(imageFav);

    //adding gif to gif-area on html dom
    //     $(".favorite-area").append(imageFav);

    //setting rating to location of rating in response
    //var rating = $("<p>").text("Rating: " + response.data[i].rating);

    // //adding gif rating below gif image in html dom
    //    // newFav.append(rating);

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

    //condition to keep user from entering same search more than once
    if (array.includes(newItem)) {
        alert("You already added a button for " + newItem + ". Try another search")
        document.getElementById("search-bar").value = "";
    }
    else {
        // Adding movie from the search field to our array
        array.push(newItem);

        // Calling addButtons which handles the processing of our movie array
        addButtons();
        document.getElementById("search-bar").value = "";
    }
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

