const express = require('express')

// IMPORTANT: make sure to add merge params
const router = express.Router({ mergeParams: true })


const Team = require('../models/team')
const Coach = require('../models/coach')

/* GET home page. */
router.get('/', (req, res) => {

  // Find the company by route params defined in app.js
  Team.findById(req.params.companyId).then((team) => {

    // Pass all sodas and the company to a view specifically for showing all sodas
    const coaches = team.coaches
    res.render('coach/index', {
      team: team,
      coaches: coaches
    })
  })
})

// NEW
// GET
router.get('/new', (req, res) => {

  // We only need to pass the company ID to this new view
  res.render('coach/new', {
    TeamId: req.params.teamId
  })
})

// CREATE
// POST
router.post('/', (req, res) => {

  // Get team we need to save coach to
  Team.findById(req.params.teamId).then((team) => {

    // THEN once we have the Team, take req.body and make a new Coach
    const newCoach = new Coach({
      name: req.body.name,
      positionCoached: req.body.positionCoached,
      yearsExperience: req.body.yearsExperience,
      stats: req.body.stats
    })

    // Push Soda to company.sodas
    team.coaches.push(newCoach)

    // Save Team
    return team.save()
  }).then((updatedTeam) => {

    // Redirect to all coaches
    res.redirect(`/teams/${req.params.teamId}/coaches`)
  })
})


// SHOW
router.get('/:id', (req, res) => {

  // Find team from teamId route param
  Team.findById(req.params.teamId).then((team) => {

    // Use the .id method to extract a single coach from team.coaches
    const coach = team.coaches.id(req.params.id)

    // connect it to a coach/show view
    res.render('team/show', {
      teamId: req.params.teamId,
      coach: coach
    })
  })
})

// EDIT
// GET
router.get('/:id/edit', (req, res) => {

  // Make sure to take a look at the coach/edit file. It will show you a lot concerning how 
  // to connect the initial values to this edit page
  Team.findById(req.params.companyId).then((team) => {
    const coach = team.coaches.id(req.params.id)
    res.render('coach/edit', {
      TeamId: req.params.teamId,
      coach: coach
    })
  })
})

// UPDATE
// PUT/PATCH
router.patch('/:id', (req, res) => {
  Team.findById(req.params.teamId).then((team) => {

    // We don't have a nice method like findByIdAndUpdate here
    // so instead we need to manually change the coaches values
    const coach = team.coaches.id(req.params.id)
    coach.name = req.body.name
    coach.positionCoached = req.body.positionCoached
    coach.yearsExperience = req.body.yearsExperience
    coach.stats = req.body.stats

    // Then Save the team
    return team.save()
  }).then((updatedTeam) => {
    res.redirect(`/teams/${updatedTeam._id}/teams/${req.params.id}`)
  })
})

// DESTROY
// DELETE
router.delete('/:id', (req, res) => {
  Team.findById(req.params.teamId).then((team) => {
    const coach = team.coaches.id(req.params.id)
    coach.remove()
    return team.save()
  }).then(() => {
    res.redirect(`/teams/${req.params.teamId}/coaches`)
  })
})


module.exports = router
