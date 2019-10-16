var router = require("express").Router();
var db = require("../models");
var axios = require(axios);
var cheerio = require(cheerio);

router.get("/saved", function(req, res) {
  db.Article.find({ saved: false })
    .sort({ date: -1 })
    .then(function(dbArticles) {
      res.render("home", { articles: dbArticles });
    });
});

// router.get("/", function(req, res) {
//   res.render("index");
// });

router.get("/", function(req, res) {
  var results = [];
  axios.get("http://www.mmamania.com/").then(function(response) {
    var $ = cheerio.load(response.data);

    $("article h1").each(function(i, element) {
      var result = {};

      result.title = $(this).text();
      console.log("title");
      results.push(result.title);
    });
  });
  res.render("home", { records: results });
});
module.exports = router;
