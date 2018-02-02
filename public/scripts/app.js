/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(tweet) {
  let $tweet = $("<article>").addClass("tweet");
  let $header = $("<header>");
  let $avatars = $("<img>").addClass("profile").attr("src", tweet.user.avatars.small);
  let $name = $("<h2>").text(tweet.user.name);
  let $handle = $("<span>").addClass("handle").text(tweet.user.handle);
  let $body = $("<div>").append($("<p>").text(tweet.content.text));
  let $footer = $("<footer>");
  let $created_at = $("<span>").addClass("post-date").text(moment(tweet.created_at).startOf("hour").fromNow());
  let $icon1 = $("<i>").addClass("fa fa-heart");
  let $icon2 = $("<i>").addClass("fa fa-retweet");
  let $icon3 = $("<i>").addClass("fa fa-flag");
  $($header).append($avatars, $name, $handle);
  $($footer).append($created_at, $icon1, $icon2, $icon3, $footer);
  $($tweet).append($header, $body, $footer);

  return $tweet;
}

function loadTweets() {
  $.get("/tweets").done(renderTweets);
}

function renderTweets(tweets) {
  $(".tweetSection").empty();
  // loops through tweets
  tweets.forEach(function(tweet) {
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $(".tweetSection").prepend(createTweetElement(tweet));
  });
}

$(document).ready(function() {
  //Event handler
  $("#tweetForm").on("submit", function(event) {
    //prevent default behaviour
    event.preventDefault();
    //check if test input box is empty or has more than 140 chars
    const tweetForm = $("#tweetInput");
    if (tweetForm.val().length === 0) {
      alert("You can't tweet nothing");
    } else if (tweetForm.val().length > 140) {
      alert("You wrote more than 140 characters. Plesse write less.");
    } else {
    //get data from the form
      var data = $("#tweetForm").serialize();
      //submit using ajax
      $.post("/tweets", data).done(function() {
      //render tweets
        loadTweets();
        //clear the text box on post
        $("textarea").val("");
        //reset counter on post
        $(".counter").text("140");
        //unselect text input on post
        $("#tweetInput").prop("selected", false);
      });
    }
  });

  let $tweetSection = $("<section>").addClass("tweetSection");
  $(".container").append($tweetSection);
  loadTweets();

});

//on button press toggle the compose tweet section and select textarea
$(document).ready(function() {
  $(".compose").on("click", () => {
    $(".new-tweet").slideToggle(500);
    $("#tweetInput").focus().select();
  });
});