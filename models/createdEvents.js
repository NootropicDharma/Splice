const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const createdEvents = new Schema({

    idEvento: Number,

    tittle: String,
    
    date: Date,

    dateString:String,

    nameEvent:String, 

    eventImg:String,
    
    participants:[],

    author:String,

    gastos:[],

    gastosTotales:[],
    
    deuda:String,


},{timestamps:true});

const EventosCreados = model("eventosCreados", createdEvents);

module.exports = EventosCreados;
