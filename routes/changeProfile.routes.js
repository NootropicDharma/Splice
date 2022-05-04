const router = require("express").Router();

router.get('/changeInfo', (req, res)=>{
    res.render('profile/changeProfile.hbs')
})





module.exports = router;
