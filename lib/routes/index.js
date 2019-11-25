/**
 * Created by debasiskar on 07/09/19.
 */
const express = require('express')
const router = express.Router()
const notes = require('./notes/notes.controller')
//const api = require('./api/api.controller')
router.use('/api', notes);
//router.use('/api', api);
// Add more routes here if you want!
module.exports = router