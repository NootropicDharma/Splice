const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const emailSchema= new Schema({
    
    name: String,

    subject: String,

    message: String,
    

},{timestamps:true});

const correo = model("email", emailSchema);

module.exports = correo;
