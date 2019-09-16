var express = require("express");
var bodyParser = require("body-Parser");
var request = require("request");
var mongoose = require("mongoose");
var path = require("path");

var axios = require(axios);
var cheerio = require(cheerio);

var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

mongoose.Promise = Promise;

var db = require("./models");

var app = express();
