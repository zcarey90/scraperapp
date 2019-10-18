var mongoose = require("mongoose");
// var note = require("./note");

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

  note: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
