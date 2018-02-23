const mongoose = require('mongoose')
const coachSchema = require('../db/schemas/coachSchema')

// Apply existing schema to a mongoose model names soda.
// This gives us the ability to use methods like findById, create, etc
const Coach = mongoose.model('coach', coachSchema)

module.exports = Coach
