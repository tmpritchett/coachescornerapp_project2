const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coachSchema = new Schema({
  name: String,
  positionTitle: String,
  yearsExperience: Number,
  stats: String
})

module.exports = coachSchema
