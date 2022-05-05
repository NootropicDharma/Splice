const router = require('express').Router()
const EventosCreados = require('../models/createdEvents')


router.get('/nuevoGasto/:id', (req, res)=>{
    EventosCreados.findById(req.params.id)
    .then(evento=>{
        console.log(evento)
        res.render('profile/gasto-nuevo', evento)
    })
    .catch(console.log())
})
router.post('/nuevo/gasto', (req, res)=>{
    const {gasto,id,descripcion} = req.body
    const {username} = req.session.user
    console.log(gasto,id)
    EventosCreados.findByIdAndUpdate(id,{$push:{participants:{Usuario:username,descripcion:descripcion,gasto:gasto}}})
    .then(()=>{
        res.redirect(`/profile/nuevoGasto/${id}`)
    })
    .catch(console.log())
})



















module.exports = router;