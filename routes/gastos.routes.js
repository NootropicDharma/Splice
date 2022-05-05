const router = require('express').Router()
const EventosCreados = require('../models/createdEvents')


router.get('/nuevoGasto/:id', (req, res)=>{
    const {username} = req.session.user
    EventosCreados.findById(req.params.id)
    .then(evento=>{
        const gastosnuevos = evento.gastos.map(gasto=>{
            if(gasto.username === username){
                return gasto
            }
        })
        const totalGastosUser = gastosnuevos.reduce((total,gasto)=>{
            return total += Number(gasto.costo)
        },0)
        
        const find = evento.gastos.map(gasto=>{
            if(gasto.username === username){
                return true
            } else{
                return false
            }
        })
        console.log(find)
            if(find[0]){
                
                EventosCreados.findByIdAndUpdate(req.params.id,{$pull:{gastosTotales:{username:username}}})
                .then(()=>{
                    EventosCreados.findByIdAndUpdate(req.params.id,{$push:{gastosTotales:{username:username,gastoTotal:totalGastosUser}}})
                        .then(()=>{
                            res.render('profile/gasto-nuevo', evento)
                            console.log("Se anexó")})
                        .catch(()=> console.log("Error"))
                })
                .catch(console.log())
            } else{
                console.log("No se encuentra")
                EventosCreados.findByIdAndUpdate(req.params.id,{$push:{gastosTotales:{username:username,gastoTotal:totalGastosUser}}})
                .then(()=>{
                    res.render('profile/gasto-nuevo', evento)
                })
                .catch(()=>console.log("no se anexó"))
            }
            console.log(evento)
    })
    .catch(console.log())
})

router.post('/nuevo/gasto', (req, res)=>{
    const {gasto,id,descripcion} = req.body
    const {username} = req.session.user
    console.log(gasto,id)
    EventosCreados.findByIdAndUpdate(id,{$push:{gastos:{username:username,description:descripcion,costo:gasto}}})
    .then(()=>{
        res.redirect(`/profile/nuevoGasto/${id}`)
    })
    .catch(console.log())
})



















module.exports = router;