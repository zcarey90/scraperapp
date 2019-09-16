var express = require("express");
var bodyParser = require("body-Parser");
var request = require("request");
var mongoose = require("mongoose");
var logger = require("logger");

var axios = require(axios);
var cheerio = require(cheerio);

var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

mongoose.Promise = Promise;

var db = require("./models");

var PORT = 8889;

var app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(public));

mongoose.connect("mongodb://localhost/scraperapp", { useNewUrlParser: true });
