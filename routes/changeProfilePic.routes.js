const router = require("express").Router();
const User = require('../models/User.model')
// const multer = require('multer')
// const upload = multer({ dest: 'uploads/'})
const fileUploader = require('../config/cloudinary.config')


router.get('/foto/create', (req, res) => res.render('profile/foto-create.hbs'))

router.post('/foto/create', fileUploader.single('profile-cover-image') ,(req, res) => {    // old middleware before the cloud upload.single('profile-cover-image')
        console.log(req.session.user.username)
        const {path} = req.file
        User.findOneAndUpdate({username: req.session.user.username},{
            Avatar: path
        })
        .then(profilepic => {
            console.log()
            res.redirect('/profile')
        })
        .catch(console.log)
})




module.exports = router;
