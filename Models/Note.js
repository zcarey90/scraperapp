var mongoose = require(mongoose);

var Schema = mongoose.Schema;

var noteSchema = new Schema({
  // The headline is the article associate with the note
  //   _headlineId: {
  //     type: Schema.Types.ObjectId,
  //     ref: "Headline"
  //   },
  // date is just a string
  date: {
    type: Date,
    default: Date.now
  },
  // as is the noteText
  noteText: String
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
