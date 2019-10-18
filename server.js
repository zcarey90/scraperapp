var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var logger = require("morgan");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 8888;

var app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/scrape", function(req, res) {
  return axios
    .get("http://www.mmamania.com/")
    .then(function(response) {
      var $ = cheerio.load(response.data);
      var results = [];

      $("div.c-entry-box--compact__body h2").each(function(i, element) {
        var result = {};

        result.title = $(element)
          .children("a")
          .text();
        result.link = $(element)
          .children("a")
          .attr("href");
        // result.excerpt = $(element)
        //   .parent()
        //   .children(".td-excerpt")
        //   .text()
        //   .trim();
        // console.log(result.excerpt);

        console.log(result);
        results.push(result);
        db.Article.create({
          headline: result.title,
          website: result.link
        });
      });
      return db.Article;
    })
    .then(function(req, res) {
      res.render("index");
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/api/articles", function(req, res) {
  db.Article.find()
    .then(function(dbArticle) {
      console.log("articles");
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/saved", function(req, res) {
  db.Article.find({})
    .then(function(dbArticle) {
      console.log(dbArticle);
      res.render("saved", {
        saved: dbArticle
      });
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.post("/api/saved", function(req, res) {
  db.Article.create(req.body)
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/articles/:id", function(req, res) {
  console.log(req.params.id);

  db.Article.findOne({ _id: req.params.id })

    .populate("note")
    .then(function(dbArticle) {
      console.log(dbArticle);
      if (dbArticle) {
        res.render("articles", {
          data: dbArticle
        });
      }
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.delete("/saved/:id", function(req, res) {
  db.Article.deleteOne({ _id: req.params.id })
    .then(function(removed) {
      res.json(removed);
    })
    .catch(function(err, removed) {
      res.json(err);
    });
});

app.delete("/articles/:id", function(req, res) {
  db.Note.deleteOne({ _id: req.params.id })
    .then(function(removed) {
      res.json(removed);
    })
    .catch(function(err, removed) {
      res.json(err);
    });
});

app.post("/articles/:id", function(req, res) {
  db.Note.create(req.body)
    .then(function(dbNote) {
      db.Article.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { note: dbNote._id } },
        { new: true }
      )
        .then(function(dbArticle) {
          console.log(dbArticle);
          res.json(dbArticle);
        })
        .catch(function(err) {
          res.json(err);
        });
    })
    .catch(function(err) {
      res.json(err);
    });
});
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
