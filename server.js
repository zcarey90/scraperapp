var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var logger = require("logger");

var app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var PORT = 8889;

var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

mongoose.Promise = Promise;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(public));
var routes = require("./Routes/htmlroutes");
app.use(routes);
// var db = require("./models");

app.use(logger("dev"));

app.listen(port);
