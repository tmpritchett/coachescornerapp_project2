const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coachSchema = new Schema({
  name: String,
  position: String,
  yearsExperience: Number,
  stats: String
})

module.exports = coachSchema
