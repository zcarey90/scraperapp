var mongoose = require("mongoose");
var notes = require("./note");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  headline: {
    type: String,
    required: true
  },

  summary: {
    type: String,
    required: true
  },

  website: {
    type: String,
    required: true
  },

  saved: {
    type: Boolean,
    default: false
  },

  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Notes"
    }
  ]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
