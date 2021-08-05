const mongoose = require('mongoose');

//create schema 
const messageSchema = new mongoose.Schema({

    msg:String

})

const Msg = mongoose.model('msg',messageSchema);
module.exports = Msg;