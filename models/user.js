const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    googleId: {
        type: String,
        required: true
    },
    emailId: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    image: {
        type: String
    },
    credits:{
        type:Number,
        default:0
    }

});

//to create new collection
mongoose.model('users', userSchema);
