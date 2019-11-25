/**
 * Created by debasiskar on 07/09/19.
 */
const mongoose = require('mongoose')
const NoteSchema = new mongoose.Schema({

    title: String,
    // this is a bug in the markdown - should not have the quotes ""
    description: String

})
module.exports = mongoose.model('Note', NoteSchema)