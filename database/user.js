var mongoose = require('./connect');
var USERSCHEMA = mongoose.model('users',{
    name : String,
    lastname :  String,
    age :   Number,
    date    :  Date 
});// NOMBRE DE TABLA "users"  DATOS..
module.exports = USERSCHEMA;