const router = require('express').Router()
const EventosCreados = require('../models/createdEvents')


router.get('/nuevoGasto/:id', (req, res)=>{
    EventosCreados.findById(req.params.id)
    .then(evento=>{
        console.log('evento')
        res.render('profile/gasto-nuevo', evento)
    })
    .catch(console.log())
})



















module.exports = router;