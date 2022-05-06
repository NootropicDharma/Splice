const isLoggedIn = require('../middleware/isLoggedIn');

const Event = require('../models/evento.model');
const User = require('../models/User.model');
const EventosCreados = require("../models/createdEvents");
const router = require('express').Router();


router.get('/', isLoggedIn, (req, res)=>{
        const {name,email,username, Avatar}   = req.session.user
        let UsernameData;
        User.find({username})
        .then(user=>{
            UsernameData = user[0]
            EventosCreados.find({"participants":username})
            .then(myEvents=>{
                const user = {
                        UsernameData,
                        myEvents}
                res.render('profile/userProfile', user)
            })
            .catch(console.log())         
        })
        .catch(console.log())
})









module.exports = router;





