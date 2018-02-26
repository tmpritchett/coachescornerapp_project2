const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/', (req,res)=>{
    //get all users
User.find().then((users)=>{
// send all the users to the hbs file called index in the views/user directory
res.render('user/index', {
users: users
})
})
    
})


module.exports = router;
