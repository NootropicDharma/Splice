const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const createdEvents = new Schema({

    idEvento: Number,

    tittle: String,
    
    date: Date,

    nameEvent:String, 

    eventImg:String,
    
    participants:[],

    author:String,

    gasto:Number,

},{timestamps:true});

const EventosCreados = model("eventosCreados", createdEvents);

module.exports = EventosCreados;
