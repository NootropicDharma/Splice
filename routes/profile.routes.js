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
                
        })
        .catch(console.log())
        EventosCreados.find({"participants.Usuario":"Alejandro"})
        .then(myEvents=>{
                const user = {
                        UsernameData,
                        myEvents}
                console.log(user)
                res.render('profile/userProfile', user)
        })
        .catch(console.log())

})






// router.get("/profile", (req, res) => {
//         Event.find()
//         .then(eventos => {
//                 res.render("list of events", {eventos})
//         })
//         .catch(console.log)
// })



module.exports = router;





