const router = require("express").Router();
const Evento = require("../models/evento.model")
const User = require("../models/User.model")
const EventosCreados = require("../models/createdEvents")
router.get('/events', (req, res)=>{
    Evento.find()
    .then(events=>{
        res.render("events/events",{events})
    })
    .catch(console.log())
    
})
router.get('/createEvent/:id', (req,res)=>{
    const idEvento = req.params.id
    Evento.findById(idEvento)
    .then(evento=>{
        res.render('events/createEvent',evento)
    })
    .catch(error=>console.log(error))
    
})

router.post("/createEvent", (req,res)=>{
    const {tittle, date, gasto, nameEvent, eventImg, descripcion} = req.body
    const {username}= req.session.user
    console.log(username)
    const participants = [
        {Usuario:username,descripcion:descripcion,gasto:gasto}
    ]
    const author = username
    const idEvento = Date.now()
    const myEvento = {idEvento,tittle,date,nameEvent,eventImg,participants,author,gasto}
    EventosCreados.create(myEvento)
    .then((info)=>{
        res.redirect("/profile")
    })
    .catch(console.log())
})


router.post("/new/event",(req,res)=>{
    const {username} = req.session.user
    const {id} = req.body
    EventosCreados.find({$and:[{_id:id},{"participants.Usuario":username}]})
    .then((resultado)=>{
        console.log(resultado)
        if(resultado.length===0){
            EventosCreados.findByIdAndUpdate(req.body.id,{$push:{participants:{Usuario:username}}})
            .then(()=>console.log())
            .catch(console.log())
        } else{
            console.log("Ya agregaste el evento")
        }
        res.redirect('/profile')
    })
    .catch(()=>{
        console.log("Hola")

    })

})

router.post("/event/favorite",(req,res)=>{
    console.log(req.body.id)
    const {username} = req.session.user
    EventosCreados.findById(req.body.id)
    .then(evento=>{
        console.log(evento)
        User.findOneAndUpdate({username:username},{$push:{favoritePlace:evento}})
        .then(evento=>{
            console.log(evento)
            res.redirect("/profile")
        })
        .catch(console.log())
    })
    .catch(console.log())
})

router.post("/favorite/remove",(req,res)=>{
    console.log(req.body.id)
    const {username} = req.session.user
    res.redirect("/profile")

})




module.exports = router;
