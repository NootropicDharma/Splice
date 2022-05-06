const router = require('express').Router()
const EventosCreados = require('../models/createdEvents')


router.get('/nuevoGasto/:id', (req, res)=>{
    const {username} = req.session.user
    EventosCreados.findById(req.params.id)
    .then(evento=>{

        const gastosnuevos = evento.gastos.filter(gasto=>{
            if(gasto.username === username){
                return gasto
            }
        })
        const totalGastosUser = gastosnuevos.reduce((total,gasto)=>{
            return total += Number(gasto.costo)
        },0)
        
        const find = evento.gastos.some(gasto=>gasto.username === username)
        console.log(find)
            if(find){
                
                EventosCreados.findByIdAndUpdate(req.params.id,{$pull:{gastosTotales:{username:username}}})
                .then(()=>{
                    EventosCreados.findByIdAndUpdate(req.params.id,{$push:{gastosTotales:{username:username,gastoTotal:totalGastosUser}}})
                        .then(()=>{
                            const Suma = evento.gastosTotales.reduce((total,usuario)=>{
                                return total += Number(usuario.gastoTotal)
                            },0)

                            const Promedio =  Suma/evento.gastosTotales.length  

                            if(evento.gastosTotales.length>1){
                                const username1 = evento.gastosTotales[0]
                            const username2 = evento.gastosTotales[1]

                            let deudaA ;
                            if(username1.gastoTotal<Promedio){
                                const deuda = Promedio-username1.gastoTotal
                                console.log(username1.username)
                                deudaA = `${username1.username} le debe $${deuda} chelines a ${username2.username}`
                                console.log(deudaA)
                            } else if(username2.gastoTotal<Promedio){
                                const deuda = Promedio-username2.gastoTotal
                                console.log(deuda)
                                deudaA = `${username2.username} le debe $${deuda} chelines a ${username1.username}`
                                console.log(deudaA)
                            } 

                            EventosCreados.findByIdAndUpdate(req.params.id,{deuda:deudaA})
                            .then(()=>{
                                res.render('profile/gasto-nuevo', evento)
                            })
                            .catch(console.log("no se envio"))

                            } else{
                                res.render('profile/gasto-nuevo', evento)
                            }
                            

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