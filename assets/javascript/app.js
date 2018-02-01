$(document).ready(function() {
// array of giphy button names
  var giphyArr = ["smh", "applause", "wtf", "whatever", "happy", "confused", "sad"];

  populateButtons();

  $("#add-giphy-button").on("click", function(){
    // push the new button value to the array
    var newButton = $("#giphy-input").val();
    giphyArr.push(newButton);
    console.log(giphyArr);
    // clear out the array to avoid repeating all of them
    $("#giphyButtons").empty();
    populateButtons();
  });

  $(".giphy-button").on("click", function(){
    // grab user input
    var giphy = $(this).attr("data");
    console.log(giphy);
    // create search URL for giphy
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      giphy + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {
      console.log(response);
      // store AJAX request data in a results variable
      var results = response.data;
      // clear previous giphyButtons
      $("#giphys-appear-here").empty();
      // Loop through the results
      for (var i=0; i<results.length; i++) {
        // make the div element
        var giphyDiv = $("<div class='gif-div'>");
        // make the rating text element
        var p = $("<p>").text("Rating: " + results[i].rating);
        // make the gif element
        var giphyImg = $("<img>");
        giphyImg.attr("src", results[i].images.fixed_height.url);

        // Append paragraph and image to div
        giphyDiv.append(p);
        giphyDiv.append(giphyImg);

        // prepend the giphyDiv to the main images div
        $("#giphys-appear-here").prepend(giphyDiv);
      };
    });

  });

  function populateButtons(){
    // Loop to create giphy buttons
      for (var i = 0; i < giphyArr.length; i++) {
        var giphyButton = $("<button>").addClass('giphy-button');
        giphyButton = giphyButton.attr('data', giphyArr[i]);
        giphyButton.text(giphyArr[i]);
        $("#giphyButtons").prepend(giphyButton);
      };
  };

});
