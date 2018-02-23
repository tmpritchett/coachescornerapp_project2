const mongoose = require('mongoose')
const coachSchema = require('../db/schemas/sodaSchema')

// Apply existing schema to a mongoose model names soda.
// This gives us the ability to use methods like findById, create, etc
const Coach = mongoose.model('soda', coachSchema)

module.exports = Coach
