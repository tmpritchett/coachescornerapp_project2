const express = require('express')
const router = express.Router()
const Team = require('../models/team')

// INDEX
// GET
router.get('/', (req, res) => {

  // Get All Companies
  Team.find().then((teams) => {

    // Send all the companies to the hbs file called index in the views/team directory
    res.render('team/index', {
      teams: teams
    })
  })
})

// NEW
// GET
router.get('/new', (req, res) => {

  // Just render a view, we don't need to inject any data from our server here
  res.render('team/new')
})

// CREATE
// POST
router.post('/', (req, res) => {

  // Create a new team and make sure we are ONLY looking at the 
  // pieces of req.body that we need in order to save to the DB
  // Data from req.body is coming from the HTML form
  const newTeam = new Team({
    name: req.body.name,
    location: req.body.location
  })

  // Save the new team
  newTeam.save().then((savedTeam) => {

    // THEN redirect to the new teams page
    // Remember POST/PUT/PATCH/DELETE routes should not render or send anything
    res.redirect(`/teams/${savedTeam._id}`)
  })
})


// SHOW
// GET
router.get('/:id', (req, res) => {

  // Find a single team
  Team.findById(req.params.id).then((team) => {

    // THEN render that into a handlebars view and pass the team from our db into hbs
    res.render('team/show', {
      team: team
    })
  })
})

// EDIT
// GET
router.get('/:id/edit', (req, res) => {

  // Find a single team using the route params above
  Team.findById(req.params.id).then((team) => {

    // THEN render that and id into a handlebars view and pass the team from our db into hbs
    res.render('team/edit', {
      id: req.params.id,
      team: team
    })
  })
})

// UPDATE
// PUT/PATCH
router.patch('/:id', (req, res) => {

  // Use the route params and form data to update the Company
  Team.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    location: req.body.location

    // Make sure you add thie { new: true } flag, else your data may not refresh right away
  }, { new: true }).then((updatedTeam) => {

    // Redirect to the show page once it successfully updates
    res.redirect(`/teams/${updatedTeam._id}`)
  })
})

// DESTROY
// DELETE
router.delete('/:id', (req, res) => {

  // Use the params id to find and remove the team
  Team.findByIdAndRemove(req.params.id).then(() => {
    res.redirect(`/teams`)
  })
})


module.exports = router