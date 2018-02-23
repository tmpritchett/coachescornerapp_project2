const mongoose = require('mongoose')
const coachSchema = require('./coachSchema')
const Schema = mongoose.Schema

const teamSchema = new Schema({
  name: String,
  location: String,
  coaches: [ coachSchema ] // This sets up a one to many relationship
})

module.exports = teamSchema