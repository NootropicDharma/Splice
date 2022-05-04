const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const eventoSchema = new Schema({
    
    name: String,

    eventImg: String,

    description: String,
    

},{timestamps:true});

const Evento = model("eventos", eventoSchema);

module.exports = Evento;
