var mongoose = require(moongoose);

var Schema = mongoose.Schema;

var NoteSchema = new Schema({});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
