$.getJSON("/api/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append(`<li>
    <h3>${data[i].title}</h3>;
    <a href="${data[i].link}">Check it out!</a>
    <span>${data[i].excerpt}</span>

    </li>`);
  }
  $(document).on("click", "#scrape-button", function() {
    var prevLength = 0;
    var finalLength = 0;
    //get the original number of articles
    $.ajax({
      method: "GET",
      url: "/api/articles",
      success: function(data) {
        prevLength = data.length;
      }
    }).then(function() {
      //then scrape the new articles, calculate the difference in number of articles and display, then reload the index page
      $.ajax({
        method: "GET",
        url: "/scrape",
        success: function(data) {
          finalLength = data.countNum;
          var diff = finalLength - prevLength;
          console.log(diff + " articles added");
          setTimeout(function() {
            window.location.href = "/";
          }, 3000);
        }
      });
    });
  });
  //   $(document).on("click", "#scrape-button", function() {
  //     $.ajax({
  //       method: "GET",
  //       url: "/scrape"
  //     });
  //     window.location.replace("/scrape");
  //   });

  //Save an article
  $(document).on("click", ".save-article", function() {
    var thisId = $(this).attr("data-id");
    $(this).hide();
    var data = {};
    data.title = $("#title-" + thisId).text();
    data.link = $("#link-" + thisId).text();
    data.excerpt = $("#excerpt-" + thisId).text();
    $.ajax({
      method: "POST",
      dataType: "json",
      url: "/api/saved",
      data: data
    });
  });
});
//Delete an article
$(document).on("click", ".delete-article", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "DELETE",
    url: "/saved/" + thisId
  }).then(function(data) {
    // Log the response
    console.log(data);
    location.reload();
  });
});
//Go to the notes page for a particular article
$(document).on("click", ".note-comment", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  });
  window.location.replace("/articles/" + thisId);
});

// Submit a note
$(document).on("click", "#submit-note", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  // Run a POST request to save the note
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#title-note").val(),
      // Value taken from note textarea
      body: $("#note-description").val()
    }
  }).then(function(data) {
    // Log the response
    console.log(data);
    window.location.replace("/articles/" + data._id);
  });
  // Also, remove the values entered in the input and textarea for note entry
  $("#title-note").val("");
  $("#note-description").val("");
});

//delete a note
$(document).on("click", ".delete-note", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "DELETE",
    url: "/articles/" + thisId
  }).then(function(data) {
    // Log the response
    console.log(data);
    location.reload();
  });
});
