const mongoose = require('mongoose');
const {Schema} = mongoose;
const User = new Schema({
    firstname: {type:String},
    lastname: {type:String},
    username: {type:String},
    mail: {type:String}
});

module.exports = mongoose.model('User', User);