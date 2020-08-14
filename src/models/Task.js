const mongoose = require('mongoose');
const {Schema} = mongoose;
const Task = new Schema({
    title: {type: String},
    description: {type:String},
    ini: {type: Date} ,
    fin: {type: String},
    status: {type:String}
});
module.exports = mongoose.model('Task', Task);