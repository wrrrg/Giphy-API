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
    queryGiphy(newButton);
  });

  $(document).on("click", '.giphy-button', function(){
    // grab user input
    var giphy = $(this).attr("data");
    console.log(giphy);
    queryGiphy(giphy);


    // create search URL for giphy
    // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    //   giphy + "&api_key=dc6zaTOxFJmzC&limit=10";
    //
    // $.ajax({
    //   url: queryURL,
    //   method: 'GET'
    // }).then(function(response) {
    //   console.log(response);
    //   // store AJAX request data in a results variable
    //   var results = response.data;
    //   // clear previous giphyButtons
    //   $("#giphys-appear-here").empty();
    //   // Loop through the results
    //   for (var i=0; i<results.length; i++) {
    //     // make the div element
    //     var giphyDiv = $("<div class='gif-div'>");
    //     // make the rating text element
    //     var p = $("<p>").text("Rating: " + results[i].rating);
    //     // make the gif element
    //     var giphyImg = $("<img>");
    //     giphyImg.attr("src", results[i].images.fixed_height.url);
    //
    //     // Append paragraph and image to div
    //     giphyDiv.append(p);
    //     giphyDiv.append(giphyImg);
    //
    //     // prepend the giphyDiv to the main images div
    //     $("#giphys-appear-here").prepend(giphyDiv);
    //   };
    // });

  });

  $(document).on("click", 'img', function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      console.log(this);
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
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

  function queryGiphy(str){
    var giphy = str;
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
        var giphyImg = $("<img class='giphy'>");
        giphyImg.attr("src", results[i].images.fixed_height_still.url);
        giphyImg.attr("data-still", results[i].images.fixed_height_still.url);
        giphyImg.attr("data-animate", results[i].images.fixed_height.url);

        // Append paragraph and image to div
        giphyDiv.append(p);
        giphyDiv.append(giphyImg);

        // prepend the giphyDiv to the main images div
        $("#giphys-appear-here").prepend(giphyDiv);
      };
    });
  }

});
