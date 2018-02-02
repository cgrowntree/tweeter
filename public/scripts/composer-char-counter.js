//here the document ready function starts
$("document").ready(function(object){
  //function to bind keypress for tweetInput
  $("#tweetInput").on("keyup", function(object) {
    //update counter to current length when text typed
    var tweetLength = $("span.counter").text((140 - ($(this).val().length)));
    //turn text to color red if negative
    if (tweetLength.text() < 0 ) {
      tweetLength.addClass("err");
      //remove red color if goes back to positive
    } else {
      tweetLength.removeClass("err");
    }
  }); //brackets for tweetInput function ends here.
}); //brackets for document ready function