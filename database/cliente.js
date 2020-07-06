var mongoose = require('./connect');
var CLIENTESCHEMA = mongoose.model('cliente',{
    Nombre : String,
    Apellido :  String,
    Edad :   Number,
    Fecharegistro    :  Date,
    Ci : String,
    Correo : String
});// NOMBRE DE TABLA "cliente"  DATOS..
module.exports = CLIENTESCHEMA;