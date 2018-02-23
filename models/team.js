const mongoose = require('mongoose')
const teamSchema = require('../db/schemas/teamSchema')

// Apply existing schema to a mongoose model names team.
// This gives us the ability to use methods like findById, create, etc
const Team = mongoose.model('team', teamSchema)

module.exports = Team