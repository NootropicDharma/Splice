const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String, 
      required: true
    },

    myEvents: [],
 
    Avatar:{
      type:String,
      default:"https://portal.staralliance.com/imagelibrary/aux-pictures/prototype-images/avatar-default.png/@@images/image.png"
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
    type: String,
    required: true,
    },

    favoritePlace: [],
    
    
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("usuarios", userSchema);

module.exports = User;
