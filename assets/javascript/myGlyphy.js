// Initial array of gliphy topics
var glyphies = ["Basketball", "Boxing", "Football", "Soccer"];
var buttonDisplays = ["btn btn-danger","btn btn-warning","btn btn-info","btn btn-success"];

//Random Generator function
function getRandNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayGlyphyInfo() {

  var movie = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&y=&plot=short&apikey=fduAONVIgjKJNBi7HhHbjaKEOrAcil6L&limit=10";
  $("#glyphies-view").empty();
  // Creates AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    // YOUR CODE GOES HERE!!!
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var glyphDiv = $("<div class='item'>");

      var rating = results[i].rating;

      var p = $("<a>").text("Rating: " + rating);

      var newImage = $("<img>");
      newImage.attr("id", "img" + i);
      newImage.addClass("clickable");
      newImage.attr("src", results[i].images.fixed_width_small_still.url);
      newImage.attr("src2", results[i].images.preview_gif.url);

      glyphDiv.prepend(p);
      glyphDiv.prepend(newImage);


      $("#glyphies-view").prepend(glyphDiv);

      // This function handles events where the glyphy image is clicked
      $(".clickable").on("click", function (event) {
        event.preventDefault();
        var previewGif = $(this).attr("src2");
        var gif = $(this).attr("src");
        $(this).attr("src",previewGif);
        $(this).attr("src2", gif);
      });
        console.log(results);
      }
  });

}

// Function for displaying movie data
function renderButtons() {

  // Deletes the glyphies prior to adding new glyphies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Loops through the array of glyphies
  for (var i = 0; i < glyphies.length; i++) {

    // Then dynamicaly generates buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adds a class of glyphy to our button
    a.addClass("glyphy "+ buttonDisplays[getRandNum(0,3)]);
    // Added a data-attribute
    a.attr("data-name", glyphies[i]);
    a.attr("type", "button");
    // Provided the initial button text
    a.text(glyphies[i]);
    // Added the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where the add glyphy button is clicked
$("#add-glyphy-btn").on("click", function(event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var glyphy = $("#glyphy-input").val().trim();

  // The glyphy from the textbox is then added to our array
  glyphies.push(glyphy);

  // Calling renderButtons which handles the processing of our glyphy array
  renderButtons();

});

// This function handles events where the clear glyphy button is clicked
$("#clear-glyphy-btn").on("click", function(event) {
  event.preventDefault();
  $("#buttons-view").empty();
  glyphies = [];
});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".glyphy", displayGlyphyInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();